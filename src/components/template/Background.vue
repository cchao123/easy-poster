<template>
  <div>
    <img class="bgg"
         :src="curCompConfig.url">
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useStore } from '~/store';
import { getBackgroundTpl } from '~/codeTemplate';

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