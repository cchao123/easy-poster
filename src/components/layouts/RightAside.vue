<template>
  <div class="aside-config">
    <ConfigForm></ConfigForm>
    <CodeContainer></CodeContainer>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from '~/store';
import ConfigForm from '~/components/layouts/ConfigForm.vue';
import CodeContainer from '~/components/layouts/CodeContainer.vue';

const store = useStore();
const compList = computed(() => store.compList);
const curCompConfig = computed(() => store.curCompConfig);
</script>

<style lang="postcss" scoped>
.aside-config {
  position: relative;
  width: 800px;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--ep-menu-border-color);
}


/* .touchBorder {
  cursor: col-resize;
  position: absolute;
  left: 0;
  width: 1px;
  height: 100%;
  background-color: var(--ep-menu-border-color);
} */
</style>