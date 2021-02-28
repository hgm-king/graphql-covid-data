export const objectMap = (object, callback) =>
  Object.keys(object).map((key, i) => callback(key, object[key], i));

export const max = (arr, fn) => Math.max(...arr.map(fn));

export const toOption = (v) => ({
  label: v,
  value: v,
});

export const range = (count) => [...Array(count).keys()];

export const initializeSumObject = (keys, initialValue) =>
  keys.reduce((acc, key) => {
    acc[key] = initialValue;
    return acc;
  }, {});

export const summedObject = (data, keys) =>
  data.reduce(
    (acc, row) =>
      keys.reduce((acc, key) => {
        acc[key] += row[key];
        return acc;
      }, acc),
    initializeSumObject(keys, 0)
  );
