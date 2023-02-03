<template>
  <div class="header">
    <img :src="currentCompConfig.url || errorImg" :onerror="error" alt="">
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '~/store';
import errorImg from '~/assets/head.png'

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const store = useStore();
// const currentCompConfig = computed(() => store.compList[props.index]);
const currentCompConfig = computed(() => store.currentCompConfig);
</script>

<style lang="postcss">
.header {
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;

}
.header img {
  width: 50px;
  height: 50px;
}
</style>