import { onMounted, ref } from 'vue';

export default function(contentRef: any) {
  const x = ref();
  const y = ref();
  const isShow = ref(false);

  onMounted(()=> {
    const div = contentRef.value;
    div.addEventListener('contextmenu')
  })
  return {
    isShow,
    x,
    y,
  }
};