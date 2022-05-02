import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const Home = () => import('@/views/HomeView.vue');
const Manage = () => import(/** webpackChunkName: "groupedChunk" */'@/views/ManageView.vue');
const Song = () => import(/** webpackChunkName: "groupedChunk" */'@/views/SongView.vue');
const About = () => import('@/views/AboutView.vue');

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'manage',
    // alias: '/manage',
    path: '/manage-music',
    meta: { requireAuth: true },
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard');
      next();
    }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' } // account for paths that change
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song
  },
  {
    path: '/:catchAll(.*)*', // account for all paths that doesnt exist
    redirect: { name: 'home' }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
});

// https://router.vuejs.org/guide/advanced/navigation-guards.html
// Globa Guard
router.beforeEach((to, from, next) => {
  // if none of the paths is requireAuth we let it proceed
  if (!to.matched.some((record) => record.meta.requireAuth)) {
    next();
    return;
  }

  // in this case we need to check if the user is logged in because one of the records
  // require requireAuth
  if (store.state.auth.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
