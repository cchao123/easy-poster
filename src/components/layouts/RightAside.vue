<template>
  <div class="aside-config">
    <div class="rightborder"></div>
    <ConfigForm></ConfigForm>
    <div class="codeWrap">
      <pre>console.log(123)</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ConfigForm from '~/components/layouts/ConfigForm.vue'
</script>

<style lang="postcss" scoped>
.aside-config {
  position: relative;
  width: 800px;
  display: flex;
  flex-direction: column;
}
.codeWrap {
  flex-basis: 50%;
  user-select: text;
}

.rightborder {
  cursor: col-resize;
  position: absolute;
  left: 0;
  width: 1px;
  height: 100%;
  background-color: var(--ep-menu-border-color);
}
</style>