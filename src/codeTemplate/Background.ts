const html2Canvas = (params: any) => {
  return `<div></div>`
};

const pixiJs = (params: any) => {
  return `
      const posterBg${params.compId} = createSprite('${params.url}', {
        width: ${params.width},
        height: ${params.height},
        x: ${params.point.x},
        y: ${params.point.y},
      });`
};

export const getBackgroundTpl = (params: any) => {
  return {
    html2Canvas: html2Canvas(params),
    pixiJs: pixiJs(params),
  }
}
