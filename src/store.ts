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
    setCurCompValue(key: any, value: number | string) {
      this.compList[0][key] = value;
    },
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
      status? this.curCompConfig.drag.directionFixed = CHECK_ALL_VALUE: this.curCompConfig.drag.directionFixed = []
    },
  },
  getters: {
    curCompConfig(state) {
      return state.compList[state.curCompIndex];
    },
    isIndeterminate (state) {
      return this.curCompConfig.drag.directionFixed.length > 0 && this.curCompConfig.drag.directionFixed.length < CHECK_MAX_LENGTH;
    },
    isCheckAll (state) {
      return this.curCompConfig.drag.directionFixed.length === CHECK_MAX_LENGTH;
    },
    curFixedStatus(status) {
      return this.curCompConfig.drag.directionFixed;
    },
  }
});