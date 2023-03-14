<template>
  <img v-if="!curCompConfig.url"
       :src="errorImg">
  <img ref="imageRef"
       v-else
       :src="curCompConfig.url"
       :style="{
         width: curCompConfig.width ? ` ${curCompConfig.width}px`: 'auto',
         height: curCompConfig.height ? ` ${curCompConfig.height}px`: 'auto',
       }">
</template>

<script lang="ts" setup>
import { watch, ref, onMounted, computed, nextTick } from 'vue';
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
const { setCompSize } = store;

const imageRef = ref();

const setTextCompSize = () => {
  const { offsetWidth, offsetHeight, clientHeight, clientWidth } = imageRef.value;
  setCompSize(props.index, offsetWidth, offsetHeight);
};

watch(
  () => curCompConfig.value && curCompConfig.value.url,
  (newConfig) => {
    if (newConfig === '') setCompSize(props.index, 0, 0);
    else {
      nextTick(() => {
        if (imageRef.value) {
          imageRef.value.onload = () => {
            setTextCompSize();
          };
        }
      });
    }
  },
);
</script>
