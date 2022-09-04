<!-- 基本布局 -->
<template>
  <a-layout>
    <a-layout-sider>Sider</a-layout-sider>
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>Content</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
</script>
<style scoped lang="less">
.ant-layout {
  color: #fff;
}
</style>
