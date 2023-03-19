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
import { getStageCode, getBackgroundTpl, getContainerTpl, getTextTpl, getHeadTpl, getImageTpl, getQrTpl } from '~/codeTemplate';
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
  nextTick(() => window.Prism.highlightAll());
};

onMounted(() => {
  getApplicationCode();
});

const getCurCode = (curCompConfig: any) => {
  // console.log(curCompConfig.type)
  if (!curCompConfig) {
    getApplicationCode();
    return;
  }

  // const aaaa = 'pixiJs'
  const aaaa = 'pixiJs'
  switch (curCompConfig.type) {
    case 'background':
      codeRef.value = getBackgroundTpl(curCompConfig)[aaaa];
      break;
    case 'container':
      codeRef.value = getContainerTpl(curCompConfig)[aaaa];
      break;
    case 'text':
      codeRef.value = getTextTpl(curCompConfig)[aaaa];
      break;
    case 'head':
      codeRef.value = getHeadTpl(curCompConfig)[aaaa];
      break;
    case 'image':
      codeRef.value = getImageTpl(curCompConfig)[aaaa];
      break;
    case 'qrcode':
      codeRef.value = getQrTpl(curCompConfig)[aaaa];
      break;
      
  }
  nextTick(() => window.Prism.highlightAll());
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