<template>
  <ElDialog v-model="isListDialogShow" @close="setListDialog(false)" :draggable="true" top="10vh" title="暂存模板列表">
    <ElTable class="his-tab" :data="historyList.slice(pageStartIdx, pageEndIdx)" highlight-current-row>
      <ElTableColumn property="id" label="id" />
      <ElTableColumn label="thumbnail">
        <template #default="scope">
          <img class="thumbnail" :src="scope.row.thumbnail">
        </template>
      </ElTableColumn>

      <ElTableColumn property="date" label="last modified">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <ElIcon>
              <Timer />
            </ElIcon>
            <span style="margin-left: 10px">{{ formatFullDateNew(scope.row.date) }}</span>
          </div>
        </template>
      </ElTableColumn>

      <ElTableColumn property="remarks" label="remarks" width="160px">
      </ElTableColumn>

      <ElTableColumn fixed="right" label="Operations">
        <template #default="scope">
          <ElPopconfirm title="确定删除该项?" @confirm="handleDel(scope.$index)">
            <template #reference>
              <ElButton link :disabled="['centralaxis', 'olympic'].includes(scope.row.id)" type="primary"
                size="small">删除</ElButton>
            </template>
          </ElPopconfirm>

          <ElPopconfirm title="应用替至画板?" icon-color="#c93b33" :icon="InfoFilled" @confirm="handleEdit(scope.$index)">
            <template #reference>
              <ElButton link type="primary" size="small">编辑</ElButton>
            </template>
          </ElPopconfirm>
        </template>
      </ElTableColumn>
    </ElTable>
    <ElPagination class="his-pag" small :current-page="currentPage" :page-size="3" background layout="prev, pager, next"
      :total="historyList.length" @current-change="handleChange" />
  </ElDialog>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useStore } from '~/store'
import { formatFullDateNew } from '~/utils'
import { InfoFilled, Timer } from '@element-plus/icons-vue'
const store = useStore()
const {
  initHisList,
  delHistoryList,
  clearCompList,
  getStorageCurCanvas,
  setListDialog,
} = store
const historyList = computed(() => store.historyList)
const isListDialogShow = computed(() => store.isListDialogShow)

const PAGE_SIZE = 3
const currentPage = ref(1)
const pageStartIdx = computed(() => (currentPage.value - 1) * PAGE_SIZE)
const pageEndIdx = computed(() => currentPage.value * PAGE_SIZE)

const handleChange = (curPage: number) => {
  currentPage.value = curPage
}

onMounted(initHisList)

const getCvsInTabIndex = (index: number) => {
  return index + (currentPage.value - 1) * PAGE_SIZE
}

const handleDel = (index: number) => {
  delHistoryList(getCvsInTabIndex(index))
}

const handleEdit = (index: number) => {
  clearCompList()
  nextTick(() => {
    setListDialog(false)
    getStorageCurCanvas(getCvsInTabIndex(index))
  })
}

</script>


<style lang="scss">
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