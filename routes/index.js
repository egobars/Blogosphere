var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let name, surname, username;
  let logged_in;
  if (req.user) {
    username = req.user.username;
    name = req.user.name;
    surname = req.user.surname;
    logged_in = true;
  } else {
    name = "Гость"
    logged_in = false;
  }
  res.render('index', { username: username, name: name, surname: surname, logged_in: logged_in });
});

module.exports = router;
