<template>
  <a-row class="header-container" justify="space-between" align="middle">
    <menu-unfold-outlined
      v-if="props.collapsed"
      class="trigger"
      @click="handleToggle"
    />
    <menu-fold-outlined v-else class="trigger" @click="handleToggle" />

    <a-dropdown>
      <a-avatar
        class="avatar"
        shape="square"
        size="large"
        :style="{ backgroundColor: '#7265e6', verticalAlign: 'middle' }"
      >
        {{ userInfo.userInfo.name }}
      </a-avatar>

      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <div @click="router.push('/')">首 页</div>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="1">
            <div class="logout" @click="logout">退 出</div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-row>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { userInfoStore } from '@/stores/user';
import router from '@/router';

const userInfo = userInfoStore();

const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
    default: false
  }
});

const emits = defineEmits(['toggleCollapsed']);

const handleToggle = () => emits('toggleCollapsed', !props.collapsed);

const logout = () => {
  userInfo.clearUserInfo();
  router.replace('/login');
};
</script>

<style scoped lang="less">
.header-container {
  height: 100%;
  .trigger {
    padding: 12px 12px 12px 0;
    font-size: 17px;
  }

  .avatar {
    &:hover {
      cursor: pointer;
    }
  }
}

.logout {
  width: 70px;
}
</style>
