// import { createApp, onMounted, onUnmounted, ref } from 'vue';
// import type { Ref } from 'vue';
//   export function useContextMenu(container: Ref) {
//   const x = ref(0);
//   const y = ref(0);
//   const isMenuShow = ref(true);

//   const closeMenu = ()=> {
//     isMenuShow.value = false;
//   };

//   const handleContextMenu = (e: MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const { clientX, clientY } = e;
//     x.value = clientX;
//     y.value = clientY;
//     // const div = document.createElement('div');
//     // document.body.appendChild(div);
//     // const app = createApp(Comp, {
//     //   isMenuShow: false,
//     //   styles: {
//     //     position: 'fixed',
//     //     top: `${clientY}px`,
//     //     left: `${clientX}px`,
//     //   }
//     // });
//     // app.mount(div);
//   }


//   onMounted(()=> {
//     container.value.addEventListener('contextmenu', handleContextMenu);
//     window.addEventListener('click', closeMenu);
//     window.addEventListener('contextmenu', closeMenu);
//   })

//   onUnmounted(()=>{
//     container.value.removeEventListener('contextmenu', handleContextMenu);
//   })
//   return {
//     x, y
//   }
// };