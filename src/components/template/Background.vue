<template>
  <img :src="curCompConfig.url" :style="{
    width: curCompConfig.width ? ` ${curCompConfig.width / 2}px` : 'auto',
    height: curCompConfig.height ? ` ${curCompConfig.height / 2}px` : 'auto',
  }">
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '~/store';
const store = useStore();
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});
const curCompConfig = computed(() => store.compList[props.index]);
</script>