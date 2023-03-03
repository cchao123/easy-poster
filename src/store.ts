import { defineStore } from 'pinia';
import { ElementStyle } from '~/types';
import { CHECK_ALL_VALUE, CHECK_MAX_LENGTH, DEFAULT_TEMP } from '~/constants';
import { generateMixed } from '~/utils';
export const useStore = defineStore('easyPoster', {
  state: () => ({
    curCanvasId: generateMixed(5),
    output: 'pixiJs' as 'pixiJs' | 'html2Canvas',
    canvasConfig: {
      width: 375,
      height: 667,
      background: '#fff',
    },
    curCanvasIndex: null,
    curCompIndex: 0, // 重置清楚
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
    setCurCanvas(index: number) {
      this.curCanvasIndex = index;
      this.curCanvasId = this.historyList[index].id;
      this.compList = this.historyList[index].compList;
      this.curCompIndex = 0;
    },
    setHistoryList() {
    },
    addHistoryList(curItem: any) {
      if (this.curCanvasIndex !== null) {
        this.historyList[this.curCanvasIndex] = curItem;
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
      return this.curCompConfig.dragDirFixed.length > 0 && this.curCompConfig.dragDirFixed.length < CHECK_MAX_LENGTH;
    },
    isCheckAll (state) {
      return this.curCompConfig.dragDirFixed.length === CHECK_MAX_LENGTH;
    },
    curFixedStatus(status) {
      return this.curCompConfig.dragDirFixed;
    },
  }
});