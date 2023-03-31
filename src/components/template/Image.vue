<template>
  <img v-if="!curCompConfig.url"
       :src="errorImg">
  <img ref="imageRef"
       v-else
       :src="curCompConfig.url"
       :style="{
         width: curCompConfig.width ? ` ${curCompConfig.width / 2}px`: 'auto',
         height: curCompConfig.height ? ` ${curCompConfig.height / 2}px`: 'auto',
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
const delStatus = computed(() => store.delStatus);
const { setCompSize } = store;

const imageRef = ref();

const setTextCompSize = () => {
  const { offsetWidth, offsetHeight, clientHeight, clientWidth } = imageRef.value;
  setCompSize(props.index, offsetWidth, offsetHeight);
};

watch(
  () => curCompConfig.value && curCompConfig.value.url,
  (url) => {
    if (!delStatus.value) {
      if (url === '') setCompSize(props.index, 0, 0);
      else {
        nextTick(() => {
          if (imageRef.value) {
            imageRef.value.onload = () => {
              setTextCompSize();
            };
          }
        });
      }
    }
  },
);
</script>
