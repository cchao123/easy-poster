<template>
  <div class="h5-bar" :style="styles" v-show="isShow">
    <div v-if="curCompConfig" :class="`bar-items iconfont icon-${curCompConfig.icon} bar-bt`"></div>

    <ElIcon class="bar-items" @click="setCompZindex(curCompIndex, true)">
      <CaretTop />
    </ElIcon>

    <ElIcon class="bar-items" @click="setCompZindex(curCompIndex, false)">
      <CaretBottom />
    </ElIcon>

    <ElIcon class="bar-items bar-bb" @click="handleDelCurComp">
      <Delete />
    </ElIcon>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Delete, CaretTop, CaretBottom } from '@element-plus/icons-vue';
import { useStore } from '~/store';

const store = useStore();
const { setCompZindex, delCompList } = store;
const curCompIndex = computed(() => store.curCompIndex);

defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  styles: {
    type: Object,
    default: {
      right: '30px',
      top: '80px',
    },
  },
  curCompConfig: {
    type: Object,
    default: () => {},
  },
});

const handleDelCurComp = () => {
  delCompList(curCompIndex.value)
};
</script>


<style lang="scss" scoped>
.h5-bar {
  position: absolute;
  width: 30px;
  border-radius: 5px;
  cursor: pointer;
  :first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  :last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
}

.bar-items {
  width: 30px;
  height: 35px;
  line-height: 35px;
  background-color: var(--ep-fill-color-light);
  color: var(--ep-text-color-regular);
  margin-bottom: 2.5px;
  font-weight: bolder;
  font-size: 16px;
}
</style>