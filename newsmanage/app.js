/*
 * @Author: fangzhigang 
 * @Date: 2020-11-01 21:56:19 
 * @Last Modified by: fangzhigang
 * @Last Modified time: 2020-11-02 22:08:16
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/apis');

//连接数据库代码
mongoose.connect('mongodb://localhost/fang');

mongoose.connection.on('connected',()=>console.log('连接数据库成功'));
mongoose.connection.on('error',(err)=>console.log(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

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

app.listen(8080,()=>console.log(8080));
