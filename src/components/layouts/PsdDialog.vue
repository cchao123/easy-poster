<template>
  <el-dialog v-model="isPsdDialogShow"
             class="code-dialog"
             :fullscreen="true">
    <div class="aaa">
      <el-upload :auto-upload="false"
                 :on-change="parsePSD"
                 class="upload-demo"
                 drag
                 action="">
        <i class="el-icon-upload" />
        <div class="el-upload__text">点击添加或拖放PSD文件</div>
      </el-upload>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useStore } from '~/store';
import { OutputType, TemplateType } from '~/constants';
import { UploadFilled } from '@element-plus/icons-vue';
import PSD from 'psd.js';

const store = useStore();
const psdCompList = ref<any[]>([]);
const compList = computed(() => store.compList);
const { setCodeDialog, clearCompList, setCompList, setCurCompIndex } = store;
const isPsdDialogShow = true;
const aaaa = ref();
const parsePSD = (file: any) => {
  var url = URL.createObjectURL(file.raw);

  PSD.fromURL(url).then((result: any) => {
    clearCompList();
    // 建议把不group合并为layer-递归处理所有layer转化为base64
    const tree = result.tree().children();
    parsePsdTree(tree);
  });
};

const parsePsdTree = (tree: any) => {
  return tree.forEach((treeItems: any, index: number) => {
    if (treeItems.isGroup()) parsePsdTree(treeItems._children);
    else {
      try {
        const { width, height, left, top, name, layer } = treeItems;
        const base64 = treeItems.layer.image.toBase64();
        const parts = base64.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const array = new Uint8Array(new ArrayBuffer(rawLength));
        for (let i = 0; i < rawLength; i++) {
          array[i] = raw.charCodeAt(i);
        }
        const blob = new Blob([array], { type: contentType });
        let link = URL.createObjectURL(blob);
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
          name: '图片素材',
          radius: 0,
          textValue: '文本内容',
          type: 'image',
          url: link,
          point: { x: treeItems.left, y: treeItems.top },
        });
      } catch {
        console.error(treeItems.name);
      }
      // return treeItems.name, treeItems.layer.image.toBase64();
    }
  });
};

onMounted(() => {});
</script>


<style lang="postcss">
.aaa {
  width: 50px;
  height: 50px;
}
</style>