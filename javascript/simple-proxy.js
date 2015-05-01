var path = require('path');
var fs = require('fs');

function handler(req, res) {
    var url = 'http://registry.myntra.com:8000' + req.url;
    var opts = url_parse(url);
    opts.method = req.method;
    opts.agent = false;
    opts.headers = req.headers || {};
    opts.headers.host = opts.hostname;
    // console.log(url, JSON.stringify(opts));

    var chunks = [];
    var requ = http.request(opts, function(resp) {
        res.writeHead(resp.statusCode, resp.headers);
        resp.on('data', function(chunk) {
            chunks.push(chunk);
            res.write(chunk);
        });
        resp.on('end', function() {
            res.end();
            // console.log('%d %s', resp.statusCode, url);
            if (resp.headers['content-type'] && resp.headers['content-type'].indexOf('application/json') !== -1) {
                var content = Buffer.concat(chunks).toString();
                if (/registry\.npmjs\.org/.test(content)) {
                    console.log('found %s', url);
                    var file = path.join('./data', req.url + '.json');
                    fs.writeFile(file, content, function(err) {
                        if (err) return console.error(err, file);
                        console.log('wrote %s', file);
                    });
                }
            }
        });
        resp.on('error', function() {
            console.error('response error for %s', url);
        });
    });

    requ.on('error', function() {
        console.error('requuest error for %s', url);
    });
    requ.end();
}

http.createServer(handler).listen(9000);

