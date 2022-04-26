import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ManageView from '@/views/ManageView.vue';

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
    component: ManageView,
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
  console.log('Global Guard');
  next();
});

export default router;
