export const searchParams = (url: string, name: string) => {
  const key = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${key}(=([^&#]*)|&|#|$)`);
  const ret = regex.exec(url);
  if (!ret) {
    return null;
  }

  if (!ret[2]) {
    return '';
  }

  return window.decodeURIComponent(ret[2].replace(/\+/g, ' '));
};

// 手动计算vw尺寸
// 参数定义
// {w:需要计算的尺寸,ww:设计图整体宽度,}
export const getVw = (obj: { w: number; ww: number }) => `${(Number(obj.w) / Number(obj.ww)) * 100}vw`;

export const sleep = (timeout: number) => {
  const time = timeout;
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

/**
 * @description 将数据每 chunkLength 数量分成一组
 *  example arrayChunk([1,2,3], 1)
 *  => [[1], [2], [3]]
 * @param array 源数组
 * @param chunkLength 分割宽度
 */
export const getArrayChunk = (array: any[], chunkLength: number) => {
  let index = 0;
  const newArray = [];

  while (index < array.length) {
    newArray.push(array.slice(index, (index += chunkLength)));
  }
  return newArray;
};

/**
 * @description 判断是否是偶数
 * @returns boolean
 */
export const isEven = (n: number) => n % 2 === 0;

/**
 * @description 在指定范围生成随机数
 * @param min
 * @param max
 */
export const random = (min: number, max: number) => Math.round(Math.random() * (max - min)) + min;



/**
 * @description 数组乱序，返回一个新的数组
 * @param items
 * @returns
 */
export const shuffle = (items: any[]) => {
  const copyitems = [...items];
  for (let i = items.length; i > 0; i--) {
    const idx = Math.floor(Math.random() * i);
    [copyitems[idx], copyitems[i - 1]] = [copyitems[i - 1], copyitems[idx]];
  }
  return copyitems;
};

/**
 * @description 生成一个唯一ID
 * @param length 长度
 * @returns
 */
export const generateMixed = (length: number) => {
  const str = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  let res = '';
  for (let i = 0; i < length; i++) {
    const id = Math.ceil(Math.random() * str.length - 1);
    res += str[id];
  }
  res += Date.now().toString(36);
  return res;
};

/**
 * @description 生成随机数字母+数字
 * @param len 长度
 */
export const getRandomAlphaNum = (len: number) => {
  let rdmString = '';
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
  return rdmString.substr(0, len);
};

/**
 * @description  替换指定传入参数的值,paramName为参数,replaceWith为新值,有就替换没有就添加
 * @param url 链接
 * @param params 对象参数
 */
export const replaceParamVal = (url: string, params: Record<string, any>) => {
  let oUrl = url.toString();
  Object.entries(params).forEach(([replaceKey, replaceValue]) => {
    if (replaceValue === null) {
      return false;
    }
    if (searchParams(oUrl, replaceKey) !== null) {
      const re = new RegExp(`(${replaceKey}=)([^&]*)`, 'gi');
      oUrl = oUrl.replace(re, `${replaceKey}=${replaceValue}`);
    } else {
      if (oUrl.indexOf('?') !== -1) {
        oUrl = oUrl.replace('?', `?${replaceKey}=${replaceValue}&`);
      } else {
        oUrl += `?${replaceKey}=${replaceValue}`;
      }
    }
  });
  return oUrl;
};


// 是否为空
export const isEmpty = (str: any) => {
  if (str === undefined || str === '' || str === null) {
    return true;
  }
  return false;
};

// 删除末尾空格
export const trim = (str: string) => {
  if (isEmpty(str)) {
    return str;
  }

  return str.replace(/(^\s*)|(\s*$)/g, '');
};

// 计算字符串长度（中文算2个长度）
export const charLength = (str: string) => {
  const nstr = str.replace(/[^(x00-xff)!z]/g, 'JJ');
  return nstr.length;
};

export const truncate = (str: any, size: any, tail: any) => {
  let nstr = trim(str);
  const cLen = charLength(nstr);
  const length = size <= 0 ? cLen : size;
  if (length >= cLen) return nstr;
  while (charLength(nstr) > length) {
    nstr = nstr.substr(0, nstr.length - 1);
  }
  nstr += tail || '...';

  return nstr;
};

