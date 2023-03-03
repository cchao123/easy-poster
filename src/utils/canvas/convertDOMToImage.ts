import html2canvas from 'html2canvas';

export function toBlobURL(url: string) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img');
    img.setAttribute('crossorigin', 'anonymous');
    img.src = url;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const blobURL = URL.createObjectURL(blob as Blob);
        resolve(blobURL);
      });
    };
    img.onerror = () => {
      resolve(url);
    };
  });
}
export const convertToBlobImage = async (container: HTMLElement) => {
  const imgNodeList = Array.from(container.getElementsByTagName('img'));
  const unBlobNodeList = imgNodeList.filter((img) => !img.src.startsWith('blob'));
  for (const img of unBlobNodeList) {
    const blobUrl = await toBlobURL(img.src);
    img.src = String(blobUrl);
  }
};
interface ConvertDOMToImage {
  DOM: HTMLElement;
  callback: (base64: string) => void;
  quality?: number;
  scaleBy?: number;
  isCovertImg?: boolean;
  ignoreElements?: (ele: Element) => boolean;
}
export const convertDOMToImage = async (params: ConvertDOMToImage) => {
  // console.log(`${obj.dom}---html2canvas开始绘制-------`)
  const { DOM, callback, quality = 0.92, ignoreElements = () => false, scaleBy = 1 } = params;
  const w = DOM.clientWidth;
  const h = DOM.clientHeight;

  // 记录当前窗口scrolltop值
  const sTop = document.documentElement.scrollTop || document.body.scrollTop;

  // 将页面滚动到最顶部，防止出现绘制白屏现象
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  const canvas = document.createElement('canvas');
  canvas.width = w * window.devicePixelRatio * scaleBy;
  canvas.height = h * window.devicePixelRatio * scaleBy;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
  if (context) {
    context.scale(scaleBy, scaleBy);
    // 关闭抗锯齿
    context.imageSmoothingEnabled = false;
  }
  if (params.isCovertImg) {
    await convertToBlobImage(DOM);
  }
  html2canvas(DOM, {
    canvas,
    useCORS: true,
    ignoreElements,
  }).then((canvas: HTMLCanvasElement) => {
    const dataImg = canvas.toDataURL('image/jpeg', quality);
    // 恢复窗口scrolltop值
    document.documentElement.scrollTop = sTop;
    document.body.scrollTop = sTop;
    // 返回绘制好的base64图片
    callback(dataImg);
  });
};
