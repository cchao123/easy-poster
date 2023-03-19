const html2Canvas = (params: any) => {
  return {
    DOM: '',
    CSS: '',
  };
};

const pixiJs = (params: any) => {
  const { compId, url, width, height, point } =params;
  return `
      const 二维码${compId} = createSprite('${url}', {
        width: ${width},
        height: ${height},
        x: ${point.x},
        y: ${point.y},
      });`
};

export const getQrTpl = (params: any) => {
  return {
    html2Canvas: html2Canvas(params),
    pixiJs: pixiJs(params),
  }
}

