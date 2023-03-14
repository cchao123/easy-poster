<template>
  <el-menu mode="horizontal"
           class="el-header">
    <div class="el-header-logo">EasyPoster</div>
    <el-menu-item h="full"
                  @click="toggleDark()"
                  index="theme">
      <button class="border-none w-full bg-transparent cursor-pointer"
              style="height: var(--ep-menu-item-height);">
        <i inline-flex
           i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
    <div class="el-btn-container">
      <el-button color="#626aef"
                 :icon="UploadFilled"
                 size="large">
        上传PSD
      </el-button>
      <el-button size="large"
                 color="#626aef"
                 type="primary"
                 :icon="List"
                 @click="isHistoryShow = true">
        模板记录
      </el-button>
      <el-button size="large"
                 type="primary"
                 color="#626aef"
                 :icon="InfoFilled"
                 @click="savaTpl"
                 :disabled="!compList.length"
                 :loading="isSaveLoading">
        暂存进度
      </el-button>
      <el-button plain
                 color="#626aef"
                 :disabled="!compList.length"
                 size="large"
                 :icon="View"
                 @click="isDrawerShow = true">
        查看代码
      </el-button>

      <el-button v-if="['centralaxis', 'olympic'].includes(curCanvasId)"
                 plain
                 color="#626aef"
                 :icon="RefreshLeft"
                 @click="handleReset"
                 size="large">
        <span>恢复预设</span>
      </el-button>
    </div>

  </el-menu>

  <el-dialog v-model="isHistoryShow"
             :draggable="true"
             top="10vh"
             title="暂存模板列表">
    <el-table class="his-tab"
              :data="historyList.slice((currentPage-1)* 3, currentPage* 3)"
              highlight-current-row>
      <el-table-column property="id"
                       label="id" />
      <el-table-column label="thumbnail">
        <template #default="scope">
          <img class="thumbnail"
               :src="scope.row.thumbnail">
        </template>
      </el-table-column>

      <el-table-column property="date"
                       label="last modified">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <Timer />
            </el-icon>
            <span style="margin-left: 10px">{{ formatFullDateNew(scope.row.date) }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column property="remarks"
                       label="remarks"
                       width="160px">
      </el-table-column>

      <el-table-column fixed="right"
                       label="Operations">
        <template #default="scope">

          <el-popconfirm title="确定删除该项?"
                         @confirm="handleDel(scope)">
            <template #reference>
              <el-button link
                         :disabled="['centralaxis', 'olympic'].includes(scope.row.id)"
                         type="primary"
                         size="small">删除</el-button>
            </template>
          </el-popconfirm>

          <el-popconfirm title="应用替至画板?"
                         icon-color="#c93b33"
                         :icon="InfoFilled"
                         @confirm="handleEdit(scope)">
            <template #reference>
              <el-button link
                         type="primary"
                         size="small">编辑</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="his-pag"
                   small
                   :current-page="currentPage"
                   :page-size="3"
                   background
                   layout="prev, pager, next"
                   :total="historyList.length"
                   @current-change="handleChange" />
  </el-dialog>

  <el-dialog v-model="isDrawerShow"
             class="code-dialog"
             :fullscreen="true">
    <div class="code-container">
      <div class="left-code code-items">
        <div class="code-drawer">
          <code>components/App.vue</code>
        </div>
        <pre>
          <code class="language-js">

  const app = new PIXI.Application({
    width: 375,
    height: 667,
    antialias: true,
    transparent: true,
  });

  // common.js
  import * as PIXI from 'pixi.js';
  const createSprite = (assetsUrl: string, defaultParams: SpritesParams) => {
    const newSprite = PIXI.Sprite.from(assetsUrl);
    Object.keys(defaultParams).forEach((key: string) => (newSprite[key] = defaultParams[key]));
    return newSprite;
  };
            </code>
        </pre>
        <div class="code-drawer">
          <code>components/HelloWorld.vue</code>
        </div>
        <pre>
          <code class="language-js">

  const app = new PIXI.Application({
    width: 375,
    height: 667,
    antialias: true,
    transparent: true,
  });

  // common.js
  import * as PIXI from 'pixi.js';
  const createSprite = (assetsUrl: string, defaultParams: SpritesParams) => {
    const newSprite = PIXI.Sprite.from(assetsUrl);
    Object.keys(defaultParams).forEach((key: string) => (newSprite[key] = defaultParams[key]));
    return newSprite;
  };

            </code>
        </pre>
      </div>
      <div class="right-code code-items">
        <div class="code-drawer">
          <code>common/pixi-poster.ts</code>
        </div>
        <pre>
          <code class="language-js">

  import gsap from 'gsap';
  import * as PIXI from 'pixi.js';

  export const initPoster = (app: PIXI.Application, posterInfo: PosterInfoType, unlockArrList: number[]) => {
    const currentSpotNumber = String(unlockArrList.length);
    const posterTitle = getPosterTitle(unlockArrList.length);
    const posterWrap: PIXI.Container = new PIXI.Container();
    app.stage.addChild(posterWrap);
    const posterBg = createSprite(`${IMAGE_PREFIX}/poster-bg-new.png`, {});
    const headBorder = createSprite(`${IMAGE_PREFIX}/poster-headbg.png`, {
      width: 60,
      height: 60,
    });
    const userWrap: PIXI.Container = new PIXI.Container();
    userWrap.x = 55;
    userWrap.y = 58;
    const userHead = createSprite(posterInfo.headUrl, {
      width: 55,
      height: 55,
      x: 2.5,
      y: 2.5,
    });
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xe20d3f);
    graphics.drawCircle(85, 88, userHead.width / 2);
    graphics.endFill();
    userHead.mask = graphics;
    const userName = new PIXI.Text(posterInfo.name, {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: 24,
      fill: '0x865321',
    });
    userName.x = 65;
    userName.y = 14;

    userWrap.addChild(headBorder, userHead, userName);
    const textWrap: PIXI.Container = new PIXI.Container();
    textWrap.x = 56;
    textWrap.y = 133;
    const text1 = createSprite(`${IMAGE_PREFIX}/poster-text1.png`, {
      y: 0,
    });
    const text2 = createSprite(`${IMAGE_PREFIX}/poster-text2.png`, {
      x: currentSpotNumber.length > 1 ? 175 : 155,
      y: 1,
    });
    const text3 = createSprite(`${IMAGE_PREFIX}/poster-text3.png`, {
      y: 42,
    });
    const text4 = createSprite(posterTitle, {
      x: 142,
      y: 42,
    });
    const number = new PIXI.Text(currentSpotNumber, {
      fontSize: 34,
      fill: '0xe23030',
    });
    number.x = 135;
    number.y = isIos() ? -3 : -10;

    textWrap.addChild(text1, text2, text3, text4, number);

    if (isBeijingNews) {
      userWrap.alpha = 0;
      textWrap.y = 113;
    }
    const numberInfoWrap: PIXI.Container = new PIXI.Container();
    numberInfoWrap.y = 273;

    const spotNumWrap: PIXI.Container = new PIXI.Container();
    spotNumWrap.x = 126;

    const spotNumber = new PIXI.Text(currentSpotNumber, {
      fontFamily: 'SourceHanSansCN-Medium',
      fontSize: 35,
      fill: '0x5d4227',
    });
    const spotNumText = new PIXI.Text('解锁遗产点', {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: 24,
      fill: '0x865321',
    });
    const spotNumTextCenter = spriteCenter(spotNumText, APPCONFIG);
    const spotNumberCenter = spriteCenter(spotNumber, APPCONFIG);
    spotNumber.x = spotNumTextCenter.centerX;
    spotNumText.y = 42;
    spotNumber.pivot.x = spotNumberCenter.centerX;
    spotNumWrap.addChild(spotNumText, spotNumber);
    const kmNumWrap: PIXI.Container = new PIXI.Container();
    kmNumWrap.x = 438;
    const posterKmNumber = posterInfo.km;
    const kmNumber = new PIXI.Text(posterKmNumber, {
      fontFamily: 'SourceHanSansCN-Medium',
      fontSize: 35,
      fill: '0x5d4227',
    });
    const kmNumText = new PIXI.Text('里程(公里)', {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: 24,
      fill: '0x865321',
    });

    const kmNumTextCenter = spriteCenter(kmNumText, APPCONFIG);
    const kmNumberCenter = spriteCenter(kmNumber, APPCONFIG);
    kmNumber.x = kmNumTextCenter.centerX;
    kmNumText.y = 42;
    kmNumber.pivot.x = kmNumberCenter.centerX;

    kmNumWrap.addChild(kmNumText, kmNumber);
    numberInfoWrap.addChild(spotNumWrap, kmNumWrap);
    const logo = createSprite(`${IMAGE_PREFIX}/poster-logo-new.png`, {
      x: 53,
      y: 1148,
    });
    const des = createSprite(`${IMAGE_PREFIX}/poster-des.png`, {
      x: 303,
      y: 1150,
    });
    const qrwrap = createSprite(`${IMAGE_PREFIX}/poster-qrwrap.png`, {
      x: 522,
      y: 1150,
    });
    // 获取成就图片
    const achievementWrap = getAchievementImg(unlockArrList);
    achievementWrap.x = 36;
    achievementWrap.y = 372;
    // 兜底二维码
    const defaultQr = createSprite(
      `${IMAGE_PREFIX}${isBeijingNews ? '/beijingnews-qrcode.png' : '/qrcode-default.png'}`,
      {
        width: 100,
        height: 100,
        x: 528.5,
        y: 1157.5,
      },
    );
    posterWrap.addChild(posterBg, userWrap, textWrap, numberInfoWrap, logo, des, achievementWrap, qrwrap, defaultQr);
};
            </code>
        </pre>
      </div>

    </div>
  </el-dialog>

  <!-- 代码抽屉 -->
  <!-- <el-drawer custom-class="" v-model="isDrawerShow" size="850px"
             direction="rtl">
    <template #default>
      <div class="code-drawer">
        <code>components/HelloWorld.vue</code> to test components.
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary"
                   @click="confirmClick">导出文件</el-button>
      </div>
    </template>
  </el-drawer> -->
