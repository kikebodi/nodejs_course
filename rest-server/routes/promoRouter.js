//import body parser
var bodyParser = require('body-parser');
//import Express
var express = require('express');
//import mongoose
var mongoose = require('mongoose');
//import promotions mongoose schema
var promotions = require('../models/promotions');
  
  //Create Router object supported by Express.
  //Router is a middleware.
  var promoRouter = express.Router();
  promoRouter.use(bodyParser.json());

  promoRouter.route('/')
    //note that we don't use ';' until '.delete' everything is attache to 'promoRouter.route('/')'
  .get(function(req,res,next){
    //res.end('We will send all the promotions to you');
    promotions.find({},function(err,promo){ // {} -> empty query (will return all the objects)
     if(err) throw err;
     //This will return the promotions in a JSON format
     res.json(promo);
    });
  })
  .post(function(req,res,next){
    //res.end('We will add the promo: '+req.body.name+' with details: '+ req.body.description);
    promotions.create(req.body, function(err, promo){
      if(err) throw err;
      console.log('promo created');
      var id = promo._id;
      res.writeHead(200,{'ContentType' : 'text/plain'});
      res.end('Added promo with id: '+id);
    });
  })
  .delete(function(req,res,next){
    promotions.remove({}, function(err, resp){
      if(err) throw err;
      res.json(resp); //the objects deleted in JSON format
    });
  });


  promoRouter.route('/:promoId')
  .get(function(req,res,next){ 
      //res.end('Will send details of the promo: ' + req.params.promoId +' to you!');
     promotions.findById(req.params.id ,function(err,promo){
     if(err) throw err;
     //This will return the promo in a JSON format
     res.json(promo);
    });
      

  })
  .put(function(req, res, next){
    //res.write('Updating the promo: ' + req.params.promoId + '\n');
    //res.end('Will update the promo: ' + req.body.name + ' with details: ' + req.body.description);
    promotions.findByIdAndUpdate(req.params.promoId,{$set: req.body},{new : true}, function(err,resp){
      if(err) throw err;
      res.json(resp);
    });
  })
  .delete(function(req, res, next){
    //res.end('Deleting promo: ' + req.params.promoId);
    promotions.findByIdAndRemove(req.params.promoId, function (err, resp) {        
      if (err) throw err;
      res.json(resp);
    });
  });

module.exports = promoRouter;