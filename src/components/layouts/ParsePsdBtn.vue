<template>
  <ElUpload :auto-upload="false" class="psd-btn" ref="upload" :limit="1" :on-exceed="handleExceed" :on-change="parsePSD">
    <ElButton color="#626aef" :icon="UploadFilled" size="large" :loading="isParseLoading" type="primary">解析PSD</ElButton>
  </ElUpload>
</template>

<script lang="ts" setup>
import PSD from 'psd.js';
import { ref } from 'vue';
import { TemplateType } from '~/constants'
import { base64Toblob } from '~/utils';
import { PsdTreeItem, PsdFile } from '~/types';
import type { UploadFile, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId, ElMessage, ElNotification } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue';
import { useStore } from '~/store';
const store = useStore();
const {
  clearCompList,
  setCompList,
} = store;

const isParseLoading = ref(false);

const parsePSD = (file: UploadFile) => {
  if (!file.name.includes('psd')) {
    ElMessage.error('非psd格式')
    return;
  }
  isParseLoading.value = true;
  clearCompList();
  var url = URL.createObjectURL(file.raw);
  PSD.fromURL(url).then((result: PsdFile) => {
    console.log(result)
    // 建议把不group合并为layer-递归处理所有layer转化为base64
    const tree = result.tree().children();
    parsePsdTree(tree);
    ElMessage.success('psd success');
  });
};

const parsePsdTree = (tree: PsdTreeItem[]) => {
  return tree.forEach((treeItems: PsdTreeItem, index: number) => {
    if (treeItems.isGroup()) parsePsdTree(treeItems._children);
    else {
      try {
        const { width, height, left: x, top: y, name } = treeItems;
        const base64 = treeItems.layer.image.toBase64();
        const blobUrl = base64Toblob(base64)
        setCompList({
          dragDirFixed: [],
          fontColor: '#000',
          fontSize: 24,
          fontStyle: 'normal',
          fontWeight: 'normal',
          width,
          height,
          icon: 'tupian',
          name: `${index}-${name}`,
          radius: 0,
          textValue: '文本内容',
          type: TemplateType.IMAGE,
          url: blobUrl,
          zIndex: index,
          point: { x, y },
          index: 0,
          background: ''
        });
      } catch {
        ElNotification({
          message: treeItems.name,
          type: 'error',
        });
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

</script>

<style>
.psd-btn {
  margin-right: 12px;
}
</style>