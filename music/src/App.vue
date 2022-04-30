<template>
  <div>
    <!-- Header -->
    <app-header></app-header>

    <router-view></router-view>

    <!-- Player -->
    <player-howler />

    <!-- Auth Modal -->
    <auth-modal></auth-modal>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AuthModal from './components/AuthModal.vue';
import PlayerHowler from './components/PlayerHowler.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
    PlayerHowler
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>
