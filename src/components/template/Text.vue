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

const textRef = ref();
const store = useStore();
const { curCompIndex, setCompSize } = store;

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const setTextCompSize = ()=>{
  nextTick(()=>{
    const { offsetWidth, offsetHeight, clientHeight, clientWidth } = textRef.value;
    setCompSize(curCompIndex, offsetWidth, offsetHeight);
  })
};

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