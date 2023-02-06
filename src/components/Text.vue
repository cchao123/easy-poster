<template>
  <div :style="{
    fontSize: `${curCompConfig.fontSize}px`,
    fontWeight: `${curCompConfig.fontWeight}`,
    fontStyle: `${curCompConfig.fontStyle}`,
    color: `${curCompConfig.fontColor}`,
  }">{{ curCompConfig.text }}</div>
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