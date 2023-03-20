<template>
  <div class="codeWrap line-numbers">
    <pre v-show="outputCodyType === PIXI">
        <code class="language-js">
          {{ pixiCode }}
        </code>
    </pre>
    <pre v-show="outputCodyType === HTML2CANVAS">
        <code class="language-js">
          {{ domCode }}
        </code>
    </pre>
    <pre v-show="outputCodyType === HTML2CANVAS">
        <code class="language-js">
          {{ cssCode }}
        </code>
    </pre>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, nextTick, watch } from 'vue';
import { useStore } from '~/store';
import {
  getStageCode,
  getBackgroundTpl,
  getContainerTpl,
  getTextTpl,
  getHeadTpl,
  getImageTpl,
  getQrTpl,
} from '~/codeTemplate';
import { PIXI, HTML2CANVAS } from '~/constants';
const pixiCode = ref('');
const domCode = ref('');
const cssCode = ref('');
const store = useStore();
const compList = computed(() => store.compList);
const curCompConfig = computed(() => store.curCompConfig);
const canvasConfig = computed(() => store.canvasConfig);
const outputCodyType = computed(() => store.outputCodyType);

watch(
  () => curCompConfig,
  (newCurCompConfig) => {
    getCurCode(newCurCompConfig.value);
  },
  { deep: true },
);

watch(
  () => canvasConfig,
  () => {
    getApplicationCode();
  },
  { deep: true },
);


const getApplicationCode = () => {
  pixiCode.value = getStageCode(canvasConfig.value)['PIXI'];
  domCode.value = getStageCode(canvasConfig.value)['DOM'];
  cssCode.value = getStageCode(canvasConfig.value)['CSS'];
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

  console.log(getBackgroundTpl(curCompConfig));
  switch (curCompConfig.type) {
    case 'background':
      pixiCode.value = getBackgroundTpl(curCompConfig)['PIXI'];
      domCode.value = getBackgroundTpl(curCompConfig)['DOM'];
      cssCode.value = getBackgroundTpl(curCompConfig)['CSS'];
      break;
    case 'container':
      pixiCode.value = getContainerTpl(curCompConfig)['PIXI'];
      domCode.value = getContainerTpl(curCompConfig)['DOM'];
      cssCode.value = getContainerTpl(curCompConfig)['CSS'];
      break;
    case 'text':
      pixiCode.value = getTextTpl(curCompConfig)['PIXI'];
      domCode.value = getTextTpl(curCompConfig)['DOM'];
      cssCode.value = getTextTpl(curCompConfig)['CSS'];
      break;
    case 'head':
      pixiCode.value = getHeadTpl(curCompConfig)['PIXI'];
      domCode.value = getHeadTpl(curCompConfig)['DOM'];
      cssCode.value = getHeadTpl(curCompConfig)['CSS'];
      break;
    case 'image':
      pixiCode.value = getImageTpl(curCompConfig)['PIXI'];
      domCode.value = getImageTpl(curCompConfig)['DOM'];
      cssCode.value = getImageTpl(curCompConfig)['CSS'];
      break;
    case 'qrcode':
      pixiCode.value = getQrTpl(curCompConfig)['PIXI'];
      domCode.value = getQrTpl(curCompConfig)['DOM'];
      cssCode.value = getQrTpl(curCompConfig)['CSS'];
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