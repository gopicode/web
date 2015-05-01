/*
 * print the headers and the unzipped content
 * cut the http response from the dump got from wireshark 'Follow Stream feature'
 * the file contains the headers at the top and the 'gzipped' content follows next.
 *
 * author: Gopinath Kesavan
 * date  : 30-Sep-2014 
 */

var path = require('path');
var fs = require('fs');
var zlib = require('zlib');

var file = process.argv[2];
if (!file) {
  console.error('file path is missing');
  process.exit(1);
}

var content = fs.readFileSync(file);
//console.log('utf-8', content.isEncoding('utf-8'));

var pos;
var headers = [];
var separator = "\r\n\r\n";
var hcount = 0;
var buf;

var i = 0, j = 0, k = 0;
var n = content.length;

while (i < n) {
  var ch = content.readUInt8(i);
  headers.push(String.fromCharCode(ch));

  if (ch === 10 && headers.length > 4) {
    var lastChars = headers.slice(-4);
    console.log('i = ', i, ' sliced lastChars:', lastChars);
    if (lastChars.join('') === separator) {
      hcount++;
      if (hcount >= 2) {
        console.log('got seperator @ %d', i);
        console.log(headers.join(''));

        for (j = i + 1; j < n; j += 1) {
          var a = content.readUInt8(j);
          var b = content.readUInt8(j+1);
          console.log('a = %d, b = %d', a, b);
          if (a === 31 && b === 139) {
            k = j;
            console.log('yes found @ %d', k);
            break;
          }
          if (j > i + 10) {
            break;
          }
        }
        if (k) {
          var buf = new Buffer(n - k);
          content.copy(buf, 0, k); 
          zlib.unzip(buf, function(err, raw) {
            if (err) return console.error('Error!', err);
            console.log(raw.toString());
          });
          break;
        }
      }
    }
  }

  i++;
}

