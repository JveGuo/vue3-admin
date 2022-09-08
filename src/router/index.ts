import { createRouter, createWebHashHistory } from 'vue-router';

import LayoutComponent from '@/layouts/basicLayout/index.vue';

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
    component: LayoutComponent
  },
  {
    path: '/404',
    name: 'err404',
    component: () => import('@/views/errorPage/err404.vue')
  }
];

// 权限路由
const permissionsRoutes = [
  {
    path: '/home',
    name: 'home',
    redirect: '/home/index',
    component: LayoutComponent,
    children: [
      {
        path: '/home/index',
        name: 'homeIndex',
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/permissions',
    name: 'permissions',
    redirect: '/permissions/index',
    meta: {
      roles: ['admin']
    },
    component: LayoutComponent,
    children: [
      {
        path: '/permissions/index',
        name: 'permissionsIndex',
        component: () => import('@/views/permissions/index.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...permissionsRoutes]
});

export default router;
