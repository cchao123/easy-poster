import { defineStore } from 'pinia';

export const useStore = defineStore('easyPoster', {
  state: () => ({
    canvasConfig: {
      width: 375,
      height: 667,
      background: '#fff',
    },
    currentCompIndex: 0,
    compList: [],
  }),
  actions: {
    setCurrentCompValue(key: any, value: number | string) {
      this.compList[0][key] = value;
    },
    setCurrentCompIndex(currentCompIndex: Number) {
      this.currentCompIndex = currentCompIndex;
    },
    setCompList(compConfig: any) {
      // @TODO push深拷贝
      this.compList.push(JSON.parse(JSON.stringify(compConfig)));
    },
    setCompPoint(index: number, point: {x: number | any, y: number | any}) {
      this.compList[index].point = point;
    }
  },
  getters: {
    currentCompConfig(state) {
      return state.compList[state.currentCompIndex];
    },
  }
});