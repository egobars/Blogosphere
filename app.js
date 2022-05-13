var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
require('./db/db')
const User = require('./models/user')
var constants = require('./constants.js');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
var databaseRouter = require('./routes/database');
var settingsRouter = require('./routes/settings');
var userRouter = require('./routes/user');
var createBlogRouter = require('./routes/createBlog');
var blogRouter = require('./routes/blog');

var app = express();

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user){
    err 
      ? done(err)
      : done(null, user);
  });
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: constants.secret }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({username : username}, function(err, user) {
      return err 
        ? done(err)
        : user
          ? password === user.password
            ? done(null, user)
            : done(null, false, { message: 'Incorrect password.' })
          : done(null, false, { message: 'Incorrect username.' });
    });
  })
)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/database', databaseRouter);
app.use('/settings', settingsRouter);
app.use('/user', userRouter);
app.use('/create/blog', createBlogRouter);
app.use('/blog', blogRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
