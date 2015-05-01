
var express = require('express');
var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var app = express();

app.use('/upload-post', function(req, res, next) {
  if (req.method === 'POST') {
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect(files.upload));
    });
  }
  else {
    res.send("GET not handled here");
  }
});

var port = process.env.NODE_PORT || 9090;
http.createServer(app).listen(port, function(){
  console.log('Server running on port ' + port);
});
