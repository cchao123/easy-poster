<template>
  <div class="editWrap"
       :class="{ noDrop: curFixedStatus.length === CHECK_MAX_LENGTH, ewDrop: curFixedStatus.indexOf('Y') !== -1, nsDrop: curFixedStatus.indexOf('X') !== -1}"
       @mousedown.stop.prevent="handleMouseDown"
       :style="{
          left: `${item.point.x}px`,
          top: `${item.point.y}px`,
          zIndex: `${item.zIndex}`,
       }">
       <span class="bd-top"></span>
       <span class="bd-btm"></span>
       <span class="bd-left"></span>
       <span class="bd-right"></span>
      <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStore } from '~/store';
import { CHECK_MAX_LENGTH } from '~/constants';

const store = useStore();
const { setCompPoint, setCurCompIndex } = store;
const curFixedStatus = computed(() => store.curFixedStatus);

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  index: {
    type: Number,
    default: 0,
  },
  canvasX: {
    type: Number,
    default: 0,
  },
  canvasY: {
    type: Number,
    default: 0,
  },
});

const handleMouseDown = (e: MouseEvent) => {
  setCurCompIndex(props.index);
  // ele位置
  const pointX = props.item.point.x;
  const pointY = props.item.point.y;

  // 鼠标位置
  const startX = e.clientX;
  const startY = e.clientY;

  const move = (moveEvent: MouseEvent) => {
    // 当前位置
    const currX = moveEvent.clientX;
    const currY = moveEvent.clientY;

    const targetX = pointX + currX - startX;
    const targetY = pointY + currY - startY;

    // x + w >= 375
    curFixedStatus.value.indexOf('Y') === -1 && setCompPoint(props.index, 'y', targetY > 0 ? targetY : 0);
    curFixedStatus.value.indexOf('X') === -1 && setCompPoint(props.index, 'x', targetX > 0 ? targetX : 0);
  };

  const up = () => {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
  };

  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up);
};
</script>

<style lang="postcss">
.editWrap {
  cursor: move;
  position: absolute;
}
.bd-top {
  display: none;
  position: absolute;
  left:0;
  top: 0;
  width: 100%;
  height: 1px;
  border-top: 1px dashed #000;
}
.bd-btm {
  display: none;
  position: absolute;
  left:0;
  bottom: 0;
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #000;
}
.bd-left {
  display: none;
  position: absolute;
  left:0;
  top: 0;
  width: 1px;
  height: 100%;
  border-left: 1px dashed #000;
}
.bd-right {
  display: none;
  position: absolute;
  right:0;
  top: 0;
  width: 1px;
  height: 100%;
  border-right: 1px dashed #000;
}

.editWrap:hover .bd-top {
  display: block;
}
.editWrap:hover .bd-btm {
  display: block;
}
.editWrap:hover .bd-left {
  display: block;
}
.editWrap:hover .bd-right {
  display: block;
}


.ewDrop {
  cursor: ew-resize;
}

.nsDrop {
  cursor: ns-resize;
}

.noDrop {
  cursor: no-drop;
}
</style>