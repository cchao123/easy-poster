const html2Canvas = (params: any) => {
  return `1`
};

const pixiJs = (params: any) => {
  // TODO 判断是否是圆形
  const { width, point, compId, url } = params;
  const { x, y } = point;
  const radio = width / 2;
  return `
      const userWrap${compId}: PIXI.Container = new PIXI.Container();
      userWrap${compId}.x = ${x};
      userWrap${compId}.y = ${y};
      const userHead${compId} = createSprite('${url}', {
        width: ${width},
        height: ${width},
      })
      const graphics${compId} = new PIXI.Graphics();
      graphics${compId}.beginFill(0xe20d3f);
      graphics${compId}.drawCircle(${radio + x},${radio + y}, ${radio});
      graphics${compId}.endFill()
      userWrap${compId}.mask = graphics${compId};
      userWrap${compId}.addChild(userHead${compId});`
};

export const getHeadTpl = (params: any) => {
  return {
    html2Canvas: html2Canvas(params),
    pixiJs: pixiJs(params),
  }
}

