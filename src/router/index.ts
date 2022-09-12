import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import LayoutComponent from '@/layouts/basicLayout/index.vue';

// 公开路由
export const publicRoutes: RouteRecordRaw[] = [
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
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    redirect: '/home/index',
    meta: {
      title: '首页'
    },
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
    // redirect: '/permissions/index',
    meta: {
      title: '权限菜单',
      roles: ['admin']
    },
    component: LayoutComponent,
    children: [
      {
        path: '/permissions/index',
        name: 'permissionsIndex',
        meta: {
          title: '权限菜单-1'
        },
        redirect: '/permissions/index1',
        component: () => import('@/views/permissions/index.vue'),
        children: [
          {
            path: '/permissions/index1',
            name: 'permissionsIndex1',
            component: () => import('@/views/permissions/index.vue')
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
});

export default router;
