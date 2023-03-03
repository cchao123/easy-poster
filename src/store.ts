import { defineStore } from 'pinia';
import { ElementStyle } from '~/types';
import { CHECK_ALL_VALUE, CHECK_MAX_LENGTH } from '~/constants';
import { olympic } from '~/base.ts'
export const useStore = defineStore('easyPoster', {
  state: () => ({
    curCanvasId: 'leqr95pz',
    output: 'pixiJs' as 'pixiJs' | 'html2Canvas',
    canvasConfig: {
      width: 375,
      height: 667,
      background: '#fff',
    },
    curCompIndex: 0, // 重置清楚
    compList: [] as unknown as ElementStyle,
    // historyListNew: {
    //   'centralAxis': {
    //     date: 1677742012611,
    //     remarks: '示例海报1',
    //     thumbnail: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-bg-new.png',
    //     compList: [],
    //   },
    //   'olympic': {
    //     date: 1677742012611,
    //     remarks: '示例海报2',
    //     thumbnail: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-bg-new.png',
    //     compList: [],
    //   },
    // },
    historyList: [{
      id: 'leqr95pz',
      date: 1677742012611,
      remarks: '示例海报1',
      thumbnail: 'https://mat1.gtimg.com/qqcdn/tnewsh5/short-term/centralAxis/poster-bg-new.png',
      compList: [],
    },
    {
      id: 'olympic',
      date: 1677742012611,
      remarks: '示例海报2',
      thumbnail: olympic,
    }]
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
    setHistoryList() {

    },
    addHistoryList(hItems: any, hashId: String) {
      if (this.curCanvasId === '') {
        this.curCanvasId = hashId;
      };
      this.historyList.push(hItems)
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
    // curCanvasIndex(status){
    //   return this.historyList.filter((item: any, index: number) => {
    //     if (item.id === this.curCanvasId) {
    //       return index;
    //     }
    //   });
    // }
  }
});