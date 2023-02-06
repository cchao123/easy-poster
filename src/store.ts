import { defineStore } from 'pinia';
import { ElementStyle } from '~/types';
import { CHECK_ALL_VALUE, CHECK_MAX_LENGTH } from '~/constants';

export const useStore = defineStore('easyPoster', {
  state: () => ({
    canvasConfig: {
      width: 375,
      height: 667,
      background: '#fff',
    },
    curCompIndex: 0,
    compList: [] as unknown as ElementStyle,
  }),
  actions: {
    setCurCompIndex(curCompIndex: Number) {
      this.curCompIndex = curCompIndex;
    },
    setCompList(compConfig: any) {
      // @TODO push深拷贝
      this.compList.push(JSON.parse(JSON.stringify(compConfig)));
    },
    setCompPoint(index: number, key: string, pixel:  Number) {
      this.compList[index].point[key] = pixel;
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