</template>

<script lang="ts" setup>
import { ref, computed, nextTick, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { toggleDark } from '~/composables';
import { convertDOMToImage, formatFullDateNew, generateMixed } from '~/utils';
import { UploadFilled, List, SortDown, InfoFilled, Timer, RefreshLeft, View } from '@element-plus/icons-vue';
import { useStore } from '~/store';

const store = useStore();
const { initHisList, addHistoryList, delHistoryList, clearCompList, getStorageCurCanvas, resetHistoryList } = store;
const historyList = computed(() => store.historyList);
const curCanvasId = computed(() => store.curCanvasId);
const compList = computed(() => store.compList);

const isSaveLoading = ref(false);
const currentPage = ref(1);
const isDrawerShow = ref(true);
onMounted(() => {
  initHisList();
});

const handleChange = (curPage: number) => {
  currentPage.value = curPage;
};

const savaTpl = () => {
  console.log(JSON.stringify(compList.value));
  // 是保存还是追加？
  if (compList.value.length <= 0) {
    ElMessage.error('画板为空');
    return;
  }
  if (historyList.value.length >= 15) {
    ElMessage.warning('不能保存更多，请在【模板记录】中删除');
    return;
  }
  isSaveLoading.value = true;
  const DOM: HTMLElement | null = document.querySelector('.h5-view');
  if (DOM) {
    convertDOMToImage({
      DOM,
      quality: 0.1,
      callback: (base64: string) => {
        isSaveLoading.value = false;
        addHistoryList({
          id: curCanvasId.value,
          remarks: `示例${curCanvasId.value}`,
          date: new Date().getTime(),
          thumbnail: base64,
          compList,
        });
      },
    });
  }
};
const isHistoryShow = ref(false);

const getCvsInTabIndex = (index: any) => {
  return index + (currentPage.value - 1) * 3;
};
const handleDel = (scope: any) => {
  delHistoryList(getCvsInTabIndex(scope.$index));
};

const handleEdit = (scope: any) => {
  clearCompList();
  nextTick(() => {
    isHistoryShow.value = false;
    getStorageCurCanvas(getCvsInTabIndex(scope.$index));
  });
};

const curCanvasIndex = computed(() => store.curCanvasIndex);
const handleReset = () => {
  resetHistoryList(curCanvasIndex.value);
};
</script>

<style lang="postcss">
.el-header {
  display: flex;
  justify-content: space-between;
  height: 60px;
}

.el-header-logo {
  margin-left: 20px;
  line-height: 60px;
  font-size: 14px;
  font-weight: bolder;
}

.el-btn-container {
  position: absolute;
  left: 280px;
  top: 8px;
}

/* 23 */
.el-button--text {
  margin-right: 15px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
.thumbnail {
  width: 80px;
  /* height: 120px; */
}

.his-tab {
  height: 550px;
}
.his-pag {
  margin-top: 20px;
}

/* drawer */
.code-drawer {
  text-align: left;
  margin-bottom: 10px;
}
.ep-drawer__header {
  /* height: 60px; */
  margin-bottom: 15px;
}

.ep-drawer__body {
  padding: 0;
}
.ep-overlay-dialog {
  overflow: hidden !important;
}

/* code */
.code-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.language-js {
  /* height: 90vh; */
}

.code-items {
  width: 49.5%;
}

.left-code {
}

.code-dialog {
  background-color: rgba(0, 0, 0, 0.1);
}

.code-toolbar {
  background-color: #2d2d2d;
}

::-webkit-scrollbar {
  height: 10px;
  width: 100%;
}

::-webkit-scrollbar-thumb {
  background-color: #7d7d7d;
  border-radius: 20px;
}

::-webkit-scrollbar-track {
  border-radius: 20px;
  background-color: #939393;
}
</style>



