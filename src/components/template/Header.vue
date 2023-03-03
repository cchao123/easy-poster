<template>
  <div class="header"
       :style="{
         width:`${curCompConfig.width}px`,
         height: `${curCompConfig.height}px`,
       }">
    <img :src="curCompConfig.url || errorImg"
         :onerror="error">
    {{ curCompConfig }}
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from '~/store';
import errorImg from '~/assets/head.png';
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
.header {
  overflow: hidden;
  border-radius: 50%;
}
.header img {
  width: 100%;
  height: 100%;
}
</style>