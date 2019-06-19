function throttle(fn, speedLimit) {
  let tmr;
  return function throttled(...args) {
    if (tmr) return;
    tmr = setTimeout(() => {
      tmr = null;
    }, speedLimit)
    fn.apply(this, args);
  }
}

const sayHi = function(count) {
  console.log('hi', count);
};

const throttledHi = throttle(sayHi, 300);

function delay(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
function rand(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

async function main() {
  for (let i = 0; i < 20; i += 1) {
    throttledHi(i);
    await delay(rand(10, 148));
  }
}

main();