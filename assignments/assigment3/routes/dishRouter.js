//import body parser
var bodyParser = require('body-parser');
//import Express
var express = require('express');
//import mongoose
var mongoose = require('mongoose');
//import Dishes mongoose schema
var Dishes = require('../models/dishes');
//make use of verification
var Verify = require('./verify');
  
  //Create Router object supported by Express.
  //Router is a middleware.
  var dishRouter = express.Router();
  dishRouter.use(bodyParser.json());

  dishRouter.route('/')
    //note that we don't use ';' until '.delete' everything is attache to 'dishRouter.route('/')'
  .get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next){
    //res.end('We will send all the dishes to you');
    Dishes.find({},function(err,dish){ // {} -> empty query (will return all the objects)
     if(err) throw err;
     //This will return the dishes in a JSON format
     res.json(dish);
    });
  })
  .post(Verify.verifyOrdinaryUser, function(req,res,next){
    //res.end('We will add the dish: '+req.body.name+' with details: '+ req.body.description);
    Dishes.create(req.body, function(err, dish){
      if(err) throw err;
      console.log('Dish created');
      var id = dish._id;
      res.writeHead(200,{'ContentType' : 'text/plain'});
      res.end('Added dish with id: '+id);
    });
  })
  .delete(Verify.verifyOrdinaryUser, function(req,res,next){
    Dishes.remove({}, function(err, resp){
      if(err) throw err;
      res.json(resp); //the objects deleted in JSON format
    });
  });


  dishRouter.route('/:dishId')
  .get(function(req,res,next){ 
      //res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
     Dishes.findById(req.params.dishId ,function(err,dish){
     if(err) throw err;
     //This will return the dish in a JSON format
     res.json(dish);
    });
      

  })
  .put(function(req, res, next){
    //res.write('Updating the dish: ' + req.params.dishId + '\n');
    //res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
    Dishes.findByIdAndUpdate(req.params.dishId,{$set: req.body},{new : true}, function(err,resp){
      if(err) throw err;
      res.json(resp);
    });
  })
  .delete(function(req, res, next){
    //res.end('Deleting dish: ' + req.params.dishId);
    Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {        
      if (err) throw err;
      res.json(resp);
    });
  });

  
dishRouter.route('/:dishId/comments')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });
})

.post(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

dishRouter.route('/:dishId/comments/:commentId')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = dishRouter;