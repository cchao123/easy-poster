<template>
  <div class="main"
       @mousedown="handleMouseDown"
       ref="mainRef">
    <div class="iphone"
         :style="`transform: scale(${canvasZoom}) translate3d(${canvasX}px, ${canvasY}px ,0);`"
         @drop="drop"
         @dragover.prevent="dragover">
      <Edit v-for="(item, idx) in compList"
            :canvasX="canvasX"
            :canvasY="canvasY"
            :key="idx"
            :index="idx"
            :item="item">
        <Container v-if="item.type === 'container'" />
        <Background v-if="item.type === 'bg'" />
        <Image v-if="item.type === 'img'" />
        <Text v-if="item.type === 'text'" />
        <Header v-if="item.type === 'head'" />
        <QrCode v-if="item.type === 'qrcode'" />
      </Edit>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { MATERIAL_LIST } from '~/constants';
import { useStore } from '~/store';
import Container from '~/components/Container.vue';
import Background from '~/components/Background.vue';
import Image from '~/components/Image.vue';
import Text from '~/components/Text.vue';
import Header from '~/components/Header.vue';
import QrCode from '~/components/QrCode.vue';

const SCROLL_BASE_NUM = 10;
const ZOOM_BASE_NUM = 0.2;
const ZOOM_MIN_NUM = 0.5;

const mainRef = ref();

// 画布位置
const canvasX = ref(0);
const canvasY = ref(0);

const canvasZoom = ref(1);
let point = {
  x: 0,
  y: 0,
};
const store = useStore();
const compList = computed(() => store.compList);
const currentCompIndex = computed(() => store.currentCompIndex);
const { setCompList, setCurrentCompIndex } = store;

const dragover = (e: any) => {
  point = {
    x: e.layerX - canvasX.value,
    y: e.layerY - canvasY.value,
  };
};

const drop = (e: any) => {
  setCurrentCompIndex(compList.value.length);
  const materialIndex = e.dataTransfer.getData('index');
  setCompList({
    ...MATERIAL_LIST[materialIndex],
    point,
  });
};

const handleMouseDown = (e: any) => {
  // 鼠标位置
  const startX = e.clientX;
  const startY = e.clientY;

  const dcanvasX = Number(canvasX.value);
  const dcanvasY = Number(canvasY.value);

  const move = (moveEvent: any) => {
    // 当前位置
    const currX = moveEvent.clientX;
    const currY = moveEvent.clientY;

    canvasX.value = dcanvasX + (currX - startX);
    canvasY.value = dcanvasY + (currY - startY);
  };

  const up = () => {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
  };

  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up);
};

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
        canvasZoom.value <= ZOOM_MIN_NUM ? (canvasZoom.value = ZOOM_MIN_NUM) : (canvasZoom.value -= ZOOM_BASE_NUM);
      } else canvasZoom.value += ZOOM_BASE_NUM;
    } else {
      if (e.deltaY > 0) canvasY.value += SCROLL_BASE_NUM;
      else canvasY.value -= SCROLL_BASE_NUM;
    }
  };
});
</script>

<style lang="postcss">
.main {
  cursor: grab;
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
  box-shadow: 0 16px 48px 16px var(--ep-menu-border-color), 0 1px 3px var(--ep-menu-border-color),
    0 1px 6px -1px var(--ep-menu-border-color);
  background-color: #fff;
}
</style>