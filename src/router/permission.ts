import router from '@/router';
import { userInfoStore } from '@/stores/user';

// 未登录可以访问的白名单
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  const userInfo = userInfoStore();
  // 已登陆
  if (userInfo.userInfo.name) {
    if (to.path === '/login') {
      next('/');
    } else {
      next();
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
