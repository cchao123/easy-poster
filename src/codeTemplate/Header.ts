const html2Canvas = (params: any) => {
  return `1`
};

const pixiJs = (params: any) => {
  return `
      const userHead${params.compId} = createSprite('${params.url}', {
        width: ${params.width},
        height: ${params.width},
        x: ${params.point.x},
        y: ${params.point.y},
      });
      
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xe20d3f);
      graphics.drawCircle(85, 88, ${params.width / 2});
      graphics.endFill();
      userHead.mask = graphics;`
};

export const getHeadTpl = (params: any) => {
  return {
    html2Canvas: html2Canvas(params),
    pixiJs: pixiJs(params),
  }
}

