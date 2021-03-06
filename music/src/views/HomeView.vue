<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">
            {{ $t('home.listen') }}
          </h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
            suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
            pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="assets/img/introduction-music.png"
        alt="music introduction"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-secondary="{ icon: 'headphones-alt', right: true }"
        >
          <span class="card-title">Songs</span>
          <!-- Icon -->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <song-item v-for="song in songs" :key="song.docId" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { songsCollection } from '@/includes/firebase';
import SongItem from '@/components/SongItem.vue';
import IconSecondary from '@/directives/icon-secondary';

export default {
  name: 'HomeView',
  components: { SongItem },
  directives: { 'icon-secondary': IconSecondary },
  data() {
    return { songs: [], maxPerPage: 3, pendingRequest: false };
  },
  methods: {
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;
      let snapshot;

      if (this.songs.length) {
        /**
         * by default Forebase gets the document randomly
         * in order to implement the infinite scrolling we need to sort the doc and then
         * we are able to use the startAfter fn
         */
        const lastDoc = await songsCollection
          .doc(this.songs[this.songs.length - 1].docId)
          .get();
        snapshot = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshot = await songsCollection
          .orderBy('modified_name')
          .limit(this.maxPerPage)
          .get();
      }
      snapshot.forEach((document) => {
        const song = {
          docId: document.id,
          ...document.data(),
        };
        this.songs.push(song);
      });
      this.pendingRequest = false;
    },
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getSongs();
      }
    },
  },
  async created() {
    let numberOfSongs = this.songs.length;
    while (
      document.documentElement.clientHeight
      === document.documentElement.scrollHeight
    ) {
      // eslint-disable-next-line no-await-in-loop
      await this.getSongs();
      if (numberOfSongs === this.songs.length) {
        break;
      }
      numberOfSongs = this.songs.length;
    }

    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    // removing the event listner is important to prevent memory leak
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
