<template>
  <el-menu mode="horizontal"
           class="el-header">
    <div class="el-header-logo">EasyPoster</div>
    <el-menu-item h="full"
                  @click="toggleDark()"
                  index="theme">
      <button class="border-none w-full bg-transparent cursor-pointer"
              style="height: var(--ep-menu-item-height);">
        <i inline-flex
           i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
    <div class="el-btn-container">
      <el-upload :auto-upload="false" class="psd-btn"
      ref="upload"
      :limit="1"
      :before-upload="beforeAvatarUpload"
      :on-exceed="handleExceed"
                 :on-change="parsePSD">
        <el-button color="#626aef"
                   :icon="UploadFilled"
                   size="large"
                   :loading="isParseLoading"
                   type="primary">解析PSD</el-button>
      </el-upload>

      <el-button size="large"
                 color="#626aef"
                 type="primary"
                 :icon="List"
                 @click="setListDialog(true)">

        模板记录
      </el-button>
      <el-button size="large"
                 type="primary"
                 color="#626aef"
                 :icon="InfoFilled"
                 @click="savaTpl"
                 :disabled="!compList.length"
                 :loading="isSaveLoading">
        暂存进度
      </el-button>
      <el-button plain
                 color="#626aef"
                 :disabled="!compList.length"
                 size="large"
                 :icon="View"
                 @click="setCodeDialog(true)">
        查看代码
      </el-button>

      <el-button v-if="['centralaxis', 'olympic'].includes(curCanvasId)"
                 plain
                 color="#626aef"
                 :icon="RefreshLeft"
                 @click="handleReset"
                 size="large">
        <span>恢复预设</span>
      </el-button>
      <div class="codeType"
           :class="{ codeTypeIndex  : isCodeDialogShow }">
        <el-switch v-model="outputCodyType"
                   @change="changeOutput"
                   inactive-color="#626aef"
                   :active-value="OutputType.HTML2CANVAS"
                   :active-text="OutputType.HTML2CANVAS"
                   :inactive-value="OutputType.PIXI"
                   :inactive-text="OutputType.PIXI" />
      </div>
    </div>
  </el-menu>
  <ListDialog />
  <CodeDialog />
</template>

<script lang="ts" setup>
import PSD from 'psd.js';
import { ref, computed, reactive } from 'vue';
import { ElMessage, ElDialog } from 'element-plus';
import { toggleDark } from '~/composables';
import { OutputType } from '~/constants';
import { CompItem } from '~/types';
import { convertDOMToImage, generateMixed, base64Toblob } from '~/utils';
import { UploadFilled, List, InfoFilled, RefreshLeft, View } from '@element-plus/icons-vue';
import ListDialog from '~/components/layouts/ListDialog.vue';
import CodeDialog from '~/components/layouts/CodeDialog.vue';
import { useStore } from '~/store';
import { genFileId } from 'element-plus'
import type { UploadFile, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
const store = useStore();
const isCodeDialogShow = computed(() => store.isCodeDialogShow);
const historyList = computed(() => store.historyList);
const curCanvasId = computed(() => store.curCanvasId);
const compList = computed(() => store.compList);
const outputCodyType = ref(OutputType.PIXI);

const {
  addHistoryList,
  resetHistoryList,
  setListDialog,
  setCodeDialog,
  setOutputCode,
  clearCompList,
  setCompList,
  setCurCompIndex,
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
    const { compList } = store; // @TODO 解构可以消除响应
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


const isParseLoading = ref(false);
const parsePSD = (file: UploadFile) => {
  isParseLoading.value = true;
  clearCompList();
  var url = URL.createObjectURL(file.raw);
  PSD.fromURL(url).then((result: any) => {
    // 建议把不group合并为layer-递归处理所有layer转化为base64
    const tree = result.tree().children();
    parsePsdTree(tree, 1);
  });
};

const parsePsdTree = (tree: any, round: any) => {
  return tree.forEach((treeItems: any, index: number) => {
    if (treeItems.isGroup()) parsePsdTree(treeItems._children, 2);
    else {
      try {
        // console.log(index, treeItems.name);
        const { width, height, left, top, name, layer } = treeItems;
        const base64 = treeItems.layer.image.toBase64();
        const blobUrl = base64Toblob(base64)
       
        setCurCompIndex(compList.value.length);
        setCompList({
          dragDirFixed: [],
          fontColor: '#000',
          fontSize: 24,
          fontStyle: 'normal',
          fontWeight: 'normal',
          width: treeItems.width,
          height: treeItems.height,
          icon: 'tupian',
          name: index + treeItems.name,
          radius: 0,
          textValue: '文本内容',
          type: 'image',
          url: blobUrl,
          zIndex: index,
          point: { x: treeItems.left, y: treeItems.top },
        });
      } catch {
        // console.error(treeItems.name);
      }
      isParseLoading.value = false;
    }
  });
};
const upload = ref<UploadInstance>();
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style lang="postcss">
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

.psd-btn {
  margin-right: 12px;
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



