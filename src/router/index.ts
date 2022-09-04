import { createRouter, createWebHashHistory } from 'vue-router';

// 公开路由
const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'basicLayout',
    component: () => import('@/layouts/basicLayout/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
});

export default router;
