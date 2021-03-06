import { Howl } from 'howler';
import helper from '@/includes/helper';

export default {
  // namespace: true,
  state: {
    currentSong: {},
    sound: {},
    soundSrc: '',
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%'
  },
  getters: {
    // authModalShow: (state) => state.authModalShow,
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    }
  },
  mutations: {

    newSong(state, payload) {
      if (state.sound instanceof Howl) {
        state.sound.unload();
      }
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true
      });
      state.soundSrc = payload.url;
    },
    updatePostion(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
      state.playerProgress = `${(state.sound.seek() / state.sound.duration()) * 100}%`;
    }
  },
  actions: {

    async newSong({ state, commit, dispatch }, payload) {
      // eslint-disable-next-line no-underscore-dangle
      if (payload?.url === state.soundSrc) {
        // eslint-disable-next-line no-underscore-dangle
        dispatch('toggleAudio');
        return;
      }
      commit('newSong', payload);

      state.sound.play();

      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      });
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }
      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progress({ commit, state, dispatch }) {
      commit('updatePostion');
      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      }
    },
    updateSeek({ state, dispatch }, payload) {
      if (!state.sound.playing) {
        return;
      }

      const { x, width } = payload.currentTarget.getBoundingClientRect();
      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);

      state.sound.once('seek', () => {
        dispatch('progress');
      });
    }
  },
};
