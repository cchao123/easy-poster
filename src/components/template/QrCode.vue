<template>
  <div class="qrCode" :style="{
    width: `${curCompConfig.width / 2}px`,
    height: `${curCompConfig.width / 2}px`,
  }">
    <img :src="qrUrl" />
  </div>
</template>


<script lang="ts" setup>
import QRCode from 'qrcode';
import { watch, onMounted, ref, computed } from 'vue';
import { useStore } from '~/store';

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const store = useStore();
const curCompConfig = computed(() => store.compList[props.index]);
const { setQrUrl } = store;
const qrUrl = ref();

const setQrCode = () => {
  QRCode.toDataURL(curCompConfig.value.url).then((url: string) => {
    qrUrl.value = url;
    setQrUrl(props.index, url);
  });
};

onMounted(setQrCode);

watch(
  () => curCompConfig.value && curCompConfig.value.url,
  (newConfig) => {
    if (newConfig) {
      setQrCode();
    }
  },
);
</script>


<style lang="scss">
.qrCode img {
  width: 100%;
}
</style>