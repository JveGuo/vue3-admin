/**
 * 全局路由守卫
 */
import router from '@/router';
import { userInfoStore } from '@/stores/user';
import type { PermissionType } from '@/utils/constSet';

// 未登录可以访问的白名单
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  const userInfo = userInfoStore();
  // 已登陆
  if (userInfo.name) {
    if (to.path === '/login') {
      next('/');
    } else {
      // 动态路由数据已经挂在
      if (userInfo.dynamicRoutes.length > 0) {
        next();
      } else {
        userInfo.generateRoutes(userInfo.permission as PermissionType);
        // replace: true 只是一个设置信息，告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由。
        next({ ...to, replace: true });
      }
    }
  } else {
    // 未登录，只允许进入login
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
});
