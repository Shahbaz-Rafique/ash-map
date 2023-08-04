var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require("body-parser");
const crypto = require('crypto');
var cors=require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pinsRouter = require('./routes/addpins');
var getpinsRouter = require('./routes/getpins');
var getpintypesRouter = require('./routes/getpintypes');
var deleteRouter = require('./routes/deletepin');
var registerRouter = require('./routes/register');
var verificationRouter = require('./routes/verifyemail');
var loginRouter = require('./routes/login');
var checkRouter = require('./routes/check');
var getuserRouter = require('./routes/getusers');
var deleteusersRouter = require('./routes/deleteuser');
var changepassRouter = require('./routes/changepass');
var approveRouter = require('./routes/approve');

var app = express();
var db=require('./database/sql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your own domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


function validateAPIKey(req, res, next) {
  const authkey =  req.header('api-key');
  if (authkey && crypto.createHash('sha256').update(authkey).digest('hex') === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized Access' });
  }
}
app.use((req, res, next) => {
  if (req.path.startsWith('/images')) {
    return next();
  }
  validateAPIKey(req, res, next);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addpins', pinsRouter);
app.use('/getpins', getpinsRouter);
app.use('/getpintypes', getpintypesRouter);
app.use('/deletepin', deleteRouter);
app.use('/register', registerRouter);
app.use('/verifyemail', verificationRouter);
app.use('/login', loginRouter);
app.use('/check', checkRouter);
app.use('/getusers', getuserRouter);
app.use('/deleteusers', deleteusersRouter);
app.use('/changepass', changepassRouter);
app.use('/approve', approveRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
