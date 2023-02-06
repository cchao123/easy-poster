<template>
  <div :style="`font-size: ${curCompConfig.fontSize}px; font-weight: ${curCompConfig.fontWeight};font-style: ${curCompConfig.fontStyle};color: ${curCompConfig.fontColor}`">{{ curCompConfig.textValue }}</div>
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