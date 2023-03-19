const html2Canvas = (params: any) => {
  const { type, compId, point, width, height, background } = params;
  const { x, y } = point;
  const compName = type + compId;
  return {
    DOM: `<div class="${compName}"></div>`,
    CSS: `
      .${compName} {
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${width}px;
        height: ${height}px;
        background-color: ${background};
      }
    `,
  }
};

const pixiJs = (params: any) => {
  const { type, compId, width, height, point } = params;
  const compName = type + compId;
  return `
      const ${compName}: PIXI.Container = new PIXI.Container();
      ${compName}.witdh = ${width};
      ${compName}.height =  ${height};
      ${compName}.x =  ${point.x};
      ${compName}.y =  ${point.y};`
};

export const getContainerTpl = (params: any) => {
  return {
    html2Canvas: html2Canvas(params),
    pixiJs: pixiJs(params),
  }
}

