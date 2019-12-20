function flat2tree(input) {
  const output = {};
  Object.keys(input).forEach(key => {
    const val = input[key];
    const parts = key.split('.');
    const leaf = parts.pop();
    let pointer = output;
    parts.forEach(item => {
      if (!pointer[item]) {
        pointer[item] = {};
      }
      pointer = pointer[item];
    })
    pointer[leaf] = val;
  })
  return output;
}

const input = {
  "user.id": 1,
  "user.name": "sample",
  "mkt.inward.default.timeout": 15000,
  "mkt.inward.default.abc": "ok",
  "mkt.inward.enabled": true,
};

const output = flat2tree(input);
console.log(JSON.stringify(output, null, 4));
