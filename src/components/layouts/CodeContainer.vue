<template>
  <div class="codeWrap line-numbers">
    <pre>
        <code class="language-js">
          {{ codeRef }}
        </code>
      </pre>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, nextTick, watch } from 'vue';
import { useStore } from '~/store';
import { getStageCode, getBackgroundTpl, getContainerTpl, getTextTpl, getHeadTpl, getImageTpl } from '~/codeTemplate';
const codeRef = ref('');
const store = useStore();
const compList = computed(() => store.compList);
const output = computed(() => store.output);
const curCompConfig = computed(() => store.curCompConfig);
const canvasConfig = computed(() => store.canvasConfig);

watch(
  () => curCompConfig,
  (newCurCompConfig) => {
    getCurCode(newCurCompConfig.value);
  },
  { deep: true },
);

const getApplicationCode = () => {
  codeRef.value = getStageCode(canvasConfig.value);
  nextTick(() => Prism.highlightAll());
};

onMounted(() => {
  getApplicationCode();
});

const getCurCode = (curCompConfig: any) => {
  if (!curCompConfig) {
    getApplicationCode();
    return;
  }
  switch (curCompConfig.type) {
    case 'background':
      codeRef.value = getBackgroundTpl(curCompConfig)['pixiJs'];
      break;
    case 'container':
      codeRef.value = getContainerTpl(curCompConfig)['pixiJs'];
      break;
    case 'text':
      codeRef.value = getTextTpl(curCompConfig)['pixiJs'];
      break;
    case 'head':
      codeRef.value = getHeadTpl(curCompConfig)['pixiJs'];
      break;
    case 'image':
      codeRef.value = getImageTpl(curCompConfig)['pixiJs'];
      break;
  }
  nextTick(() => Prism.highlightAll());
};
</script>

<style lang="postcss" scoped>
.codeWrap {
  flex: 1;
  user-select: text;
  font-size: 14px;
  overflow-y: scroll;
  background-color: #2d2d2d;
}

.code-toolbar {
  height: 100%;
  background-color: #2d2d2d;
}

::-webkit-scrollbar {
  height: 10px;
  width: 100%;
}

::-webkit-scrollbar-thumb {
  background-color: #7d7d7d;
  border-radius: 20px;
}

::-webkit-scrollbar-track {
  border-radius: 20px;
  background-color: #939393;
}
</style>