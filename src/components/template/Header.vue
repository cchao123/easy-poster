<template>
  <img class="header" :style="{
    width: `${curCompConfig.width / 2}px`,
    height: `${curCompConfig.width / 2}px`,
  }" :src="curCompConfig.url || errorImg">
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '~/store';
import errorImg from '~/assets/head.png';

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const store = useStore();
const curCompConfig = computed(() => store.compList[props.index]);
</script>

<style lang="scss">
.header {
  overflow: hidden;
  border-radius: 50%;
}

.header img {
  width: 100%;
  height: 100%;
}
</style>