import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import { CompItem, CanvasConfig, HistoryItem } from '~/types';
import { generateMixed, setStorage, getStorage } from '~/utils';
import { 
  CHECK_ALL_VALUE,
  CHECK_MAX_LENGTH,
  DEFAULT_TEMP,
  FIRST_VISIT,
  HISTORTLIST_KEY,
  OutputType,
} from '~/constants';

export const useStore = defineStore('easyPoster', {
  state: () => ({
    curCompConfig: {} as CompItem,
    curCanvasId: generateMixed(5),
    outputCodyType: OutputType.PIXI,
    canvasConfig: {
      width: 750,
      height: 1334,
      background: '#fff',
    } as CanvasConfig,
    curCanvasIndex: -1, // 当前操作画板小标
    curCompIndex: -1, // 当前操作组件的下标
    compList: [] as CompItem[],
    historyList:  [] as HistoryItem[],
    // UI STATUS
    isCodeDialogShow: false,
    isListDialogShow: false,
    delStatus: false,
  }),
  actions: {
    async initDriver (cb: (isShow: Boolean)=> void) {
      const KEY = await getStorage(FIRST_VISIT);
      if (KEY === null){
        setStorage(FIRST_VISIT, '1');
        cb(true);
      }
      else cb(false);
    },
    async initHisList () {
      const hisList = await getStorage(HISTORTLIST_KEY);
      if (hisList) this.historyList = JSON.parse(hisList);
      else setStorage(HISTORTLIST_KEY, JSON.stringify(DEFAULT_TEMP));
    },
    setCurCompIndex(curCompIndex: number) {
      this.curCompIndex = curCompIndex;
    },
    setCompList(compConfig: CompItem) {
      this.compList.push(JSON.parse(JSON.stringify({
        ...compConfig,
        compId: `_${generateMixed(10).slice(0, 3)}`,
      })));
      this.delStatus = false;
    },
    delCompList (index: number) {
      this.delStatus = true;
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
    setCompPoint(index: number, key: string, pixel:  number) {
      this.compList[index].point[key] = pixel;
    },
    setCompZindex(index: number, isAdd: boolean) {
      if (isAdd)this.compList[index].zIndex++;
      else this.compList[index].zIndex--;
    },
    setCheckAllStatus(status: boolean) {
      status ? this.curCompConfig.dragDirFixed = CHECK_ALL_VALUE: this.curCompConfig.dragDirFixed = [];
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
    async addHistoryList(curItem: HistoryItem) {
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
      ElMessage.success('恢复成功并保存入历史');
      await this.getStorageCurCanvas(index);
    },
    setCodeDialog(isShow: boolean) {
      this.isCodeDialogShow = isShow;
    },
    setListDialog(isShow: boolean) {
      this.isListDialogShow = isShow;
    },
    setOutputCode(outputCodyType: OutputType) {
      this.outputCodyType = outputCodyType; 
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
      console.log(status.curCompConfig)
      return status.curCompConfig.dragDirFixed;
    },
    pixiLastCode () {
      let compNameStr = '';
      const sortList = [...this.compList];
      sortList.sort((a, b) => a.zIndex - b.zIndex);
      sortList.map((item: CompItem, index: number)=>{
        compNameStr += `${item.type}${item.compId}${sortList.length === index + 1 ? '' : ', '}`;
        return compNameStr;
      });
      return `app.stage.addChild(${compNameStr});`
    },
  }
});