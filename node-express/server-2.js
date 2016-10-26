//import express and html modules.
var express = require('express');
var morgan = require('morgan');

//Define local variables
var hostname = 'localhost';
var port = 3000;

// Create express object
var app = express();

//Enable morgan to get dev logging
app.use(morgan('dev'));

//Define public as static folder where all the files will be sent as is.
app.use(express.static(__dirname + '/public'));

//Start the server
app.listen(port, hostname, function(){
  console.log('Server running at http://'+hostname+':'+port);
});