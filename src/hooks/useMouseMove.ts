import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue';
export function useMouseMove(eleRef: Ref) {
  const startX = ref(0);
  const startY = ref(0);
  const moveX = ref(0);
  const moveY = ref(0);
  const currentX = ref(0);
  const currentY = ref(0);

  const up = () => {
    eleRef.value.removeEventListener('mousemove', move);
  }

  const move  = (e: MouseEvent) => {
    const currX = e.clientX;
    const currY = e.clientY;
    moveX.value = currentX.value + (currX - startX.value);
    moveY.value = currentY.value + (currY - startY.value);
  }

  const down = (e: MouseEvent) => {
    startX.value = e.pageX;
    startY.value = e.pageY;
    currentX.value = Number(moveX.value);
    currentY.value = Number(moveY.value);
    eleRef.value.addEventListener('mousemove', move)
  }

  onMounted(() => {
    eleRef.value.addEventListener("mousedown", down);
    document.addEventListener('mouseup', up);
  });

  onUnmounted(up);
  
  return { x: moveX, y: moveY };
}