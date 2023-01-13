<template>
  <DragContainer :config="config" @updatePoint="updatePoint">
    {{ config.url }}
  </DragContainer>
</template>

<script>
import { defineComponent } from 'vue';
import DragContainer from './dragContainer.vue'
export default defineComponent({
  props: {
    config: {
      type: Object,
    },
    ind: {
      type: Number,
    }
  },
  components: {
    DragContainer,
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
