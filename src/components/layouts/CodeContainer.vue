<template>
  <div class="codeWrap line-numbers">
    <pre v-show="outputCodyType === OutputType.PIXI">
        <code class="language-js">
          {{ curTempCode[CodeType.PIXI] }}
        </code>
    </pre>
    <pre v-show="outputCodyType === OutputType.HTML2CANVAS">
        <code class="language-js">
          {{curTempCode[CodeType.DOM] }}
        </code>
    </pre>
    <pre v-show="outputCodyType === OutputType.HTML2CANVAS">
        <code class="language-js">
          {{ curTempCode[CodeType.CSS] }}
        </code>
    </pre>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, nextTick, watch } from 'vue';
import { CompItem } from '~/types';
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
import { OutputType, TemplateType, CodeType } from '~/constants';
const curTempCode = ref({
  PIXI: '',
  DOM: '',
  CSS: '',
});
const store = useStore();
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
  curTempCode.value = getStageCode(canvasConfig.value);
  nextTick(() => window.Prism.highlightAll());
};

onMounted(() => {
  getApplicationCode();
});

const getCurCode = (curCompConfig: CompItem) => {
  if (!curCompConfig) {
    getApplicationCode();
    return;
  };
  switch (curCompConfig.type) {
    case TemplateType.BACKGROUND:
      curTempCode.value = getBackgroundTpl(curCompConfig);
      break;
    case TemplateType.CONTAINER:
      curTempCode.value = getContainerTpl(curCompConfig);
      break;
    case TemplateType.TEXT:
      curTempCode.value = getTextTpl(curCompConfig);
      break;
    case TemplateType.HEAD:
      curTempCode.value = getHeadTpl(curCompConfig);
      break;
    case TemplateType.IMAGE:
      curTempCode.value = getImageTpl(curCompConfig);
      break;
    case TemplateType.QRCODE:
      curTempCode.value = getQrTpl(curCompConfig);
      break;
    default:
      return `ERROR - ${curCompConfig.type}`;
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


</style>