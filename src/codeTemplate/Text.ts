const html2Canvas = (params: any) => {
  return `1`
};

const pixiJs = (params: any) => {
  return `
        const number = new PIXI.Text('${params.textValue}', {
          fontSize: ${params.fontSize},
          fill: ${params.color},
          fontWeight: ${params.fontWeight},
        });`
      };

export const getTextTpl = (params: any) => {
  return {
    html2Canvas: html2Canvas(params),
    pixiJs: pixiJs(params),
  }
}




