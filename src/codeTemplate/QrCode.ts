export const getQrTpl = (params: any) => {
  const { type, compId, textValue, width, height, point } = params;
  const compName = type + compId;
  const { x, y } = point;
  return {
    PIXI: `
      const ${compName} = createSprite('${textValue}', {
        width: ${width},
        height: ${height},
        x: ${x},
        y: ${y},
      });`,
    DOM: `
      <img class="${compName}" src="${textValue}">`,
    CSS: `
      .${compName} {
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${width}px;
        height: ${height}px;
      }`,
  };
};
