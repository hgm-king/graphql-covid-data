export const objectMap = (object, callback) =>
  Object.keys(object).map((key, i) => callback(key, object[key], i));

export const max = (arr, fn) => Math.max(...arr.map(fn));

export const toOption = (v) => ({
  label: v,
  value: v,
});
