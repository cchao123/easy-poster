export const getQrTpl = (params: any) => {
  const { url } = params;
  return {
    PIXI: '',
    DOM: `
      <img class="qrcode" src="${url}">`,
    CSS: '',
  };
};
