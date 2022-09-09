import { defineStore } from 'pinia';
import { PermissionType } from '@/utils/constSet';
import { setStorage, getStorage, clearStorage } from '@/utils/storage';
import type { RouteRecordRaw } from 'vue-router';
import { filterAsyncRoutes } from '@/router/handler';
import router, { asyncRoutes, publicRoutes } from '@/router';
import { toRaw } from '@vue/reactivity';

interface UserInfo {
  name: string; // 用户名
  permission: PermissionType | string; // 权限
  routes: RouteRecordRaw[]; // 静态路由
  dynamicRoutes: RouteRecordRaw[]; // 动态路由
}

export const userInfoStore = defineStore({
  id: 'useInfo',
  state: (): UserInfo => ({
    name: getStorage('userName') || '', // 用户名
    permission: getStorage('userPermission') || '', // 权限
    routes: [], // 静态路由
    dynamicRoutes: [] // 动态路由
  }),
  actions: {
    // 设置用户信息
    setUserInfo(name: string) {
      this.name = name;
      setStorage('userName', name);

      const userPermission =
        name === PermissionType.admin
          ? PermissionType.admin
          : PermissionType.guest;
      setStorage('userPermission', userPermission);
      this.permission = userPermission;
    },
    // 清除用户信息
    clearUserInfo() {
      this.name = '';
      this.permission = '';
      clearStorage();
    },
    // 构建路由
    generateRoutes(roles: PermissionType) {
      // accessedRoutes: 筛选出的动态路由
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      this.routes = publicRoutes.concat(accessedRoutes);
      this.dynamicRoutes = accessedRoutes;
      // 通过addRoute将路由挂载到router上
      accessedRoutes.forEach((route) => {
        router.addRoute(route);
      });
    }
  }
});
