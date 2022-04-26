<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li class="text-white">
            <router-link class="px-2" :to="{ name: 'about' }"
              >About</router-link
            >
          </li>
          <li v-if="!userLoggedIn" class="text-white">
            <a class="px-2" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li class="text-white">
              <router-link class="px-2" :to="{ name: 'manage' }"
                >Manage</router-link
              >
            </li>
            <li class="text-white">
              <a class="px-2" href="#" @click.prevent="signout">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'AppHeader',
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    // toggleAuthModal() {
    //   this.$store.commit('toggleAuthModal');
    // },
    signout() {
      this.$store.dispatch('signout');

      if (this.$route.name === 'manage') {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>
