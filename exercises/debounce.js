function debounce(fn, idleTime) {
  let tmr;
  return function debounced(...args) {
    if (tmr) clearTimeout(tmr);
    tmr = setTimeout(() => {
      fn.apply(this, args);
      // fn(...args);
    }, idleTime)
  }
}

const car = {
  model: 2018,
  color: 'red',
  start: function(by) { console.log(`car model:${this.model} color:${this.color} started by ${by}`)}
}
car.start('Tesla');

car.start = debounce(car.start, 30);
for (let i = 0; i < 20; i += 1) {
  car.start('Ford');
}
