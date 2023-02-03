<template>
  <div :style="`font-size: ${currentCompConfig.fontSize}px; font-weight: ${currentCompConfig.fontWeight};font-style: ${currentCompConfig.fontStyle};color: ${currentCompConfig.fontColor}`">{{ currentCompConfig.textValue }}</div>
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
const currentCompConfig = computed(() => store.compList[props.index]);
</script>