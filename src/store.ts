import { defineStore } from 'pinia';

export const useStore = defineStore('easyPoster', {
  state: () => ({
    compList: [],
  }),
  actions: {
    setCompList(compConfig: any) {
      this.compList.push(compConfig)
    },
  },
  getters: {}
});