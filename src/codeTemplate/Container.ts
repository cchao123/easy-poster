export const getContainerTpl = (params: any) => {
  const { type, compId, width, height, background, point } = params;
  const { x, y } = point;
  const compName = type + compId;
  return {
    PIXI: `
      const ${compName}: PIXI.Container = new PIXI.Container();
      ${compName}.witdh = ${width};
      ${compName}.height =  ${height};
      ${compName}.x =  ${point.x};
      ${compName}.y =  ${point.y};
    `,
    DOM: `
      <div class="${compName}"></div>`,
    CSS: `
      .${compName} {
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${width}px;
        height: ${height}px;
        background-color: ${background};
      };`,
  };
};
