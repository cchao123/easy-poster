<template>
  <img class="images" :src="currentCompConfig.url || errorImg" :onerror="error" alt="">
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
const currentCompConfig = computed(() => store.compList[props.index]);
</script>

<style lang="postcss">
</style>