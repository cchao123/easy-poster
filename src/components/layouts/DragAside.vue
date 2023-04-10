<template>
  <div class="aside-material"
       @dragstart="dragstart">
    <div class="material-items"
         :draggable="true"
         v-for="(mItem, mIndex) in MATERIAL_LIST"
         :key="mItem.icon"
         :data-index="mIndex">
      <div class="material-icon">
        <div class="iconfont"
             :class="`icon-${mItem.icon}`"></div>
      </div>
      <div class="material-name">{{ mItem.name }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MATERIAL_LIST } from '~/constants';

const dragstart = (e: {
  dataTransfer: {
    setData: (arg0: string, arg1: number) => void;
  };
  target: {
    dataset: {
      index: number;
    };
  };
}) => {
  e.dataTransfer.setData('index', e.target.dataset.index);
};
</script>

<style>
.aside-material {
  width: 100px;
  border-right: solid 1px var(--ep-menu-border-color);
}

.material-items {
  cursor: move;
  margin-top: 20px;
  border-radius: 3px;
}

.material-icon {
  margin: 0 auto;
  width: 60px;
  height: 60px;
  /* border-bottom: 1px solid var(--el-text-color-regular); */
  display: flex;
  justify-content: center;
  align-items: center;
}
.material-icon .iconfont {
  font-size: 35px;
}
.material-name {
  margin-top: 10px;
  font-size: 14px;
}
</style> 