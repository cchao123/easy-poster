<template>
  <div ref="textRef" class="aaaaa" :style="{
    fontSize: `${curCompConfig.fontSize}px`,
    fontWeight: `${curCompConfig.fontWeight}`,
    fontStyle: `${curCompConfig.fontStyle}`,
    color: `${curCompConfig.fontColor}`,
  }">{{ curCompConfig.textValue }}</div>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue';
import { watch, computed, onMounted, ref } from 'vue';
import { useStore } from '~/store';

const store = useStore();
const textRef = ref();
const { curCompIndex, setCompSize } = store;

const dynamicWidth = ref();
const dynamicHeight = ref('auto');

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const setTextCompSize = ()=>{
  nextTick(()=>{
    const { offsetWidth, offsetHeight, clientHeight, clientWidth } = textRef.value;
    console.log(offsetWidth, offsetHeight, clientHeight, clientWidth);
    setCompSize(curCompIndex, offsetWidth, offsetHeight);
  })
};

// @TODO 为什么不直接用store 返回？
const curCompConfig = computed(() => store.compList[props.index]);


watch(
  () => curCompConfig.value.textValue,
  () => {
    setTextCompSize();
  },
);

watch(
  () => curCompConfig.value.fontSize,
  () => {
    setTextCompSize();
  },
);

onMounted(()=>{
  setTextCompSize();
});

</script>