var express = require('express');
const User = require('../models/user')
const Blog = require('../models/blog')
var router = express.Router();

router.get('/:username', function(req, res, next) {
  var username = req.params['username'];
  User.findOne({username : username}, function(err, user) {
    if (user == null) {
      res.send(404);
      return;
    }
    var my_name;
    var my_username;
    var logged_in;
    if (req.user) {
      my_name = req.user.name;
      my_username = req.user.username;
      logged_in = true;
    } else {
      name = "Гость"
      logged_in = false;
    }
    Blog.find({creator: username}).exec(function (err, list_blogs) {
      res.render('user', {username: username, my_username: my_username, name: user.name, surname: user.surname, description: user.description, image_url: user.image_url, logged_in: logged_in, my_name: my_name, blogs_list: list_blogs});
    });
  });
});

module.exports = router;