const html2Canvas = (params: any) => {
  return `1`
};

const pixiJs = (params: any) => {
  return `
      const container${params.compId}: PIXI.Container = new PIXI.Container();
      container.witdh = ${params.width};
      container.height =  ${params.height};
      container.x =  ${params.point.x};
      container.y =  ${params.point.y};`
};

export const getContainerTpl = (params: any) => {
  return {
    html2Canvas: html2Canvas(params),
    pixiJs: pixiJs(params),
  }
}

