<template>
  <div class="editWrap" @mousedown.stop.prevent="handleMouseDown"
       :style="`left: ${item.point.x}px; top: ${item.point.y}px;`">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, toRefs } from 'vue';
import { useStore } from '~/store';
const store = useStore();
const { setCompPoint, setCurrentCompIndex } = store;

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

const handleMouseDown = (e: any) => {
    setCurrentCompIndex(props.index);
    // ele位置 
    const pointX = props.item.point.x;
    const pointY = props.item.point.y;

    // 鼠标位置 
    const startX = e.clientX;
    const startY = e.clientY;
    
    const move = (moveEvent: any) => {
      // 当前位置
      const currX = moveEvent.clientX;
      const currY = moveEvent.clientY;

      const targetX = pointX + currX - startX;
      const targetY = pointY + currY - startY;

      // x + w >= 375
      setCompPoint(props.index, {
        x: targetX > 0 ? targetX : 0,
        y: targetY > 0 ? targetY : 0,
      });
    };

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    };

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}
</script>

<style lang="postcss">
.editWrap {
  cursor: move;
  position: absolute;
  /* border: 1px solid #000; */
  color: RED;
}
.editWrap:hover {
}
</style>