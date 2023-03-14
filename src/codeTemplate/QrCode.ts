const html2Canvas = (params: any) => {
  return `1`
};

const pixiJs = (params: any) => {
  return `
      const 二维码${params.compId} = createSprite('${params.url}', {
        width: ${params.width},
        height: ${params.height},
        x: ${params.point.x},
        y: ${params.point.y},
      });`
};

export const getQrTpl = (params: any) => {
  return {
    html2Canvas: html2Canvas(params),
    pixiJs: pixiJs(params),
  }
}

