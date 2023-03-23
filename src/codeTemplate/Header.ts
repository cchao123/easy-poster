export const getHeadTpl = (params: any) => {
  const { type, compId, point, width, height, url } = params;
  const { x, y } = point;
  const compName = type + compId;
  // TODO 判断是否是圆形
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