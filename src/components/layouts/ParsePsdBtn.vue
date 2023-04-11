<template>
  <el-upload :auto-upload="false" class="psd-btn" ref="upload" :limit="1" :before-upload="beforeAvatarUpload"
    :on-exceed="handleExceed" :on-change="parsePSD">
    <el-button color="#626aef" :icon="UploadFilled" size="large" :loading="isParseLoading"
      type="primary">解析PSD</el-button>
  </el-upload>
</template>

<script lang="ts" setup>
import PSD from 'psd.js';
import { ref, computed } from 'vue';
import { base64Toblob } from '~/utils';
import type { UploadFile, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId, ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue';
import { useStore } from '~/store';
const store = useStore();
const {
  clearCompList,
  setCurCompIndex,
  setCompList,
} = store;
const compList = computed(() => store.compList);

const isParseLoading = ref(false);


const parsePSD = (file: UploadFile) => {
  isParseLoading.value = true;
  clearCompList();
  var url = URL.createObjectURL(file.raw);
  PSD.fromURL(url).then((result: any) => {
    // 建议把不group合并为layer-递归处理所有layer转化为base64
    const tree = result.tree().children();
    parsePsdTree(tree);
  });
};

const parsePsdTree = (tree: { isGroup?: any; _children?: any; layer: any; name: any; width?: any; height?: any; left?: any; top?: any; }[]) => {
  return tree.forEach((treeItems: { isGroup?: any; _children?: any; layer: any; name: any; width?: any; height?: any; left?: any; top?: any; }, index: number) => {
    if (treeItems.isGroup()) parsePsdTree(treeItems._children);
    else {
      try {
        const { width, height, left: x, top: y, name } = treeItems;
        const base64 = treeItems.layer.image.toBase64();
        const blobUrl = base64Toblob(base64)

        setCurCompIndex(compList.value.length);
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
          type: 'image',
          url: blobUrl,
          zIndex: index,
          point: { x, y },
          index: 0,
          background: ''
        });
      } catch {
        console.error(treeItems.name);
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

<style>
.psd-btn {
  margin-right: 12px;
}
</style>