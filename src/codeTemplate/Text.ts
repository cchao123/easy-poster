const html2Canvas = (params: any) => {
  const { compId, fontSize, point, textValue, fontColor, fontWeight, fontStyle } =params;
  const { x, y } = point;
  return {
    DOM: `<div class="text${compId}">${textValue}</div>`,
    CSS: `
      .text${compId} {
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        color: ${fontColor};
        font-size: ${fontSize}px;
        font-weight: ${fontWeight};
        font-style: ${fontStyle};
      }
    `,
  }
};

const pixiJs = (params: any) => {
  const { compId, fontSize, point, textValue, fontColor, fontWeight } =params;
  return `
      const text${compId} = new PIXI.Text('${textValue}', {
        fontSize: ${fontSize},
        fill: '${fontColor}',
        fontWeight: '${fontWeight}',
      });
      text${compId}.x = ${point.x};
      text${compId}.y = ${point.y};
      `
};

export const getTextTpl = (params: any) => {
  return {
    html2Canvas: html2Canvas(params),
    pixiJs: pixiJs(params),
  }
}




