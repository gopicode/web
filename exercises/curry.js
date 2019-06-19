function curry(fn, arity) {
  return createCurry(fn, arity);
}

function createCurry(fn, arity, argsFilled = []) {
  if (!arity) arity = fn.length;
  // console.log('createCurry arity', fn.name, arity, argsFilled);
  return function curried() {
    const args = argsFilled.concat(Array.from(arguments));
    if (arguments.length >= arity) {
      // console.log('curry apply', fn.name, args);
      return fn(...args);
    } else {
      return createCurry(fn, arity - arguments.length, args);
    }
  }
}


const fmap = curry(function _fmap(fn, data) {
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    result[i] = fn(data[i]);
  }
  return result;
});

const plus1 = fmap(x => x + 1);
const data = [3, 5, 7];
const data2 = [11,13,14]
console.log('plus1', data, plus1(data));
console.log('plus1', data2, plus1(data2));


const ware = curry(function _ware(action, state, next) {
  return [action, state, next];
});

console.log(ware('log1', 'state')('1'));
console.log(ware('log1')('state1')('2'));
const log2 = ware('log2');
console.log(log2('state2', '1'));
console.log(log2('state2')('2'));
