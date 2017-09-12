var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var user = require('./api/models/userDetails');
var passport = require('./server/controllers/passport');
//var passport = require('passport');
var expressSession = require('express-session');




//DB Connection
var uri = 'mongodb://127.0.0.1/StudentTracker';
mongoose.connect(uri);

mongoose.connection.on('connected', function () {
    console.log('Connected to ' + uri);
});

mongoose.connection.on('error', function () {
    console.log('Connection error ' + err);
});

require('./api/models/userDetails');
require('./api/models/studentDetails');
require('./api/models/subjectDetails');

var emailJob = require('./server-scripts/mailScheduleApp');
var job = emailJob.job();

var index = require('./server/routes/index');
//var users = require('./server/routes/users');
var apiRoutes = require('./api/routes/index');
    
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({secret:"my big secret"}));



app.use(express.static(path.join(__dirname, 'server', 'public')));

app.use('/', index);
//app.use('/users', users);
app.use('/api', apiRoutes);



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
