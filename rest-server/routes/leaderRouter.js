//import body parser
var bodyParser = require('body-parser');
//import Express
var express = require('express');
//import mongoose
var mongoose = require('mongoose');
//import leaders mongoose schema
var leaders = require('../models/leadership');
  
  //Create Router object supported by Express.
  //Router is a middleware.
  var leaderRouter = express.Router();
  leaderRouter.use(bodyParser.json());

  leaderRouter.route('/')
    //note that we don't use ';' until '.delete' everything is attache to 'leaderRouter.route('/')'
  .get(function(req,res,next){
    //res.end('We will send all the leaders to you');
    leaders.find({},function(err,leader){ // {} -> empty query (will return all the objects)
     if(err) throw err;
     //This will return the leaders in a JSON format
     res.json(leader);
    });
  })
  .post(function(req,res,next){
    //res.end('We will add the leader: '+req.body.name+' with details: '+ req.body.description);
    leaders.create(req.body, function(err, leader){
      if(err) throw err;
      console.log('leader created');
      var id = leader._id;
      res.writeHead(200,{'ContentType' : 'text/plain'});
      res.end('Added leader with id: '+id);
    });
  })
  .delete(function(req,res,next){
    leaders.remove({}, function(err, resp){
      if(err) throw err;
      res.json(resp); //the objects deleted in JSON format
    });
  });


  leaderRouter.route('/:leaderId')
  .get(function(req,res,next){ 
      //res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
     leaders.findById(req.params.leaderId ,function(err,leader){
     if(err) throw err;
     //This will return the leader in a JSON format
     res.json(leader);
    });
      

  })
  .put(function(req, res, next){
    //res.write('Updating the leader: ' + req.params.leaderId + '\n');
    //res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
    leaders.findByIdAndUpdate(req.params.leaderId,{$set: req.body},{new : true}, function(err,resp){
      if(err) throw err;
      res.json(resp);
    });
  })
  .delete(function(req, res, next){
    //res.end('Deleting leader: ' + req.params.leaderId);
    leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {        
      if (err) throw err;
      res.json(resp);
    });
  });

module.exports = leaderRouter;