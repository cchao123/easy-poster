<template>
  <img ref="imageRef"
       class="images"
       :src="curCompConfig.url || errorImg"
       :onerror="error"
       :style="{
         width: curCompConfig.width ? ` ${curCompConfig.width}px`: 'auto',
         height: curCompConfig.height? ` ${curCompConfig.height}px`: 'auto',
       }">
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from '~/store';
import errorImg from '~/assets/image.png';
import { getClientRect } from '~/utils';

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