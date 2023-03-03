
type any = any;

// 获取元素距离页面顶部距离
export const getElementToPageTop = (el: any) => {
  if (el.parentElement) {
    const offsetTop: any = getElementToPageTop(el.parentElement) + el.offsetTop;
    return offsetTop;
  }
  return el.offsetTop;
};

// 获取元素距离可视窗口位置
export const getClientRect = (dom: Element) => {
  if (dom) {
    return dom.getBoundingClientRect();
  }
  return {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  };
};
