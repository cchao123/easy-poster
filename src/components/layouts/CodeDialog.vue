<template>
  <el-dialog v-model="isCodeDialogShow"
             @close="setCodeDialog(false)"
             @open="openOver"
             :show-close="true"
             class="code-dialog"
             :fullscreen="true">
    <div class="code-container line-numbers">
        <div class="code-drawer">
          // clone实例项目https://github.com/cchao123/pixi-demo , 点击右侧copy替换<code>components/pixiContainer.vue</code>内预览
        </div>
        <pre>
        <code class="language-js"> 
      &lt;template&gt;
          <template v-for="item in compList"><template v-if="item.type === 'background'">{{ getBackgroundTpl(item).DOM }}</template><template v-if="item.type === 'container'">{{ getContainerTpl(item).DOM }}</template><template v-if="item.type === 'text'">{{ getTextTpl(item).DOM }}</template><template v-if="item.type === 'head'">{{ getHeadTpl(item).DOM }}</template><template v-if="item.type === 'image'">{{ getImageTpl(item).DOM }}</template><template v-if="item.type === 'qrcode'">{{ getQrTpl(item).DOM }}</template>
          </template>
      &lt;/template&gt;

      &lt;style&gt;<template v-for="item in compList"><template v-if="item.type === 'background'">{{ getBackgroundTpl(item).CSS }}</template><template v-if="item.type === 'container'">{{ getContainerTpl(item).CSS }}</template><template v-if="item.type === 'text'">{{ getTextTpl(item).CSS }}</template><template v-if="item.type === 'head'">{{ getHeadTpl(item).CSS }}</template><template v-if="item.type === 'image'">{{ getImageTpl(item).CSS }}</template><template v-if="item.type === 'qrcode'">{{ getQrTpl(item).CSS }}</template>
          </template>
      &lt;/style&gt;
        </code>
        
        <code v-if="false" class="language-js">
          <template v-for="item in compList"><template v-if="item.type === 'background'">{{ getBackgroundTpl(item).PIXI }}</template><template v-if="item.type === 'container'">{{ getContainerTpl(item).PIXI }}</template><template v-if="item.type === 'text'">{{ getTextTpl(item).PIXI }}</template><template v-if="item.type === 'head'">{{ getHeadTpl(item).PIXI }}</template><template v-if="item.type === 'image'">{{ getImageTpl(item).PIXI }}</template><template v-if="item.type === 'qrcode'">{{ getQrTpl(item).PIXI }}</template>
          </template>
        </code>
        </pre>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
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

const store = useStore();
const { setCodeDialog } = store;
const isCodeDialogShow = computed(() => store.isCodeDialogShow);
const compList = computed(() => store.compList);
const openOver = () => {
  window.Prism.highlightAll();
};
onMounted(()=>{
  openOver();
});
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




/* ::-webkit-scrollbar {
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
} */
</style>