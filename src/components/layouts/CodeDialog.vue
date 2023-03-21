<template>
  <el-dialog v-model="isCodeDialogShow"
             @close="setCodeDialog(false)"
             @open="openOver"
             :show-close="true"
             class="code-dialog"
             :fullscreen="true">
    <template v-if="isCodeDialogShow">
      <div class="code-container line-numbers"
           v-show="outputCodyType === OutputType.PIXI">
        <pre>
          <code class="language-js">
            <template v-for="item in compList"><template v-if="item.type === TemplateType.BACKGROUND">{{ getBackgroundTpl(item).PIXI }}</template><template v-if="item.type === TemplateType.CONTAINER">{{ getContainerTpl(item).PIXI }}</template><template v-if="item.type === TemplateType.TEXT">{{ getTextTpl(item).PIXI }}</template><template v-if="item.type === TemplateType.HEAD">{{ getHeadTpl(item).PIXI }}</template><template v-if="item.type === TemplateType.IMAGE">{{ getImageTpl(item).PIXI }}</template><template v-if="item.type === TemplateType.QRCODE">{{ getQrTpl(item).PIXI }}</template></template>
      {{ pixiLastCode }}
          </code>
        </pre>
      </div>

      <div class="code-container line-numbers"
           v-show="outputCodyType === OutputType.HTML2CANVAS">
        <pre>
          <code class="language-js"> 
      &lt;template&gt;
      <template v-for="item in compList"><template v-if="item.type === TemplateType.BACKGROUND">{{ getBackgroundTpl(item).DOM }}</template><template v-if="item.type === TemplateType.CONTAINER">{{ getContainerTpl(item).DOM }}</template><template v-if="item.type === TemplateType.TEXT">{{ getTextTpl(item).DOM }}</template><template v-if="item.type === TemplateType.HEAD">{{ getHeadTpl(item).DOM }}</template><template v-if="item.type === TemplateType.IMAGE">{{ getImageTpl(item).DOM }}</template><template v-if="item.type === TemplateType.QRCODE">{{ getQrTpl(item).DOM }}</template></template>
      &lt;/template&gt;

      &lt;style&gt;
      <template v-for="item in compList"><template v-if="item.type === TemplateType.BACKGROUND">{{ getBackgroundTpl(item).CSS }}</template><template v-if="item.type === TemplateType.CONTAINER">{{ getContainerTpl(item).CSS }}</template><template v-if="item.type === 'text'">{{ getTextTpl(item).CSS }}</template><template v-if="item.type === TemplateType.HEAD">{{ getHeadTpl(item).CSS }}</template><template v-if="item.type === TemplateType.IMAGE">{{ getImageTpl(item).CSS }}</template><template v-if="item.type === TemplateType.QRCODE">{{ getQrTpl(item).CSS }}</template></template>
      &lt;/style&gt;
          </code>
        </pre>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '~/store';
import { OutputType, TemplateType } from '~/constants';
import {
  getStageCode,
  getBackgroundTpl,
  getContainerTpl,
  getTextTpl,
  getHeadTpl,
  getImageTpl,
  getQrTpl,
} from '~/codeTemplate';


const sortByAge = (arr: any[]) => {
  const newArr = [...arr];
  newArr.sort((a, b) => a.zIndex - b.zIndex);
  return newArr;
}



const store = useStore();
const { setCodeDialog } = store;
const isCodeDialogShow = computed(() => store.isCodeDialogShow);
const compList = computed(() => store.compList);
const outputCodyType = computed(() => store.outputCodyType);
const pixiLastCode = computed(() =>  store.pixiLastCode);

const openOver = () => {
  window.Prism.highlightAll();
};
</script>


<style lang="postcss">
.code-container {
  user-select: text;
  background-color: #2d2d2d;
  padding: 0 10px;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 1100px;
  justify-content: space-between;
  border-radius: 15px;
}

.code-dialog {
  background-color: rgba(0, 0, 0, 0.1);
}

.ep-drawer__header {
  /* height: 60px; */
  margin-bottom: 15px;
}

.code-drawer {
  text-align: left;
  margin-bottom: 10px;
}

.code-dialog .code-toolbar {
  height: 85vh;
  overflow: scroll;
}

.code-dialog .line-numbers-rows {
  left: -6.5em !important;
}

.code-tips {
  text-align: left;
  text-indent: 50px;
  color: #cfd2da;
}

.code-highlight {
  background-color: #1e1e1e;
  color: #6899eb;
}


</style>