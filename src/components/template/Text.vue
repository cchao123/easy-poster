<template>
  <div ref="textRef" :style="{
    fontSize: `${curCompConfig.fontSize / 2}px`,
    fontWeight: `${curCompConfig.fontWeight}`,
    fontStyle: `${curCompConfig.fontStyle}`,
    color: `${curCompConfig.fontColor}`,
  }">{{ curCompConfig.textValue }}</div>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue';
import { watch, computed, onMounted, ref } from 'vue';
import { useStore } from '~/store';

const textRef = ref();
const store = useStore();
const { curCompIndex, setCompSize } = store;

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const setTextCompSize = () => {
  nextTick(() => {
    if (textRef.value) {
      const { offsetWidth, offsetHeight } = textRef.value;
      setCompSize(props.index, offsetWidth, offsetHeight);
    }
  });
};

const curCompConfig = computed(() => store.compList[props.index]);

watch(
  () => curCompConfig.value && curCompConfig.value.fontSize,
  () => {
    setTextCompSize();
  },
);

watch(
  () => curCompConfig.value && curCompConfig.value.textValue,
  () => {
    setTextCompSize();
  },
);

onMounted(() => {
  setTextCompSize();
});

</script>