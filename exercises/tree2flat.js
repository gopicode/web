function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function tree2flat(input) {
  const output = {};
  Object.keys(input).forEach(key => {
    const val = input[key];
    if (isObject(val)) {
      const result = tree2flat(val);
      Object.entries(result).forEach(([k, v]) => {
        output[`${key}.${k}`] = v;
      })
    } else {
      output[key] = val;
    }
  })
  return output;
}

const input = {
    "user": {
        "id": 1,
        "name": "sample"
    },
    "mkt": {
        "inward": {
            "default": {
                "timeout": 15000,
                "abc": "ok"
            },
            "enabled": true
        }
    }
}

const output = tree2flat(input);
console.log(JSON.stringify(output, null, 4));
