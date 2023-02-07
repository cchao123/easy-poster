<template>
  <div><img class="bgg" :src="curCompConfig.url" alt=""></div>
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

const curCompConfig = computed(() => store.compList[props.index]);
</script>
<style lang="postcss">
.bgg {
  width: 375px;
  height: 667px;
}
</style>