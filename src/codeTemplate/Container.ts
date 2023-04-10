import { CompItem } from '~/types';
export const getContainerTpl = (params: CompItem) => {
  const { type, compId, width, height, background, point } = params;
  const { x, y } = point;
  const compName = type + compId;
  return {
    PIXI: `
      const ${compName}: PIXI.Container = new PIXI.Container();
      ${compName}.width = ${width};
      ${compName}.height =  ${height};
      ${compName}.x =  ${x};
      ${compName}.y =  ${y};
      const graphics${compId} = new PIXI.Graphics();
      graphics${compId}.beginFill(${background.replace('#', '0x')});
      graphics${compId}.drawRect(0, 0, ${width}, ${height});
      ${compName}.addChild(graphics${compId});
    `,
    DOM: `
      <div class="${compName}"></div>`,
    CSS: `
      .${compName} {
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${width}px;
        height: ${height}px;
        background-color: ${background};
      }`,
  };
};
