/* eslint-disable @typescript-eslint/no-unused-vars */
const cookie = (key: string): string => {
  if (document === void 0) {
    return '';
  }

  let ret = '';
  document.cookie.split(/;\s*/).forEach((value, index, context) => {
    const kv = value.split('=');
    if (kv[0] === key) {
      [, ret] = kv;
    }
  });

  return ret;
};

/**
 * 写cookies
 * @param {string} name 写cookie的key
 * @param {string|number} value 写cookie的值
 * @param {number} day 存储的时间，默认30天
 */
const setCookie = (name: string, value: string | number, day = 30): void => {
  const exp = new Date();
  const time = Number(day) * 24 * 60 * 60 * 1000;
  exp.setTime(exp.getTime() + time);
  document.cookie = `${name}=${escape(`${value}`)};path=/;expires=${exp.toUTCString()}`;
};

export { cookie, setCookie };

export default cookie;
