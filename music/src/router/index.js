import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const HomeView = () => import(/* webpackChunkName: "group-chunk" */ '@/views/HomeView.vue');
const ManageView = () => import('@/views/ManageView.vue');
const SongView = () => import(/* webpackChunkName: "group-chunk" */ '@/views/SongView.vue');
const AboutView = () => import('@/views/AboutView.vue');

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView
  },
  {
    name: 'about',
    path: '/about',
    component: AboutView
  },
  {
    name: 'manage',
    // alias: '/manage',
    path: '/manage-music',
    meta: { requireAuth: true },
    component: ManageView,
    // beforeEnter: (to, from, next) => {
    //   console.log('Manage Route Guard');
    //   next();
    // }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' } // account for paths that change
  },
  {
    name: 'song',
    path: '/song/:id',
    component: SongView
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
