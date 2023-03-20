<template>
  <el-dialog v-model="isCodeDialogShow"
             @close="setCodeDialog(false)"
             @open="openOver"
             :show-close="true"
             class="code-dialog"
             :fullscreen="true">
    <div class="code-container line-numbers" v-if="isCodeDialogShow">
        <div class="code-tips">
          clone演示DEMO：<a href="https://github.com/cchao123/cchao123" target="_blank">https://github.com/cchao123/cchao123</a> , copy替换<span class="code-highlight">/components/pixiContainer.vue</span>运行预览
        </div>
        <pre>
        <code v-show="outputCodyType === PIXI" class="language-js">
          <template v-for="item in compList"><template v-if="item.type === 'background'">{{ getBackgroundTpl(item).PIXI }}</template><template v-if="item.type === 'container'">{{ getContainerTpl(item).PIXI }}</template><template v-if="item.type === 'text'">{{ getTextTpl(item).PIXI }}</template><template v-if="item.type === 'head'">{{ getHeadTpl(item).PIXI }}</template><template v-if="item.type === 'image'">{{ getImageTpl(item).PIXI }}</template><template v-if="item.type === 'qrcode'">{{ getQrTpl(item).PIXI }}</template>
          </template></code><code v-show="outputCodyType === HTML2CANVAS" class="language-js"> 
      &lt;template&gt;
          <template v-for="item in compList"><template v-if="item.type === 'background'">{{ getBackgroundTpl(item).DOM }}</template><template v-if="item.type === 'container'">{{ getContainerTpl(item).DOM }}</template><template v-if="item.type === 'text'">{{ getTextTpl(item).DOM }}</template><template v-if="item.type === 'head'">{{ getHeadTpl(item).DOM }}</template><template v-if="item.type === 'image'">{{ getImageTpl(item).DOM }}</template><template v-if="item.type === 'qrcode'">{{ getQrTpl(item).DOM }}</template>
          </template>
      &lt;/template&gt;

      &lt;style&gt;<template v-for="item in compList"><template v-if="item.type === 'background'">{{ getBackgroundTpl(item).CSS }}</template><template v-if="item.type === 'container'">{{ getContainerTpl(item).CSS }}</template><template v-if="item.type === 'text'">{{ getTextTpl(item).CSS }}</template><template v-if="item.type === 'head'">{{ getHeadTpl(item).CSS }}</template><template v-if="item.type === 'image'">{{ getImageTpl(item).CSS }}</template><template v-if="item.type === 'qrcode'">{{ getQrTpl(item).CSS }}</template>
          </template>
      &lt;/style&gt;
        </code>
        </pre>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '~/store';
import { PIXI, HTML2CANVAS } from '~/constants';
import {
  getStageCode,
  getBackgroundTpl,
  getContainerTpl,
  getTextTpl,
  getHeadTpl,
  getImageTpl,
  getQrTpl,
} from '~/codeTemplate';

const store = useStore();
const { setCodeDialog } = store;
const isCodeDialogShow = computed(() => store.isCodeDialogShow);
const compList = computed(() => store.compList);
const outputCodyType = computed(() => store.outputCodyType);
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