/**
 * 存储数据
 */
export const setStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

/**
 * 获取数据
 */
export const getStorage = (key: string) => {
  return window.localStorage.getItem(key);
};

/**
 * 删除单个数据
 */
export const deleteStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
};

/**
 * 删除所有数据
 */
export const clearStorage = () => {
  window.localStorage.clear();
};
