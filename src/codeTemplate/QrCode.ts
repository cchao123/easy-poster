export const getQrTpl = (params: any) => {
  return {
    PIXI: '',
    DOM: '<img src="${url}">',
    CSS: '',
  };
};

const pixiJs = (params: any) => {
  const { type, compId, url, width, height, point } =params;
  const compName = type + compId;
  return `
      const ${compName} = createSprite('${url}', {
        width: ${width},
        height: ${height},
        x: ${point.x},
        y: ${point.y},
      });`
};

// export const  = (params: any) => {
//   return {
//     html2Canvas: html2Canvas(params),
//     pixiJs: pixiJs(params),
//   }
// }

