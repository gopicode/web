function flattenThunk(thunk) {
  return function flat(done) {
    function next(err, value) {
      if (err) return done(err);
      (typeof value === 'function') ? value(next) : done(null, value);
    }
    thunk(next);
  }
}

/*
var flattenThunk = require('./') // <- this is the file you make;
*/

var thunk1 = function(cb) {
  setTimeout(function() {
    cb(null, 'done');
  }, 1);
}
var thunk2 = function(cb) {
  setTimeout(function() {
    cb(null, thunk1);
  }, 1);
}
var thunk3 = function(cb) {
  setTimeout(function() {
    cb(null, thunk2);
  }, 1);
}

flattenThunk(thunk3)(function(err, result) {
  console.log(result); // 'done'
});
