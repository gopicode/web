
var express = require('express');
var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var app = express();

app.use('/test', function(req, res, next) {
  res.send("test page");
});

app.use('/upload', function(req, res, next) {
  if (req.method === 'POST') {
    res.send("not handled here");
  }
  else {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="/upload-post" enctype="multipart/form-data" method="post">'+
      '<input type="text" name="title"><br>'+
      '<input type="file" name="upload" multiple="multiple"><br>'+
      '<input type="submit" value="Upload">'+
      '</form>'
    );
  }
});

var port = process.env.NODE_PORT || 8080;
http.createServer(app).listen(port, function(){
  console.log('Server running on port ' + port);
});
