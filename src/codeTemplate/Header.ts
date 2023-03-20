export const getHeadTpl = (params: any) => {
  const { type, compId, point, width, height, url } = params;
  const { x, y } = point;
  const compName = type + compId;
  // TODO 判断是否是圆形
  const radio = width / 2;
  return {
    PIXI: `
      const userWrap${compId}: PIXI.Container = new PIXI.Container();
      userWrap${compId}.x = ${x};
      userWrap${compId}.y = ${y};
      const userHead${compId} = createSprite('${url}', {
        width: ${width},
        height: ${width},
      });
      const graphics${compId} = new PIXI.Graphics();
      graphics${compId}.beginFill(0xe20d3f);
      graphics${compId}.drawCircle(${radio + x},${radio + y}, ${radio});
      graphics${compId}.endFill();
      userWrap${compId}.mask = graphics${compId};
      userWrap${compId}.addChild(userHead${compId});`,
    DOM: `
      <img class="${compName}" src="${url}">`,
    CSS: `
      .${compName} {
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${width}px;
        height: ${height}px;
      }`,
  };
};