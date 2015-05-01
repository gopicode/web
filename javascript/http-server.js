
var http = require('http');
var port = process.env.NODE_PORT || 9090;
var fs = require('fs');
var path = require('path');

function app(req, res) {
  fs.readFile(path.join(__dirname, 'data/addr.json'), function(err, content) {
    res.setHeader('Content-Type', 'application/json');
    res.end(content);
  });
}

var server = http.createServer(app).listen(port, function(err) {
    if (err) return console.error(err);
    console.log('Server running on port: '+ port);
});

module.exports = app;
