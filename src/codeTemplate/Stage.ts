// const createSprite = (assetsUrl: string, defaultParams: SpritesParams) => {
//   const newSprite = PIXI.Sprite.from(assetsUrl);
//   Object.keys(defaultParams).forEach((key: string) => (newSprite[key] = defaultParams[key]));
//   return newSprite;
// };

export const getStageCode = (canvasConfig: any) => {
  return `
      // App.vue
      const app = new PIXI.Application({
        width: ${canvasConfig.width},
        height: ${canvasConfig.height},
        antialias: true,
        transparent: true,
      });

      // common.js
      import * as PIXI from 'pixi.js';
      const createSprite = (assetsUrl: string, defaultParams: SpritesParams) => {
        const newSprite = PIXI.Sprite.from(assetsUrl);
        Object.keys(defaultParams).forEach((key: string) => (newSprite[key] = defaultParams[key]));
        return newSprite;
      };`
}
