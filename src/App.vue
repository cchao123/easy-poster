<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="el-container">
      <LeftAside></LeftAside>
      <ContentMain></ContentMain>
      <RightAside></RightAside>
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { defineComponent, computed, ref } from 'vue';
</script>

<style lang="postcss">
body,
html,
#app {
  height: 100%;
  user-select: none;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  text-align: center;
  /* color: var(--ep-text-color-primary);
  color: var(--color); */
}

.el-container {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>