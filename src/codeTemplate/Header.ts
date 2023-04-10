// TIPS: Only the contents within a circle at the center should be rendered onto the screen.
import { CompItem } from '~/types';
export const getHeadTpl = (params: CompItem) => {
  const { type, compId, point, width, height, url } = params;
  const { x, y } = point;
  const compName = type + compId;
  const radio = width / 2;
  return {
    PIXI: `
      const ${compName}: PIXI.Container = new PIXI.Container();
      ${compName}.x = ${x};
      ${compName}.y = ${y};
      const userHead${compId} = createSprite('${url}', {
        width: ${width},
        height: ${width},
      });
      const graphics${compId} = new PIXI.Graphics();
      graphics${compId}.beginFill(0xe20d3f);
      graphics${compId}.drawCircle(${radio + x},${radio + y}, ${radio});
      graphics${compId}.endFill();
      ${compName}.mask = graphics${compId};
      ${compName}.addChild(userHead${compId});`,
    DOM: `
      <img class="${compName}" src="${url}">`,
    CSS: `
      .${compName} {
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${width}px;
        height: ${height}px;
        border-radius: 50px;
      }`,
  };
};