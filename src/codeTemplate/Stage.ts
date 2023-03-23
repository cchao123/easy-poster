export const getStageCode = (canvasConfig: any) => {
  const { width, height, background } = canvasConfig;
  return {
    PIXI: `
      const app = new PIXI.Application({
        width: ${width},
        height: ${height},
        antialias: true,
        transparent: true,
        backgroundColor: ${background.replace('#', '0x')},
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
