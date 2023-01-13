<template>
  <DragContainer :config="config" @updatePoint="updatePoint">
    <img :src="config.url" alt="">
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

</style>