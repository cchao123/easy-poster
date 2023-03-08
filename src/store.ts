import { defineStore } from 'pinia';
import { ElementStyle } from '~/types';
import { CHECK_ALL_VALUE, CHECK_MAX_LENGTH, DEFAULT_TEMP } from '~/constants';
import { generateMixed, setStorage, getStorage } from '~/utils';
setStorage('__HISTORTLIST', JSON.stringify(DEFAULT_TEMP));
export const useStore = defineStore('easyPoster', {
  state: () => ({
    curCanvasId: generateMixed(5),
    output: 'pixiJs' as 'pixiJs' | 'html2Canvas',
    canvasConfig: {
      width: 375,
      height: 667,
      background: '#fff',
    },
    curCanvasIndex: null, // 当前操作画板小标
    curCompIndex: -1, // 当前操作组件的下标
    compList: [] as unknown as ElementStyle,
    historyList: DEFAULT_TEMP,
  }),
  actions: {
    setCurCompIndex(curCompIndex: Number) {
      this.curCompIndex = curCompIndex;
    },
    setCompList(compConfig: any) {
      // @TODO push深拷贝
      this.compList.push(JSON.parse(JSON.stringify({
        ...compConfig,
        compId: this.curCompIndex,
      })));
    },
    delCompList (index: Number) {
      this.compList.splice(index, 1);
      // 手动赋值
      this.curCompIndex = this.compList.length - 1;
    },
    setCompSize(index: number, w: number, h: number){
      this.compList[index].width = w;
      this.compList[index].height = h;
      console.log(this.compList)
    },
    setCompPoint(index: number, key: string, pixel:  Number) {
      this.compList[index].point[key] = pixel;
    },
    setCompZindex(index: number, isAdd: boolean) {
      if (isAdd)this.compList[index].zIndex++;
      else this.compList[index].zIndex--;
    },
    setCheckAllStatus(status: boolean) {
      status ? this.curCompConfig.dragDirFixed = CHECK_ALL_VALUE: this.curCompConfig.dragDirFixed = []
    },
    setDOMparams(index: number, obj: any) {
      this.compList[index] = {
        ...this.compList[index],
        ...obj,
      }
    },
    clearCompList() {
      this.compList = [];
    },
    async getStorageCurCanvas(index: number) {
      const historyList = await getStorage('__HISTORTLIST');
      this.compList = JSON.parse(historyList)[index].compList;
      this.curCanvasId = JSON.parse(historyList)[index].id;
      this.curCanvasIndex = index;
      this.curCompIndex = 0;
      // console.log(1)
      // console.log(2)
      // console.log(2.4, this.historyList, index)
      // console.log(2.5, this.historyList[1])
      // console.log(2.6, this.historyList[index])
      // this.compList = this.historyList[index].compList;
      // console.log(3, this.compList)
      
      // // 重置重置画板信息
      // this.curCanvasIndex = index;
      // this.curCanvasId = this.historyList[index].id;

      // this.curCompIndex = 0;
      // console.log('his-ind',index)
      // console.log('his', this.historyList[index])
      // console.log('his', this.historyList[index].compList)
    },
    setHistoryList() {
    },
    addHistoryList(curItem: any) {
      if (this.curCanvasIndex !== null) {
        this.historyList[this.curCanvasIndex] = {
          ...this.historyList[this.curCanvasIndex],
          ...curItem,
        };
      } else this.historyList.push(curItem);
    },
    delHistoryList(index: number) {
      this.historyList.splice(index, 1);
    },
  },
  getters: {
    curCompConfig(state) {
      return state.compList[state.curCompIndex];
    },
    isIndeterminate (state) {
      return state.curCompConfig.dragDirFixed.length > 0 && state.curCompConfig.dragDirFixed.length < CHECK_MAX_LENGTH;
    },
    isCheckAll (state) {
      return state.curCompConfig.dragDirFixed.length === CHECK_MAX_LENGTH;
    },
    curFixedStatus(status) {
      return status.curCompConfig.dragDirFixed;
    },
  }
});