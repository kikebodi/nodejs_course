var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  //res.end('We will send all the dishes to you');
    User.find({},function(err,user){ // {} -> empty query (will return all the objects)
     if(err){ throw err;}
     //This will return the dishes in a JSON format
     res.json(user);
    });
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
      req.body.password, 
      function(err, user) {
        console.log(req.body.username);
        console.log(req.body.password);
        if (err) {
            return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
        });
    });
});

router.post('/login', Verify.verifyOrdinaryUser, function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {

    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', Verify.verifyOrdinaryUser, function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;