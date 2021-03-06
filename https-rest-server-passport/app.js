/**
**	Main method of this REST API
**  author: Kike Bodi (www.kikebodi.com)
**/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//import monggose model
var mongoose = require('mongoose');
//import passport dependencies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//import the config file
var config = require('./config');

mongoose.connect(config.mongoUrl);
//The variable db is where we will make the queries
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
	console.log('Connected to the server');
});

var index = require('./routes/index');
var users = require('./routes/users');
//import the End point implementation for 'dishes'
var dishRouter = require('./routes/dishRouter');
//import the End point implementation for 'promotions'
var promoRouter = require('./routes/promoRouter');
//import the End point implementation for 'leadership'
var leaderRouter = require('./routes/leaderRouter');

var app = express();

//Secure traffic only
app.all('*', function(req,res,next){
  if(req.secure){
    return next();
  };
  res.redirect('https://'+req.hostname+':'+app.get('secPort')+req.url);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//include passport configuration into the app
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
//attach router into my express app for /dishes' end point
app.use('/dishes', dishRouter);
//attach router into my express app for /promotions' end point
app.use('/promotions', promoRouter);
//attach router into my express app for /leadership' end point
app.use('/leadership', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
