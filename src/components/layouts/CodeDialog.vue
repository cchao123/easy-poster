<template>
  <el-dialog v-model="isCodeDialogShow" @close="setCodeDialog(false)"

  @open="openOver"
             :show-close="true"
             class="code-dialog"
             :fullscreen="true">
    <div class="code-container">
      <div class="left-code code-items">
        <div class="code-drawer">
          <code>components/pixiContainer.vue</code>
        </div>
        <pre>
          <code class="language-js">
  &lt;script&gt;
  import PIXI from '@tnews-h5/utils/animation/pixi';

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
  &lt;script&gt;

            </code>
        </pre>
        <!-- <div class="code-drawer">
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
        </pre> -->
      </div>
      <div class="right-code code-items">
        <div class="code-drawer">
          <code>common/pixi-poster.ts</code>
        </div>
        <pre>
          <code class="language-js">

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
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '~/store';
const store = useStore();
const { setCodeDialog } = store;
const isCodeDialogShow = computed(() => store.isCodeDialogShow);
const openOver = ()=>{
  window.Prism.highlightAll();
}
</script>


<style lang="postcss">
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

.my-header {
  display: flex;
  background-color: #fff;
}

.ep-drawer__header {
  /* height: 60px; */
  margin-bottom: 15px;
}

.code-drawer {
  text-align: left;
  margin-bottom: 10px;
}
</style>