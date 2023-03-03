<template>
  <div class="editWrap"
       :class="{ noDrop: curFixedStatus.length === CHECK_MAX_LENGTH, ewDrop: curFixedStatus.indexOf('Y') !== -1, nsDrop: curFixedStatus.indexOf('X') !== -1}"
       @mousedown.stop.prevent="handleMouseDown"
       :style="{
          left: `${item.point.x}px`,
          top: `${item.point.y}px`,
          zIndex: `${item.zIndex}`,
       }">
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
.editWrap:hover {
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