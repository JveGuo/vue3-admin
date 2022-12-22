<template>
  <a-layout-sider
    v-model:collapsed="props.collapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo">LOGO</div>

    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      theme="dark"
      mode="inline"
      @click="handelClickMenuItem"
    >
      <template v-for="item in menu" :key="item.path">
        <a-sub-menu
          v-if="item.children && item.children.length > 0"
          :key="item.path"
        >
          <template #icon>
            <DesktopOutlined />
          </template>
          <template #title>{{ item.title }}</template>
          <template v-for="subItem in item.children" :key="subItem.path">
            <template v-if="subItem.children">
              <a-menu-item :key="subItem.path">
                <!-- <router-link :to="subItem.path" class="menu-link"> -->
                {{ subItem.title }}
                <!-- </router-link> -->
              </a-menu-item>
            </template>
          </template>
        </a-sub-menu>

        <template v-else>
          <a-menu-item :key="item.path">
            <template #icon>
              <PieChartOutlined />
            </template>
            <!-- <router-link :to="item.path" class="menu-link"> -->
            {{ item.title }}
            <!-- </router-link> -->
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons-vue';
import { userInfoStore, MenuRender } from '@/stores/user';
import { useRouter } from 'vue-router';

// 接收父组件传值
const props = defineProps({
  collapsed: Boolean
});

const selectedKeys = ref<string[]>([]);

const openKeys = ref<string[]>([]);

const userInfo = userInfoStore();

const menu = userInfo.menu;
const router = useRouter();
const currentPath = router.currentRoute.value.fullPath;
selectedKeys.value = [currentPath];

onBeforeMount(() => {
  const menu = userInfo.menu;
  const currentPath = router.currentRoute.value.fullPath;
  selectedKeys.value = [currentPath];
  getParentKey(menu, currentPath);
});

const getParentKey = (
  menu: MenuRender[],
  path: string,
  parentPath?: string
) => {
  menu.map((item) => {
    if (item?.children && item.children.length > 0) {
      getParentKey(item.children, path, item.path);
      return;
    }
    if (item.path === path) {
      openKeys.value = parentPath ? [parentPath] : [];
      return;
    }
  });
};

// 点击菜单 item 跳转页面
const handelClickMenuItem = ({ key }: { key: string }) => {
  if (key !== router.currentRoute.value.path) {
    router.push(key);
  }
};
</script>

<style scoped lang="less">
.logo {
  height: 32px;
  line-height: 32px;
  text-align: center;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.menu-link {
  display: block;
}
</style>
