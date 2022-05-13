var express = require('express');
var passport = require('passport');
const User = require('../models/user')

var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.post( '/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
)

module.exports = router;