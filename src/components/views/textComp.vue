<template>
  <DragContainer :config="config" @updatePoint="updatePoint">
    {{ config.url }}
  </DragContainer>
</template>

<script>
import { defineComponent } from 'vue';
import DragContainer from './dragContainer.vue';
export default defineComponent({
  components: {
    DragContainer,
  },
  props: {
    config: {
      type: Object,
    },
    ind: {
      type: Number,
    }
  },
    setup(props, {emit }) {
    const updatePoint =(point)=> {
      emit('updatePoint', point, props.ind);
    }
    return {
      updatePoint
    }
  }
})
</script>

<style>
.drag {
  position: absolute;
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