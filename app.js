require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const responseFormatter = require('./helpers/responseFormatter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const uri = process.env.MONGO_URI;

const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_CONTAINER_NAME}/${process.env.MONGO_INITDB_DATABASE}?authMechanism=SCRAM-SHA-1&authSource=admin`;
// const uri = `mongodb://rootuser:rootpass@localhost:27017/sejuta_cita?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
const option = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}
mongoose.connect(uri, option, (err) => {
    if (err) {
        console.log('could\'t connect to Mongo DB ', err);
    }
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use('/', indexRouter);
app.get('/ping', (req, res, next) => {
  return responseFormatter.success({res, message: 'pong'})
})
app.use('/users', usersRouter);

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

const port = process.env.PORT || 4500;
app.listen(port, () => console.log(`listen on ${port}`));

module.exports = app;
