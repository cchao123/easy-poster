import { CompItem } from '~/types';
export const getTextTpl = (params: CompItem) => {
  const { compId, width, fontSize, point, textValue, fontColor, fontWeight, fontStyle } = params;
  const { x, y } = point;
  return {
    PIXI: `
      const text${compId} = new PIXI.Text('${textValue}', {
        fontSize: ${fontSize},
        fill: '${fontColor}',
        fontWeight: '${fontWeight}',
      });
      text${compId}.x = ${point.x};
      text${compId}.y = ${point.y};`,
    DOM: `
      <div class="text${compId}">${textValue}</div>`,
    CSS: `
      .text${compId} {
        position: absolute;
        width: ${width}px;
        left: ${x}px;
        top: ${y}px;
        color: ${fontColor};
        font-size: ${fontSize}px;
        font-weight: ${fontWeight};
        font-style: ${fontStyle};
      }`,
  }
};
