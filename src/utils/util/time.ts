const padLeftZero = (str: string) => `00${str}`.substr(str.length);
export const formatDate = (date: any, fmt: string) => {
  let fmt1 = fmt;
  if (/(y+)/.test(fmt)) {
    fmt1 = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  const o: Record<string, any> = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  Object.keys(o).forEach((k: string) => {
    if (new RegExp(`(${k})`).test(fmt1)) {
      const str = `${o[k]}`;
      fmt1 = fmt1.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  });
  return fmt1;
};

export const formatTimer = (time: any, reg = 'yyyy.MM.dd') => {
  let timestamp = time / 1;
  if (time.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  const date = new Date(timestamp);
  return formatDate(date, reg);
};

export const formatTimerMD = (time: any) => {
  let timestamp = time / 1;
  if (time.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  const date = new Date(timestamp);
  return formatDate(date, 'MM.dd');
};

export const formatDateStr = (dateStr: any, format: any) => {
  const date = new Date(dateStr);
  return formatDate(date, format);
};

export const formatFullDate = (time: any) => {
  let timestamp = time / 1;
  if (time.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  const date = new Date(timestamp);
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
};

export const formatFullDateNew = (time: any) => {
  let timestamp = time / 1;
  if (time.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  const date = new Date(timestamp);
  return formatDate(date, 'yyyy-MM-dd hh:mm');
};

export const formatDay = (time: any) => {
  let timestamp = time / 1;
  if (time.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  const date = new Date(timestamp);
  return formatDate(date, 'dd');
};

export const formatHour = (time: any) => {
  let timestamp = time / 1;
  if (time.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  const date = new Date(timestamp);
  return formatDate(date, 'hh');
};

export const formatMinutes = (time: any) => {
  let timestamp = time / 1;
  if (time.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  const date = new Date(timestamp);
  return formatDate(date, 'mm');
};

export const formatSecond = (time: any) => {
  let timestamp = time / 1;
  if (time.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  const date = new Date(timestamp);
  return formatDate(date, 'ss');
};

/**
 * @description 获取 N天前的时间戳
 * @param now
 * @param day
 * @returns
 */
export const getBeforeDayTime = (now: number, day: number): number => {
  const beforeTime = now - day * 24 * 60 * 60 * 1000;
  return beforeTime;
};

/**
 * @decription 对比两个时间戳差多少天
 * @param startTime
 * @param endTime
 * @returns
 */
export const diffTimeToDay = (startTime: number, endTime: number) => (endTime - startTime) / (24 * 60 * 60 * 1000);

/**
 * @description 判断时间戳是否当天
 * @param time
 * @returns
 */
export const isToday = (time: any) => {
  const atime = formatDay(time);
  const btime = formatDay(Date.now());
  if (atime === btime) {
    return true;
  }
  return false;
};
export const formatNumber = (n: string | number) => {
  const nstr = n.toString();
  return nstr[1] ? nstr : `0${nstr}`;
};
export const diffTime = (startDate: Date, endDate: Date) => {
  const diff = endDate.getTime() - startDate.getTime(); // 时间差的毫秒数
  // 计算出相差天数
  const days = Math.floor(diff / (24 * 3600 * 1000));
  // 计算出小时数
  const leave1 = diff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  const hours = formatNumber(String(Math.floor(leave1 / (3600 * 1000))));
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  const minutes = formatNumber(String(Math.floor(leave2 / (60 * 1000))));
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  const seconds = formatNumber(String(Math.round(leave3 / 1000)));
  const tmpObj = {
    days,
    hours,
    minutes,
    seconds,
  };
  return tmpObj;
};

export const addLeftZero = (num: number) => {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
};
// 将分钟转换为年月日-时分
export const formatMsgTime = (time: number) => {
  // 时间戳返回时间
  const timestamp: any = Number(time) || Date.now() / 1000;
  const now = new Date();
  const range = now.getTime() / 1000 - timestamp;
  let rst = '';
  const getToday = () => {
    if (range < 60 * 15) {
      // 15分钟内
      rst = '刚刚';
    } else if (range < 60 * 60) {
      // 1小时内
      rst = `${Math.floor(range / 60)}分钟前`;
    } else if (range < 60 * 60 * 7) {
      // 7小时内
      rst = `${Math.floor(range / 60 / 60)}小时前`;
    }
  };
  if (range >= 60 * 60 * 7) {
    // 大于7小时
    const time = new Date(timestamp * 1000);
    const minute = addLeftZero(time.getMinutes());
    const hour = addLeftZero(time.getHours());
    rst = `${hour}:${minute}`; // 00:00
    const date = time.getDate();
    const today = now.getDate();
    if (date !== today) {
      // 非当日 00/00 00:00
      const month = time.getMonth() + 1;
      rst = `${month}/${date} ${rst}`;
    }
  } else {
    getToday();
  }
  return rst;
};
