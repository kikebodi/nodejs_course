//import body parser
var bodyParser = require('body-parser');
//import Express
var express = require('express');

module.exports = function(callback) {
try {
  
  //Create Router object supported by Express.
  //Router is a middleware.
  var promoRouter = express.Router();
  promoRouter.use(bodyParser.json());

  promoRouter.route('/')
    //note that we don't use ';' until '.delete' everything is attache to 'promoRouter.route('/')'
  .all(function(req,res,next){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    next();
  })
  .get(function(req,res,next){
    res.end('We will send all the promos to you');
  })
  .post(function(req,res,next){
    res.end('We will add the promo: '+req.body.name+' with details: '+ req.body.description);
  })
  .delete(function(req,res,next){
    res.end('Deleting all promos');
  });


  promoRouter.route('/:promoId')
  .all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
  })
  .get(function(req,res,next){ 
      res.end('Will send details of the promo: ' + req.params.promoId +' to you!');
  })
  .put(function(req, res, next){
    res.write('Updating the promo: ' + req.params.promoId + '\n');
    res.end('Will update the promo: ' + req.body.name + 
            ' with details: ' + req.body.description);
  })
  .delete(function(req, res, next){
    res.end('Deleting promo: ' + req.params.promoId);
  });

  //return router into my express app
  callback(null, promoRouter);

  }
catch (error) {
   callback(error,null);
}
}