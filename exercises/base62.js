
var lookup = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
var div = 62;

function encode(n) {
  if (typeof n === 'undefined') n = Date.now();
  var num = n;
  var digits = [];
  while (num) {
    var rem = num % div;
    num = (num - rem) / div;
    digits.unshift(rem);
  }
  var str = digits.map(function(val) { return lookup[val] }).join('');
  console.log('enc: %d -> %s', n, str);
  console.log('digits', digits);
  return str;
}


function decode(str) {
  var chars = str.split('');
  var digits = [];
  var num = 0;
  for (var i = 0, n = chars.length; i < n; i += 1) {
    digits.push(lookup.indexOf(chars[i]));
  }
  var j = 0;
  for (var i = digits.length - 1; i >= 0; i -= 1) {
    num = num + digits[i] * Math.pow(div, j);
    j += 1;
  }
  console.log('dec: %d <- %s', num, str);
  console.log('digits', digits);
  return num;
}

var enc = encode();
var dec = decode(enc);


