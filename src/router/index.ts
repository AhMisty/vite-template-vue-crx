import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/options.vue'),
    },
    {
      path: '/index.html',
      component: () => import('../views/options.vue'),
    },
    {
      path: '/options',
      component: () => import('../views/options.vue'),
    },
    {
      path: '/sidepanel',
      component: () => import('../views/sidepanel.vue'),
    },
  ],
})

export default router
