var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.user) {
    res.redirect("/");
  } else {
    req.logout();
    res.redirect("/");
  }
});

module.exports = router;