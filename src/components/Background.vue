<template>
  <div><img class="bgg" src="https://mat1.gtimg.com/qqcdn/tnewsh5/2022surname/lottie/img_46.png" alt=""></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '~/store';

const store = useStore();
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const currentCompConfig = computed(() => store.compList[props.index]);
</script>
<style lang="postcss">
.bgg {
  width: 375px;
  height: 667px;
}
</style>