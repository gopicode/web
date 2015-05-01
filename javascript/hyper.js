
var request = require('hyperquest');
var through = require('through2');
var http = require('http');

function collect(obj) {
  var text = '';
  var chunks = [];
  var handle = through(function(chunk, enc, callback) {
    if (typeof chunk == 'string') {
      text += chunk;
    } else if (Buffer.isBuffer(chunk)) {
      chunks.push(chunk);
    } else {
      console.error('unknown chunk: ' + typeof chunk);
    }
    callback();
  });
  handle.on('finish', function() {
    obj.text = text.length > 0 ? text : Buffer.concat(chunks).toString();
  });
  return handle;
}

function session_begin(xid) {
  var opts = {};
  opts.method = 'GET';
  opts.uri = 'http://preprod-portal-service-3:8080/SessionStoreService/rest/sessions/' + xid;
  opts.headers = {
    "accept": "application/xml",
    "accept-language": "en-US"
  };
  var requ = request(opts);
  requ.pipe(collect(requ)).on('finish', function() {
    console.log('request:', opts.method, opts.uri);
    console.log('req headers: ', requ.request.headers);
    console.log('res status: ', requ.response.statusCode);
    console.log('res headers: ', requ.response.headers);
    console.log('res body: ', requ.text);
  });
}

function add_to_cart(xid, tok) {
  var opts = {};
  opts.method = 'PUT';
  opts.uri = 'http://preprod-portal-service-2.myntra.com:7006/myntra-absolut-service/absolut/cart/default';
  opts.headers = {
    "accept": "application/json; charset=utf-8",
    "accept-language": "en-US",
    "content-type": "application/json; charset=utf-8",
    "Cookie": "fox-xid=" + xid, 
    "X-CSRF-TOKEN": tok,
    "clearOldCart": "false"
  };
  var requ = request(opts);
  var body = JSON.stringify({skuId:"1172423", quantity:"1", operation:"ADD"});
  opts.headers['content-length'] = Buffer.byteLength(body);
  requ.write(body);
  requ.pipe(collect(requ)).on('finish', function() {
    console.log('request:', opts.method, opts.uri);
    console.log('req headers: ', requ.request.headers);
    console.log('req body: ', body);
    console.log('res status: ', requ.response.statusCode);
    console.log('res headers: ', requ.response.headers);
    console.log('res body: ', requ.text);
  });
}

function target_select(url) {
  var host = '';
  if (url.indexOf('/SessionStoreService/') == 0) {
    host = 'http://preprod-portal-service-3:8080';
  }  
  else if (url.indexOf('/myntra-absolut-service/') == 0) {
    host = 'http://preprod-portal-service-2.myntra.com:7006';
  }
  console.log('proxy:', host + url);
  return host + url;
}

function proxy(req, res) {
  var opts = {};
  opts.uri = target_select(req.url);
  opts.method = req.method;
  opts.headers = req.headers || {};
  var requ = request(opts);
  requ.on('response', function(resp) {
    res.writeHead(resp.statusCode, resp.headers);
  });
  if (req.method == 'GET') {
    requ.pipe(res);
  } else {
    req.pipe(requ).pipe(res);
  }
}

//* -- run as a proxy server
var port = process.env.NODE_PORT || 4444;
http.createServer(proxy).listen(port, function() {
  console.log('server running on port: %d', port);
});
//*/

/* -- sample requests
var xid = 'JJN005d486794789bb42aa8148cdba1dad35a81416924164M';
var tok = '7Kl4h8mcCnYfa3kzPHh3ObZgMfxDrceD';
session_begin(xid);
add_to_cart(xid, tok);
*/

/* -- sample curls to test proxy server
curl -v -X PUT 'http://localhost:4444/myntra-absolut-service/absolut/cart/default' -H 'accept: application/json; charset=utf-8' -H 'accept-language: en-US' -H 'content-type: application/json; charset=utf-8' -H 'Cookie: fox-xid=JJN005d486794789bb42aa8148cdba1dad35a81416924164M' -H 'X-CSRF-TOKEN: 7Kl4h8mcCnYfa3kzPHh3ObZgMfxDrceD' -H 'clearOldCart: false' -H 'content-length: 52' --data '{"skuId":"1172423","quantity":"1","operation":"ADD"}'

curl -v 'http://localhost:4444/SessionStoreService/rest/sessions/JJN004725fa1b2100e431ba8cb87541b56e2f31417613250M' -H 'accept: application/xml'
*/
