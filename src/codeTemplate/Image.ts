export const getImageTpl = (params: any) => {
  const { type, compId, point, width, height, url } = params;
  const { x, y } = point;
  const compName = type + compId;
  return {
    PIXI: `
      ${compName} = createSprite('${url}', {
        width: ${width},
        height: ${height},
        x: ${point.x},
        y: ${point.y},
      });`,
    DOM: `
      <img class="${compName}" src="${url}">`,
    CSS: `
      .${compName} {
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${width}px;
        height: ${height}px;
      };`,
  };
};
