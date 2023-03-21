<template>
  <div class="main"
       @mousedown="handleMouseDown"
       ref="mainRef">
    <div class="h5-view"
         :style="{
        width: `${canvasConfig.width / 2}px`,
        height:`${canvasConfig.height/ 2}px`,
        backgroundColor: `${canvasConfig.background}`,
        transform: `scale(${canvasZoom}) translate3d(${canvasX}px, ${canvasY}px ,0)`,
      }"
         @drop="drop"
         @dragover.prevent="dragover">

      <Edit v-for="(item, idx) in compList"
            :canvasX="canvasX"
            :canvasY="canvasY"
            :key="idx"
            :index="idx"
            :item="item">
        <Container :index="idx"
                   v-if="item.type === TemplateType.CONTAINER" />
        <Background :index="idx"
                    v-if="item.type === TemplateType.BACKGROUND" />
        <Image :index="idx"
               v-if="item.type === TemplateType.IMAGE" />
        <Text :index="idx"
              v-if="item.type === TemplateType.TEXT" />
        <Header :index="idx"
                v-if="item.type === TemplateType.HEAD" />
        <QrCode :index="idx"
                v-if="item.type === TemplateType.QRCODE" />
      </Edit>
    </div>

    <div class="h5-bar"
         v-if="curCompConfig">
      <div :class="`bar-items iconfont icon-${curCompConfig.icon} bar-bt`"></div>
      <el-icon class="bar-items"
               @click="setCompZindex(curCompIndex, true
      )">
        <CaretTop />
      </el-icon>
      <el-icon class="bar-items"
               @click="setCompZindex(curCompIndex, false
      )">
        <CaretBottom />
      </el-icon>
      <el-icon class="bar-items bar-bb"
               @click="handleDelCurComp">
        <Delete />
      </el-icon>
    </div>

    <div class="h5-help"
         @click.stop="driverStart">
      <span class="iconfont icon-wenhao"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { Delete, CaretTop, CaretBottom } from '@element-plus/icons-vue';
import { MATERIAL_LIST, TemplateType } from '~/constants';
import { useStore } from '~/store';
import Container from '~/components/template/Container.vue';
import Background from '~/components/template/Background.vue';
import Image from '~/components/template/Image.vue';
import Text from '~/components/template/Text.vue';
import Header from '~/components/template/Header.vue';
import QrCode from '~/components/template/QrCode.vue';

import { driverFun, setDriveMessage } from '~/constants/driver';
const driverStart = () => {
  setDriveMessage(() => {
    driverFun.start();
  });
};

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
const canvasConfig = computed(() => store.canvasConfig);
const curCompIndex = computed(() => store.curCompIndex);
const curCompConfig = computed(() => store.curCompConfig);
const { setCompList, setCurCompIndex, setCompZindex, delCompList } = store;

const handleCompIndex = () => {};

const handleDelCurComp = () => {
  delCompList(curCompIndex.value)
};

const dragover = (e: DragEvent) => {
  point = {
    x: (e.layerX - canvasX.value) * 2,
    y: (e.layerY - canvasY.value) * 2,
  };
};

const drop = (e: DragEvent) => {
  setCurCompIndex(compList.value.length);
  const materialIndex = e.dataTransfer.getData('index');
  setCompList({
    ...MATERIAL_LIST[materialIndex],
    point,
  });
};

const handleMouseDown = (e: MouseEvent) => {
  // 鼠标位置
  const startX = e.clientX;
  const startY = e.clientY;

  const dcanvasX = Number(canvasX.value);
  const dcanvasY = Number(canvasY.value);

  const move = (moveEvent: MouseEvent) => {
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
  if (false) driverStart();
  document.body.onkeydown = (e: KeyboardEvent) => {
    if (e.keyCode === 91) isZoomCompose.value = true;
  };

  document.body.onkeyup = (e: KeyboardEvent) => {
    if (e.keyCode === 91) isZoomCompose.value = false;
  };

  mainRef.value.onmousewheel = (e: WheelEvent) => {
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

.h5-bar {
  position: absolute;
  right: 30px;
  top: 80px;
  width: 30px;
  border-radius: 5px;
  cursor: pointer;
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

.bar-bt {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.bar-bb {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>