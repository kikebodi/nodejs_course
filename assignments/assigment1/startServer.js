//import express and morgan modules.
var express = require('express');
var morgan = require('morgan');

//import the End point implementation for 'dishes'
var dishRouter = require('./dishRouter');

//import body parser
//var bodyParser = require('body-parser');

//Define local variables
var hostname = 'localhost';
var port = 3000;

// Create express (server) object
var app = express();

//Enable morgan to get dev logging
app.use(morgan('dev'));

/**
**	ASSIGN END POINTS HERE
**/

//attach router into my express app
dishRouter(function(err,router) {
	if (err) {
		console.log('Could not start the "/dishes" end point');
	    console.log(err);
	}
	else {
         app.use('/dishes', router);
	}
    });


/**
** END OF ASSIGMENT
**/

//Define public as static folder where all the files will be sent as is.
app.use(express.static(__dirname + '/public'));

//Start the server
app.listen(port, hostname, function(){
  console.log('Server running at http://'+hostname+':'+port);
});