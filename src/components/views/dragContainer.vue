<template>
  <div class="drag" @mousedown.prevent="mousedown" @mousemove="mousemove"  @mouseup="mouseup" :class="config.type" :style="{ left:config.point.x + 'px' ,top:config.point.y+ 'px' }">
    <slot />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props: {
    config: {
      type: Object,
    }
  },
  setup(props, {emit}) {
    const isMove = ref(false);
    const start = ref({x: 0, y: 0});
    const mousedown = (e)=>{
      isMove.value = true;
      // console.log('起始位置'+e.offsetX, e.offsetY)
      start.value = {
        x: e.offsetX, 
        y: e.offsetY,
      }
    }
    const mousemove = (e)=>{
      if (isMove.value) {
        const moveX = e.offsetX;
        const moveY = e.offsetY;
        emit('updatePoint', {moveX, moveY})
      }
    }
    const mouseup = (e)=>{
      console.log('over')
      isMove.value = false;
      start.value = {x: 0, y: 0};
    }
    return {
      mousedown,
      mousemove,
      mouseup,
    }
  }
})
</script>

<style>
.drag {
  cursor: move;
  position: absolute;
}

.btn {
  width: 100px;
  height: 32px;
  font-size: 14px;
  font-weight: bold;
  line-height: 32px;
  text-align: center;
  color: #fff;
  border-radius: 32px;
  background-image: linear-gradient(to right, #ff85ce, #8f4bff);
  border: 1px solid #ff69e5;
  border-image: linear-gradient(#c87cff, #ff69e5) rounded;
}
.text {
  width: 240px;
  height: 36px;
  background: #f5f5f5;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: none;
  font-size: 16px;
  color: #1f1f1f;
  line-height: 36px;
}
</style>