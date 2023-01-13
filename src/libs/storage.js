// 写入localStorage
export const setStorage = (key, value) => {
  if (window.localStorage) {
    const storage = window.localStorage;
    storage.setItem(key, value);
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};

// 读取localStorage
export const getStorage = (key) => {
  if (window.localStorage) {
    const storage = window.localStorage;
    const data = storage.getItem(key);
    return Promise.resolve(data);
  }
  return Promise.resolve(null);
};