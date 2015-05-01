
var url = 'http://registry.npmjs.org/express/3.5.2';
var opts = require('url').parse(url);
opts.method = 'GET';
opts.headers = {
  'Accept': 'application/json'
};

var chunks = [];
var requ = require('http').request(opts, function(resp) {
  if (resp.statusCode != 200) {
      throw new Error('failed service: ' + url + ' http status: ' + resp.statusCode);
  }
  if (resp.headers['content-type'].indexOf('application/json') == -1) {
    throw new Error('failed service: ' + url + ' content-type is not json but: ' + resp.headers['content-type']);
  }
  resp.on('data', function(chunk) { chunks.push(chunk) });
  resp.on('end', function() {
    var content = Buffer.concat(chunks).toString();
    var robj = JSON.parse(content);
    console.log(robj);
  });
  resp.on('error', function() {
    throw new Error('response error for service: ' + url);
  });
});
requ.end();

