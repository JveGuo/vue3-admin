import { defineStore } from 'pinia';
import { Permissions } from '@/utils/constSet';
import { setStorage, getStorage } from '@/utils/storage';

export const userInfoStore = defineStore({
  id: 'useInfo',
  state: () => ({
    userInfo: {
      name: getStorage('userName') || '', // 用户名
      permissions: getStorage('userPermission') || '' // 权限
    }
  }),
  actions: {
    setUserInfo(name: string) {
      this.userInfo.name = name;
      setStorage('userName', name);

      const userPermission =
        name === Permissions.admin ? Permissions.admin : Permissions.guest;
      setStorage('userPermission', userPermission);
      this.userInfo.permissions = userPermission;
    }
  }
});
