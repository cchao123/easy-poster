export const getStageCode = (canvasConfig: any) => {
  const { width, height, background } = canvasConfig;
  return {
    PIXI: `
      const app = new PIXI.Application({
        width: ${width},
        height: ${height},
        antialias: true,
        transparent: true,
      });`,
    DOM: `
      <div class="posterDom"></div>`,
    CSS: `
      .posterDom {
        position: relative;
        width: ${width}px;
        height: ${height}px;
        background-color: ${background};
      }`,
  };
};
