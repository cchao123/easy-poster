<template>
  <div class="qrCode" id="qrCode">
    <img :src="qrUrl" alt="" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import QRCode from 'qrcode';

const qrUrl = ref();
onMounted(() => {
  QRCode.toDataURL(window.location.href).then((url: string) => {
    qrUrl.value = url;
  });
});

</script>