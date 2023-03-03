<template>
  <div class="qrCode" id="qrCode">
    <img :src="qrUrl" alt="" />
  </div>
</template>


<script lang="ts" setup>
import QRCode from 'qrcode';
import { onMounted, ref, computed } from 'vue';
import { useStore } from '~/store';
import errorImg from '~/assets/image.png'

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const store = useStore();
const curCompConfig = computed(() => store.compList[props.index]);

const qrUrl = ref();
onMounted(() => {
  QRCode.toDataURL('http://www.baidu.com').then((url: string) => {
    qrUrl.value = url;
  });
});
</script>