<template>
  <el-menu mode="horizontal"
           class="el-header">
    <el-menu-item h="full"
                  @click="toggleDark()"
                  index="1">
      <button class="border-none w-full bg-transparent cursor-pointer"
              style="height: var(--ep-menu-item-height);">
        <i inline-flex
           i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>

    <div class="el-btn-container">
      <el-button color="#626aef"
                 size="large">
        上传PSD
      </el-button>
      <el-button size="large"
                 type="info"
                 @click="isHistoryShow = true">
        历史记录
      </el-button>
      <el-button size="large"
                 type="info"
                 @click="savaTpl"
                 :loading="isSaveLoading">
        暂存进度
      </el-button>
      <el-button plain
                 color="#626aef"
                 size="large">
        查看代码
      </el-button>
    </div>
  </el-menu>

  <el-dialog v-model="isHistoryShow"
             title="历史保存预览">
    <el-table class="his-tab"
              :data="historyList.slice((currentPage-1)* 3, currentPage* 3)"
              highlight-current-row>
      <el-table-column property="id"
                       label="id" />
      <el-table-column label="thumbnail">
        <template #default="scope">
          <img class="thumbnail"
               :src="scope.row.thumbnail">
        </template>
      </el-table-column>

      <el-table-column property="date"
                       label="last modified">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <Timer />
            </el-icon>
            <span style="margin-left: 10px">{{ formatFullDateNew(scope.row.date) }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column property="remarks"
                       label="remarks"
                       width="150px">
        <template #default="scope">
          <el-input v-model="scope.row.remarks"
                    placeholder="Please input"
                    clearable />
        </template>
      </el-table-column>

      <el-table-column fixed="right"
                       label="Operations">
        <template #default="scope">
          <el-popconfirm title="恢复预设状态?" v-if="['centralaxis', 'olympic'].includes(scope.row.id)"
                         @confirm="handleReset(scope)">
            <template #reference>
              <el-button link
                         type="primary"
                         size="small">恢复</el-button>
            </template>
          </el-popconfirm>

          <el-popconfirm v-else title="确定删除该项?"
                         @confirm="handleDel(scope)">
            <template #reference>
              <el-button link
                        :disabled="['centralaxis', 'olympic'].includes(scope.row.id)"
                         type="primary"
                         size="small">删除</el-button>
            </template>
          </el-popconfirm>

          <el-popconfirm title="应用替至画板?"
                         icon-color="#c93b33"
                         :icon="InfoFilled"
                         @confirm="handleEdit(scope)">
            <template #reference>
              <el-button link
                         type="primary"
                         size="small">编辑</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="his-pag"
                   small
                   :current-page="currentPage"
                   :page-size="3"
                   background
                   layout="prev, pager, next"
                   :total="historyList.length"
                   @current-change="handleChange" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { toggleDark } from '~/composables';
import { convertDOMToImage, formatFullDateNew, generateMixed } from '~/utils';
import { Upload, List, SortDown, InfoFilled, Timer } from '@element-plus/icons-vue';
import { useStore } from '~/store';

const store = useStore();
const { initHisList, addHistoryList, delHistoryList, clearCompList, getStorageCurCanvas , resetHistoryList} = store;
const historyList = computed(() => store.historyList);
const curCanvasId = computed(() => store.curCanvasId);
const compList = computed(() => store.compList);

const isSaveLoading = ref(false);
const currentPage = ref(1);

onMounted(()=>{
  initHisList();
});

const handleChange = (curPage: number) => {
  currentPage.value = curPage;
};

const savaTpl = () => {
  console.log(JSON.stringify(compList.value))
  // 是保存还是追加？
  if (compList.value.length <= 0) {
    ElMessage.error('画板为空');
    return;
  }
  if (historyList.value.length >= 15) {
    ElMessage.warning('不能保存更多，请在【历史】中删除');
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
          compList,
          id: curCanvasId.value,
          remarks: `示例${curCanvasId.value}`,
          date: new Date().getTime(),
          thumbnail: base64,
        });
      },
    });
  }
};
const isHistoryShow = ref(false);

const handleDel = (scope: any) => {
  delHistoryList(scope.$index);
};

const handleEdit = (scope: any) => {
  clearCompList();
  nextTick(() => {
    isHistoryShow.value = false;
    getStorageCurCanvas(scope.$index);
  });
};

const handleReset = (scope: any)=> {
  resetHistoryList(scope.$index)
};
</script>

<style lang="postcss">
.el-header {
  height: 60px;
}

.el-btn-container {
  /* background-color: red; */
  margin-left: 260px;
  display: flex;
  align-items: center;
}

/* 23 */

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.thumbnail {
  height: 120px;
}

.his-tab {
  height: 472px;
}
.his-pag {
  margin-top: 20px;
}
</style>



