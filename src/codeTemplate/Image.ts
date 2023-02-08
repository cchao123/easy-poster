const html2Canvas = (params: any) => {
  return `1`
};

const pixiJs = (params: any) => {
  return `
        const image = createSprite('${params.url}', {
          width: ${params.width},
          height: ${params.height},
          x: ${params.point.x},
          y: ${params.point.y},
        });`
};

export const getImageTpl = (params: any) => {
  return {
    html2Canvas: html2Canvas(params),
    pixiJs: pixiJs(params),
  }
}

