
/*
 * strip the repeated chars upto the limit
 * heeeliuoomusss 1 => heliuomus
 * heeeliuoomusss 2 => heeliuoomuss
 */
function strip(input, limit) {
  var chars = input.split('');
  var accu = [];
  var count = 0;
  var ch;
  for (var i = 0, n = chars.length; i < n; i += 1) {
    if (chars[i] != ch) {
      ch = chars[i];
      accu.push(ch);
      count = 0;
    }
    else {
      count += 1;
      if (count < limit) {
        ch = chars[i];
        accu.push(ch);
      }
    }
  }
  return accu.join('');
}

var msg = process.argv[2];
var lim = process.argv[3];
console.log(strip(msg, lim));

