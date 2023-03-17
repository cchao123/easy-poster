const html2Canvas = (params: any) => {
  return {
    DOM: `<div></div>`,
    CSS: `
      .text1 {
        
      }
    `,
  }
};

const pixiJs = (params: any) => {
  return `
      const text${params.compId} = new PIXI.Text('${params.textValue}', {
        fontSize: ${params.fontSize},
        fill: '${params.fontColor}',
        fontWeight: '${params.fontWeight}',
      });
      text${params.compId}.x = ${params.point.x};
      text${params.compId}.y = ${params.point.y};
      `
};

export const getTextTpl = (params: any) => {
  return {
    html2Canvas: html2Canvas(params),
    pixiJs: pixiJs(params),
  }
}




