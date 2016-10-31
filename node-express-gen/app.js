var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
//import the End point implementation for 'dishes'
var dishRouter = require('./routes/dishRouter');
//import the End point implementation for 'promotions'
var promoRouter = require('./routes/promoRouter');
//import the End point implementation for 'leadership'
var leaderRouter = require('./routes/leaderRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
//attach router into my express app for /dishes' end point
dishRouter(function(err,router) {
	if (err) {
		console.log('Could not start the "/dishes" end point');
	    console.log(err);
	}
	else {
         app.use('/dishes', router);
	}
    });

//attach router into my express app for /promotions' end point
promoRouter(function(err,router) {
	if (err) {
		console.log('Could not start the "/promotions" end point');
	    console.log(err);
	}
	else {
         app.use('/promotions', router);
	}
    });

//attach router into my express app for /leadership' end point
leaderRouter(function(err,router) {
	if (err) {
		console.log('Could not start the "/leadership" end point');
	    console.log(err);
	}
	else {
         app.use('/leadership', router);
	}
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;