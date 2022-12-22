<!-- 基本布局 -->
<template>
  <a-layout>
    <SideBar :collapsed="collapsed" />
    <a-layout>
      <a-layout-header>
        <Header :collapsed="collapsed" @toggle-collapsed="toggle" />
      </a-layout-header>
      <a-layout-content class="page-container">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Header from '../header/index.vue';
import SideBar from '../sideBar/index.vue';

const collapsed = ref<boolean>(false);

const toggle = (val: boolean) => {
  collapsed.value = val;
};
</script>

<style scoped lang="less">
.ant-layout {
  color: #fff;
  .ant-layout-header {
    padding: 0 24px;
    background: #fff;
  }

  .ant-layout-content {
    color: #333;

    &.page-container {
      padding: 24px;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>
