//import express and html modules.
var express = require('express'),
     http = require('http');

//Define local variables
var hostname = 'localhost';
var port = 3000;

// Create express object
var app = express();

//Define work for express
app.use(function (req, res, next) {
  console.log(req.headers);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<html><body><h1>Hello World</h1></body></html>');

});

//Create the server object and...
var server = http.createServer(app);
//... start it.
server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});