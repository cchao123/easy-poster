<template>
  <ElMenu mode="horizontal" class="el-header">
    <div class="el-header-logo" ref="logo" :style="{
      transform: `translate3d(${x}px, ${y}px ,0)`,
    }">EasyPoster</div>
    <ElMenuItem h="full" @click="toggleDark()" index="theme">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menuItem-height);">
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </ElMenuItem>
    <div class="el-btn-container">
      <ParsePsdBtn />

      <ElButton size="large" color="#626aef" type="primary" :icon="List" @click="setListDialog(true)">
        模板记录
      </ElButton>

      <ElButton size="large" type="primary" color="#626aef" :icon="InfoFilled" @click="savaTpl"
        :disabled="!compList.length" :loading="isSaveLoading">
        暂存进度
      </ElButton>

      <ElButton plain color="#626aef" :disabled="!compList.length" size="large" :icon="View"
        @click="setCodeDialog(true)">
        查看代码
      </ElButton>

      <ElButton v-if="['centralaxis', 'olympic'].includes(curCanvasId)" plain color="#626aef" :icon="RefreshLeft"
        @click="handleReset" size="large">
        <span>恢复预设</span>
      </ElButton>

      <div class="codeType" :class="{ codeTypeIndex: isCodeDialogShow }">
        <ElSwitch v-model="outputCodyType" @change="changeOutput(outputCodyType)" inactive-color="#626aef"
          :active-value="OutputType.HTML2CANVAS" :active-text="OutputType.HTML2CANVAS" :inactive-value="OutputType.PIXI"
          :inactive-text="OutputType.PIXI" />
      </div>
    </div>
  </ElMenu>
  <Teleport to="#app">
    <ListDialog />
    <CodeDialog />
  </Teleport>
</template>

<script lang="ts" setup>
import { useMouseMove } from '~/hooks';
import { ref, computed } from 'vue';
import { toggleDark } from '~/composables';
import { OutputType } from '~/constants';
import { convertDOMToImage } from '~/utils';
import { ElMessage } from 'element-plus'
import { List, InfoFilled, RefreshLeft, View } from '@element-plus/icons-vue';
import ListDialog from '~/components/layouts/ListDialog.vue';
import CodeDialog from '~/components/layouts/CodeDialog.vue';
import ParsePsdBtn from '~/components/layouts/ParsePsdBtn.vue';

import { useStore } from '~/store';
const store = useStore();
const isCodeDialogShow = computed(() => store.isCodeDialogShow);
const historyList = computed(() => store.historyList);
const curCanvasId = computed(() => store.curCanvasId);
const compList = computed(() => store.compList);
const outputCodyType = ref<OutputType>(OutputType.PIXI);


const logo = ref();
const { x, y } = useMouseMove(logo);

const {
  addHistoryList,
  resetHistoryList,
  setListDialog,
  setCodeDialog,
  setOutputCode,
} = store;

const isSaveLoading = ref(false);
const savaTpl = () => {
  console.log(JSON.stringify(compList.value));
  if (compList.value.length <= 0) {
    ElMessage.error('画板为空');
    return;
  }
  if (historyList.value.length >= 15) {
    ElMessage.warning('不能保存更多，请在【模板记录】中删除');
    return;
  }
  isSaveLoading.value = true;
  const DOM: HTMLElement | null = document.querySelector('.h5-view');
  if (DOM) {
    const { compList } = store;
    convertDOMToImage({
      DOM,
      quality: 0.1,
      callback: (base64: string) => {
        isSaveLoading.value = false;
        addHistoryList({
          id: curCanvasId.value,
          remarks: `示例${curCanvasId.value}`,
          date: new Date().getTime(),
          thumbnail: base64,
          compList,
        });
      },
    });
  }
};

const curCanvasIndex = computed(() => store.curCanvasIndex);
const handleReset = () => {
  resetHistoryList(curCanvasIndex.value);
};

const changeOutput = (OutputType: OutputType) => {
  setOutputCode(OutputType);
};
</script>

<style lang="scss">
.el-header {
  display: flex;
  justify-content: space-between;
  height: 60px;
}

.el-header-logo {
  margin-left: 20px;
  line-height: 60px;
  font-size: 14px;
  font-weight: bolder;
}

.el-btn-container {
  display: flex;
  position: absolute;
  left: 280px;
  top: 8px;
}

.codeType {
  background-color: var(--ep-menu-bg-color);
  position: absolute;
  top: 2px;
  left: 682px;
  padding: 2px 10px;
  border-radius: 20px;
}

.codeTypeIndex {
  z-index: 3000;
  box-shadow: 0 1px 40px 1px var(--ep-menu-border-color);
}
</style>
