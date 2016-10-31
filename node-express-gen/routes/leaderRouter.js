//import body parser
var bodyParser = require('body-parser');
//import Express
var express = require('express');

module.exports = function(callback) {
try {
  
  //Create Router object supported by Express.
  //Router is a middleware.
  var leaderRouter = express.Router();
  leaderRouter.use(bodyParser.json());

  leaderRouter.route('/')
    //note that we don't use ';' until '.delete' everything is attached to 'leaderRouter.route('/')'
  .all(function(req,res,next){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    next();
  })
  .get(function(req,res,next){
    res.end('We will send all the leaders to you');
  })
  .post(function(req,res,next){
    res.end('We will add the leader: '+req.body.name+' with details: '+ req.body.description);
  })
  // .put(function(req,res,next){
  //   res.end('Operation non supported');
  // })
  .delete(function(req,res,next){
    res.end('Deleting all leaders');
  });


  leaderRouter.route('/:leaderId')
  .all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
  })
  .get(function(req,res,next){ 
      res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
  })
  .put(function(req, res, next){
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + 
            ' with details: ' + req.body.description);
  })
  .delete(function(req, res, next){
    res.end('Deleting leader: ' + req.params.leaderId);
  });

  //return router into my express app
  callback(null, leaderRouter);

  }
catch (error) {
   callback(error,null);
}
}