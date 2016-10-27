//import express and html modules.
var express = require('express');
var morgan = require('morgan');
//import body parser
var bodyParser = require('body-parser');

//Define local variables
var hostname = 'localhost';
var port = 3000;

// Create express (server) object
var app = express();

//Enable morgan to get dev logging
app.use(morgan('dev'));

//Create Router object supported by Express.
//
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
//note that we don't use ';' until '.delete' everything is attache to 'dishRouter.route('/')'
.all(function(req,res,next){
	res.writeHead(200, { 'Content-Type': 'text/html' });
	next();
})
.get(function(req,res,next){
	res.end('We will send all the dishes to you');
})
.post(function(req,res,next){
	res.end('We will add the dish: '+req.body.name+' with details: '+ req.body.description);
})
.delete(function(req,res,next){
	res.end('Deleting all dishes');
});


dishRouter.route('/:dishId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})
.get(function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
})
.put(function(req, res, next){
        res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
})
.delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

//attach router into my express app
app.use('/dishes', dishRouter);

//Define public as static folder where all the files will be sent as is.
app.use(express.static(__dirname + '/public'));

//Start the server
app.listen(port, hostname, function(){
  console.log('Server running at http://'+hostname+':'+port);
});