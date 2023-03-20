import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import { ElementStyle } from '~/types';
import { generateMixed, setStorage, getStorage } from '~/utils';
import { 
  CHECK_ALL_VALUE,
  CHECK_MAX_LENGTH,
  DEFAULT_TEMP,
  HISTORTLIST_KEY,
  OutputType,
} from '~/constants';

export const useStore = defineStore('easyPoster', {
  state: () => ({
    curCanvasId: generateMixed(5),
    outputCodyType: OutputType.PIXI,
    canvasConfig: {
      width: 750,
      height: 1334,
      background: '#fff',
    },
    curCanvasIndex: -1, // 当前操作画板小标
    curCompIndex: -1, // 当前操作组件的下标
    compList: [] as unknown as ElementStyle,
    historyList: [],
    // ui
    isCodeDialogShow: false,
    isListDialogShow: false,
  }),
  actions: {
    async initHisList () {
      const hisList = await getStorage(HISTORTLIST_KEY);
      if (hisList) this.historyList = JSON.parse(hisList);
      else setStorage(HISTORTLIST_KEY, JSON.stringify(DEFAULT_TEMP));
    },
    setCurCompIndex(curCompIndex: Number) {
      this.curCompIndex = curCompIndex;
    },
    setCompList(compConfig: any) {
      // @TODO push深拷贝
      this.compList.push(JSON.parse(JSON.stringify({
        ...compConfig,
        compId: `_${generateMixed(10).slice(0, 3)}`,
      })));
    },
    delCompList (index: Number) {
      this.compList.splice(index, 1);
      this.curCompIndex = this.compList.length - 1;
    },
    setQrUrl(index: number, url: string) {
      this.compList[index].textValue = url;
    },
    setCompSize(index: number, w: number, h: number){
      this.compList[index].width = w;
      this.compList[index].height = h;
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
      const storeHistoryList = await getStorage(HISTORTLIST_KEY) || '[]';
      const historyList = JSON.parse(storeHistoryList)[index];
      this.compList = historyList.compList;
      this.curCanvasId = historyList.id;
      if (historyList.canvasConfig) this.canvasConfig = historyList.canvasConfig;
      this.curCanvasIndex = index;
      this.curCompIndex = this.compList.length - 1;
    },
    async addHistoryList(curItem: any) {
      if (this.curCanvasIndex === -1) {
        this.historyList.push({
          ...curItem,
        });
        this.curCanvasIndex = this.historyList.length;
      } else {
        this.historyList[this.curCanvasIndex] = {
          ...this.historyList[this.curCanvasIndex],
          ...curItem,
        };
      };
      await setStorage(HISTORTLIST_KEY, JSON.stringify(this.historyList));
      ElMessage.success('已保存入历史');
    },
    async delHistoryList(index: number) {
      this.historyList.splice(index, 1);
      await setStorage(HISTORTLIST_KEY, JSON.stringify(this.historyList));
      ElMessage.success('删除成功');
    },
    async resetHistoryList(index: number) {
      this.historyList.splice(index, 1, DEFAULT_TEMP[index])
      await setStorage(HISTORTLIST_KEY, JSON.stringify(this.historyList));
      ElMessage.success('恢复成功');
      await this.getStorageCurCanvas(index);
    },
    setCodeDialog(isShow: boolean) {
      this.isCodeDialogShow = isShow;
    },
    setListDialog(isShow: boolean) {
      this.isListDialogShow = isShow;
    },
    setOutputCode(outputCodyType: string) {
      this.outputCodyType = outputCodyType; 
    },
  },
  getters: {
    curCompConfig(state) {
      // console.log('当前config', state.compList[state.curCompIndex])
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