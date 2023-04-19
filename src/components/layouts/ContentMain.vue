<template>
  <div class="main" ref="mainRef">
    <div class="h5-view" ref="viewRef" :style="{
      width: `${canvasConfig.width / 2}px`,
      height: `${canvasConfig.height / 2}px`,
      backgroundColor: `${canvasConfig.background}`,
      transform: `scale(${canvasZoom}) translate3d(${canvasX}px, ${canvasY}px ,0)`,
    }" @drop="drop" @dragover.prevent="dragover">
      <Edit v-for="(item, idx) in compList" :canvasX="canvasX" :canvasY="canvasY" :key="idx" :index="idx" :item="item">
        <Container :index="idx" v-if="item.type === TemplateType.CONTAINER" />
        <Background :index="idx" v-if="item.type === TemplateType.BACKGROUND" />
        <Image :index="idx" v-if="item.type === TemplateType.IMAGE" />
        <Text :index="idx" v-if="item.type === TemplateType.TEXT" />
        <Header :index="idx" v-if="item.type === TemplateType.HEAD" />
        <QrCode :index="idx" v-if="item.type === TemplateType.QRCODE" />
      </Edit>
    </div>

    <MenuBar class="bar" :curCompConfig="curCompConfig" :isShow="Boolean(curCompConfig)"></MenuBar>
    
    <div class="h5-help" @click.stop="driverStart">
      <span class="iconfont icon-wenhao"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { MATERIAL_LIST, TemplateType, driverFun, setDriveMessage } from '~/constants';
import { useStore } from '~/store';
import { useMouseMove } from '~/hooks';
import Container from '~/components/template/Container.vue';
import Background from '~/components/template/Background.vue';
import Image from '~/components/template/Image.vue';
import Text from '~/components/template/Text.vue';
import Header from '~/components/template/Header.vue';
import QrCode from '~/components/template/QrCode.vue';
import MenuBar from '~/components/layouts/MenuBar.vue';

const store = useStore();
const compList = computed(() => store.compList);
const canvasConfig = computed(() => store.canvasConfig);
const curCompConfig = computed(() => store.curCompConfig);
const { setCompList, setCurCompIndex, initDriver } = store;
const mainRef = ref();

const { x: canvasX, y: canvasY } = useMouseMove(mainRef);
let point = {
  x: 0,
  y: 0,
};
const dragover: (e: DragEvent | any) => void | undefined = (e) => {
  point = {
    x: (e.layerX - canvasX.value) * 2,
    y: (e.layerY - canvasY.value) * 2,
  };
};

const drop: (e: DragEvent | any) => void | undefined = (e) => {
  setCurCompIndex(compList.value.length);
  const materialIndex = e.dataTransfer.getData('index');
  setCompList({
    ...MATERIAL_LIST[materialIndex],
    point,
  });
};

const driverStart = () => {
  setDriveMessage(() => {
    driverFun.start();
  });
};

const isZoomCompose = ref(false);
const SCROLL_BASE_NUM = 10;
const ZOOM_BASE_NUM = 0.2;
const ZOOM_MIN_NUM = 0.5;
const canvasZoom = ref(1);
onMounted(() => {
  initDriver((isShow)=> {
    if (isShow) driverStart();
  });
  document.body.onkeydown = (e: KeyboardEvent) => { if (e.metaKey) isZoomCompose.value = true };
  document.body.onkeyup = (e: KeyboardEvent) => { if (e.metaKey) isZoomCompose.value = false };
  mainRef.value.onmousewheel = (e: WheelEvent) => {
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

<style lang="scss">
.main {
  position: relative;
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

.h5-view {
  position: relative;
  width: 375px;
  height: 667px;
  background-color: #f3f3f3;
  box-shadow: 0 16px 48px 16px var(--ep-menu-border-color), 0 1px 3px var(--ep-menu-border-color),
    0 1px 6px -1px var(--ep-menu-border-color);
  background-color: #fff;
}

.h5-help {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 30px;
  font-weight: 900;
  background-color: var(--ep-fill-color-light);
  color: var(--ep-text-color-regular);
  cursor: help;
}

</style>