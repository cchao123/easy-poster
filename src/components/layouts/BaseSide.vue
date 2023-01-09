<template>
  <el-menu
    default-active="home"
    class="el-menu-vertical-demo"
    :router="true"
    :collapse="isCollapse"
    :collapse-transition="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="el-logo" @click="toggleMenuStatus">
      <div class="logo-shadow"></div>
    </div>
    <el-menu-item index="home">
      <el-icon><icon-menu /></el-icon>
      <template #title>操作中心</template>
    </el-menu-item>

    <el-menu-item index="readme">
      <el-icon><document /></el-icon>
      <template #title>使用文档</template>
    </el-menu-item>
    
    <el-menu-item index="3">
      <el-icon><setting /></el-icon>
      <template #title>系统设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const toggleMenuStatus = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 60px; */
}
.el-logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-shadow {
  width: 80%;
  height: 40px;
  background-color: #999;
  opacity: .2;
  border-radius: 5px;
}
</style>
