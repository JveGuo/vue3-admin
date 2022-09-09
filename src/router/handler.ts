/**
 * 处理路由数据相关
 */
import type { RouteRecordRaw } from 'vue-router';
import type { PermissionType } from '@/utils/constSet';

/**
 * 判断用户是否有权限访问单个路由
 * roles：用户角色
 * route：访问的路由
 */
const hasPermission = (roles: string | PermissionType, route: any) => {
  if (route.meta && route.meta.roles) {
    if (route.meta?.roles !== undefined) {
      return route.meta.roles.includes(roles);
    } else {
      return false;
    }
  }
  return true;
};

/**
 * 筛选可访问的动态路由
 * roles：用户角色
 * route：访问的动态列表
 */
export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string) => {
  const res: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    const r = { ...route };
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles);
      }
      res.push(r);
    }
  });

  return res;
};
