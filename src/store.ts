import { defineStore } from 'pinia';

export const useStore = defineStore('easyPoster', {
  state: () => ({
    currentCompIndex: 0,
    compList: [],
  }),
  actions: {
    setCurrentCompIndex(currentCompIndex: Number) {
      this.currentCompIndex = currentCompIndex;
    },
    setCompList(compConfig: any) {
      this.compList.push(compConfig);
      console.log(this.compList)
    },
    setCompPoint(index: number, point: {x: number | any, y: number | any}) {
      this.compList[index].point = point;
    }
  },
  getters: {}
});