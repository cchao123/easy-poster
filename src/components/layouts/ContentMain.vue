<template>
  <div class="main" ref="mainRef">
    <div class="iphone" :style="`transform: scale(${canvasZoom}) translate3d(0, ${canvasY}px ,0);`" @drop="drop" @dragover.prevent="dragover">
      <div class="shape" :style="`left: ${item.point.x}px; top: ${item.point.y}px;`" v-for="(item, idx) in compList" :key="idx">
        {{ item.type }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { useStore } from '~/store';

const SCROLL_BASE_NUM = 10;
const ZOOM_BASE_NUM = 0.2;
const ZOOM_MIN_NUM = 0.5;

const mainRef = ref();
const canvasY = ref(0);
const canvasZoom = ref(1);
let point = {
  x: 0,
  y: 0,
};
const store = useStore();
const compList = computed(() => store.compList);
const { setCompList } = store;

const dragover = (e: any) => {
   point = {
    x: e.layerX,
    y: e.layerY,
  }
}

const drop = (e: any) => {
  const comp = e.dataTransfer.getData('type');
  setCompList({
    type: comp,
    point,
  });
}



const isZoomCompose = ref(false);
onMounted(() => {
  document.body.onkeydown = (e: any) => {
    if (e.keyCode === 91) isZoomCompose.value = true;
  };

  document.body.onkeyup = (e: any) => {
    if (e.keyCode === 91) isZoomCompose.value = false;
  };

  mainRef.value.onmousewheel = (e: any) => {
    // 键盘回复
    if (isZoomCompose.value) {
      if (e.deltaY > 0) {
        canvasZoom.value <= ZOOM_MIN_NUM ?  canvasZoom.value = ZOOM_MIN_NUM: canvasZoom.value -= ZOOM_BASE_NUM;
      }
      else canvasZoom.value += ZOOM_BASE_NUM;
    } else {
      if (e.deltaY > 0) canvasY.value += SCROLL_BASE_NUM;
      else canvasY.value -= SCROLL_BASE_NUM;
    }
  }
});


</script>

<style lang="postcss">
.main {
  overflow: hidden;
  flex: 1;
  height: 100%;
  width: 100%;
  background: radial-gradient(var(--ep-menu-border-color) 1px, transparent 0);
  background-size: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.iphone {
  position: relative;
  width: 375px;
  height: 667px;
  background-color: #f3f3f3;
  box-shadow: 0 16px 48px 16px var(--ep-menu-border-color), 0 1px 3px var(--ep-menu-border-color), 0 1px 6px -1px var(--ep-menu-border-color);
  background-color: #fff;
}

.shape {
  position: absolute;
  border: 1px solid red;
}
</style>