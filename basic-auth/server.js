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

//Authentication function
function auth(req,res,next){
	console.log(req.headers);

	var authHeader = req.headers.authorization;
	if(!authHeader){
		var err = new Error('You are not authenticated');
		err.status = 401;
		next(err);
		return;
	}

	var auth = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];
	if(user == 'admin' && pass == 'password'){
		next();
	}else{
		var err = new Error('You are not authenticated');
		err.status = 401;
		next(err);
	}
}

//Aply the auth function as Middleware
app.use(auth);

//Define public as static folder where all the files will be sent as is.
app.use(express.static(__dirname + '/public'));

//Handle the authentication error
app.use(function(err,req,res,next){
	res.writeHead(err.status || 500, {
		'WWW-Authenticate': 'Basic',
		'Content-Type': 'text/plain'
	});
	res.end(err.message);
});


//Start the server
app.listen(port, hostname, function(){
  console.log('Server running at http://'+hostname+':'+port);
});