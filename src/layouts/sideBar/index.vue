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
    >
      <template v-for="item in userInfo.menu" :key="item.path">
        <a-sub-menu v-if="item.children && item.children.length > 0">
          <template #icon>
            <DesktopOutlined />
          </template>
          <template #title>{{ item.title }}</template>
          <template v-for="subItem in item.children">
            <router-link :to="subItem.path" class="menu-link">
              <a-menu-item :key="subItem.path">
                {{ subItem.title }}-{{ subItem.path }}
              </a-menu-item>
            </router-link>
          </template>
        </a-sub-menu>

        <router-link v-else :to="item.path" class="menu-link">
          <a-menu-item :key="item.path">
            <pie-chart-outlined />
            {{ item.title }}-{{ item.path }}
          </a-menu-item>
        </router-link>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons-vue';
import { userInfoStore } from '@/stores/user';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';

// 接收父组件传值
const props = defineProps({
  collapsed: Boolean
});

const selectedKeys = ref<string[]>([]);

const openKeys = ref<string[]>([]);

const userInfo = userInfoStore();

const router = useRouter();
selectedKeys.value = [router.currentRoute.value.fullPath];
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
