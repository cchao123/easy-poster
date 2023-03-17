<template>
  <div :style="{
    width: `${curCompConfig.width / 2}px`,
    height: `${curCompConfig.height / 2}px`,
    background: `${curCompConfig.background}`,
  }"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '~/store';
import errorImg from '~/assets/image.png'

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const store = useStore();
const curCompConfig = computed(() => store.compList[props.index]);
</script>

<style lang="postcss">
</style>