const cache = new Map();

const get = (key) => cache.get(key);

const set = (key, value) => {
  cache.set(key, value);
};

module.exports = {
  get,
  set,
};
