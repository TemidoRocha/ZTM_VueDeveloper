<template>
  <div>
    <!-- Header -->
    <app-header></app-header>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>

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

<style>
.fade-enter-from{
  opacity: 0;
}
.fade-enter-active{
  transition: all 0.5s linear;
}
.fade-leave-to{
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
