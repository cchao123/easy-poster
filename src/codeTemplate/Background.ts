const html2Canvas = (params: any) => {
  const { type, compId, point, width, height, url } = params;
  const { x, y } = point;
  const compName = type + compId;
  return {
    DOM: `<img class="${compName}" src="${url}">`,
    CSS: `
      .${compName} {
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${width}px;
        height: ${height}px;
      };
    `,
  };
};

const pixiJs = (params: any) => {
  const { compId, url, width, height, point } =params;
  return `
      const posterBg${compId} = createSprite('${url}', {
        width: ${width},
        height: ${height},
        x: ${point.x},
        y: ${point.y},
      });`
};

export const getBackgroundTpl = (params: any) => {
  return {
    html2Canvas: html2Canvas(params),
    pixiJs: pixiJs(params),
  }
}
