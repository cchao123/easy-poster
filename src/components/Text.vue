<template>
  <div :style="`font-size: ${currentCompConfig.style.fontSize}px; font-weight: ${currentCompConfig.style.fontWeight};font-style: ${currentCompConfig.style.fontStyle};color: ${currentCompConfig.style.fontColor}`">{{ currentCompConfig.style.textValue }}</div>
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