<template>
  <el-menu mode="horizontal" class="el-header">
    <el-menu-item h="full" @click="toggleDark()">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height);">
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toggleDark } from '~/composables';
</script>

<style lang="postcss">
.el-header {
  height: 60px;
}
</style>



