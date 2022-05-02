<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="
          w-full
          px-10
          py-20
          rounded
          text-center
          cursor-pointer
          border border-dashed border-gray-400
          text-gray-400
          transition
          duration-500
          hover:text-white
          hover:bg-green-400
          hover:border-green-400
          hover:border-solid
        "
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
       <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
      <input id="fileUpload" type="file" multiple @change="upload($event)"/>
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from '@/includes/firebase';

export default {
  name: 'UploadMusic',
  props: {
    addSong: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  methods: {
    upload($event) {
      this.is_dragover = false;

      // we need to check if the event was triggered by a drag&drop or input event
      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files];

      files.forEach((file) => {
        /**
         * check the file type, if it is not audio we rejection
         * mime types
         * not all browsers have access to all audio types
         */
        if (file.type !== 'audio/mpeg') {
          // eslint-disable-next-line no-useless-return
          return;
        }

        if (!navigator.onLine) {
          this.uploads.push({
            task: {},
            current_progress: 100,
            name: file.name,
            variant: 'bg-red-400',
            icon: 'fas fa-times',
            text_class: 'text_red-400'
          });
          return;
        }

        const storageRef = storage.ref('songs');
        // it is good practice to create a root referenc and then one more for the file.
        const songsRef = storageRef.child(`songs/${file.name}`); // this one will create a reference to the parent reference
        const task = songsRef.put(file);

        // The push() method returns the new length of the array.
        const uploadIndex = this.uploads.push({
          task,
          current_progress: 0,
          name: file.name,
          variant: 'bg-blue-400',
          icon: 'fas fa-spinner fa-spin',
          text_class: ''
        }) - 1;

        // there we will listen for several firebase events like the progress of teh upload
        task.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          (error) => {
            this.uploads[uploadIndex].variant = 'bg-red-400';
            this.uploads[uploadIndex].icon = 'fas fa-times';
            this.uploads[uploadIndex].text_class = 'text-red-400';
            console.dir(error);
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: '',
              comment_count: 0
            };

            song.url = await task.snapshot.ref.getDownloadURL();
            // the difference between set and add is that firebase will
            // set the id automatically with add
            const songRef = await songsCollection.add(song);
            const songSnapshot = await songRef.get();
            this.addSong(songSnapshot);

            this.uploads[uploadIndex].variant = 'bg-green-400';
            this.uploads[uploadIndex].icon = 'fas fa-check';
            this.uploads[uploadIndex].text_class = 'text-green-400';
          },
        );
      });
    },
    // cancelUpload() {
    //   this.uploads.forEach((upload) => {
    //     upload.task.cancel();
    //   });
    // }
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  }
};
</script>
