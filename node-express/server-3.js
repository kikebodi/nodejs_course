//import express and html modules.
var express = require('express');
var morgan = require('morgan');
//import body parser
var bodyParser = require('body-parser');

//Define local variables
var hostname = 'localhost';
var port = 3000;

// Create express object
var app = express();

//Enable morgan to get dev logging
app.use(morgan('dev'));

//If the body comes in JSON format, body parser converts to JavaScript objects in order to be accesed from the code. 
app.use(bodyParser.json());

//Specify what to do when '/dishes' is requested
app.all('/dishes', function(req,res,next){

	res.writeHead(200, { 'Content-Type': 'text/html' });
	next();

});
//General GET case
app.get('/dishes', function(req,res,next){
	res.end('We will send all the dishes to you');
});
//General POST case
app.post('/dishes', function(req,res,next){
	res.end('We will add the dish: '+req.body.name+' with details: '+ req.body.description);
});
//General DELETE case
app.delete('/dishes', function(req,res,next){
	res.end('Deleting all dishes');
});


//GET case for a determined dish
app.get('/dishes/:dishId', function(req,res,next){
	res.end('We will send you the details of the dish: '+req.params.dishId);
});

//PUT case for a determined dish
app.put('/dishes/:dishId', function(req, res, next){
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
});

//DELETE case for a determined dish
app.delete('/dishes/:dishId', function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

//Define public as static folder where all the files will be sent as is.
app.use(express.static(__dirname + '/public'));

//Start the server
app.listen(port, hostname, function(){
  console.log('Server running at http://'+hostname+':'+port);
});