<template>
  <el-dialog v-model="isListDialogShow"
             @close="setListDialog(false)"
             :draggable="true"
             top="10vh"
             title="暂存模板列表">
    <el-table class="his-tab"
              :data="historyList.slice((currentPage-1) * 3, currentPage * 3)"
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
                       width="160px">
      </el-table-column>

      <el-table-column fixed="right"
                       label="Operations">
        <template #default="scope">
          <el-popconfirm title="确定删除该项?"
                         @confirm="handleDel(scope.$index)">
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
                         @confirm="handleEdit(scope.$index)">
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
import { useStore } from '~/store';
import { formatFullDateNew } from '~/utils';
import { InfoFilled, Timer } from '@element-plus/icons-vue';
const store = useStore();
const { initHisList, delHistoryList, clearCompList, getStorageCurCanvas, setListDialog } = store;
const historyList = computed(() => store.historyList);
const compList = computed(() => store.compList);
const isListDialogShow = computed(() => store.isListDialogShow);

onMounted(() => {
  initHisList();
});

const getCvsInTabIndex = (index: number) => {
  return index + (currentPage.value - 1) * 3;
};

const handleDel = (index: number) => {
  delHistoryList(getCvsInTabIndex(index));
};

const handleEdit = (index: number) => {
  clearCompList();
  nextTick(() => {
    setListDialog(false);
    getStorageCurCanvas(getCvsInTabIndex(index));
  });
};

const currentPage = ref(1);
const handleChange = (curPage: number) => {
  currentPage.value = curPage;
};
</script>


<style lang="postcss">
.thumbnail {
  width: 80px;
}

.his-tab {
  height: 550px;
}
.his-pag {
  margin-top: 20px;
}
</style>