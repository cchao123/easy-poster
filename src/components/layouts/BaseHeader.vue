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
      <el-button color="#626aef"
                 :icon="UploadFilled"
                 size="large">
        上传PSD
      </el-button>
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
    </div>
  </el-menu>
  <ListDialog></ListDialog>
  <CodeDialog></CodeDialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { toggleDark } from '~/composables';
import { convertDOMToImage, generateMixed } from '~/utils';
import { UploadFilled, List, InfoFilled, RefreshLeft, View } from '@element-plus/icons-vue';
import { useStore } from '~/store';
import ListDialog from '~/components/layouts/ListDialog.vue';
import CodeDialog from '~/components/layouts/CodeDialog.vue';

const store = useStore();
const { addHistoryList, resetHistoryList, setListDialog, setCodeDialog } = store;
const historyList = computed(() => store.historyList);
const curCanvasId = computed(() => store.curCanvasId);
const compList = computed(() => store.compList);

const isSaveLoading = ref(false);
const isCodeDialogShow = ref(true);
const savaTpl = () => {
  console.log(JSON.stringify(compList.value));
  // 是保存还是追加？
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
  position: absolute;
  left: 280px;
  top: 8px;
}
</style>



