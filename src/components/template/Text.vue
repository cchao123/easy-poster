<template>
  <div ref="textRef" :style="{
    fontSize: `${curCompConfig.fontSize}px`,
    fontWeight: `${curCompConfig.fontWeight}`,
    fontStyle: `${curCompConfig.fontStyle}`,
    color: `${curCompConfig.fontColor}`,
  }">{{ curCompConfig.textValue }}</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from '~/store';

const store = useStore();
const textRef = ref();

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const setTextCompSize = ()=>{
  // textRef.value
  // console.log(textRef.value.style.width)
};

const curCompConfig = computed(() => store.compList[props.index]);


watch(
  () => curCompConfig,
  () => {
    // console.log(curCompConfig.value)
  },
  { deep: true },
);

onMounted(()=>{
  // setTextCompSize();
});

</script>