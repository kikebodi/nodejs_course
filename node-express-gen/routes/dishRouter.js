//import body parser
var bodyParser = require('body-parser');
//import Express
var express = require('express');

module.exports = function(callback) {
try {
  
  //Create Router object supported by Express.
  //Router is a middleware.
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

  //return router into my express app
  callback(null, dishRouter);

  }
catch (error) {
   callback(error,null);
}
}
