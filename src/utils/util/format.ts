/**
 * @description 格式化大数字为x.x万
 * @param {number} num 需要格式化的数字
 * @param {number} pointNumber 小数点后保留的位数，末尾为0会省略
 */
export interface FormatLargeNumber {
  number: number | string;
  pointNumber?: number;
}
export const formatLargeNumber = (params: FormatLargeNumber): string => {
  const { number = 0, pointNumber = 1 } = params;
  if (Number(number) >= 10000) {
    let resNum = Number(number) / 10000;
    const denominator = 10 ** (pointNumber || 1);
    resNum = resNum * denominator;
    resNum = Math.floor(resNum) / denominator;
    return `${resNum}万`;
  }

  return `${number}`;
};
export const formatCount = (count: number | string) => {
  let countString = '';
  if (Number(count) >= 10000) {
    countString = `${(Number(count) / 10000).toFixed(1).toString()}万`;
  } else {
    countString = `${count}`;
  }
  return countString;
};
// 数字每3位加逗号
export const formatThousands = (number: number) => {
  if (!number) {
    return '';
  }
  const str = number.toString();
  const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
  return str.replace(reg, '$1,');
};
