

export const getStageCode = (canvasConfig: any) => {
  const { width, height } = canvasConfig;
  return `
      // App.vue
      const app = new PIXI.Application({
        width: ${width},
        height: ${height},
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
