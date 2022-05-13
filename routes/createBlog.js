var express = require('express');
var request = require('request')
const Blog = require('../models/blog')
var router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.user) {
    res.send(401);
    return;
  }
  var username = req.user.username;
  var name = req.user.name;
  var surname = req.user.surname;
  res.render('createBlog', {username: username, name: name, surname: surname, logged_in: true});
});

async function update_db(req, res) {
  let get_count = new Promise((resolve, reject) => {
    Blog.count({}, function(err, count){
      resolve(count);
    });
  });
  let count = await(get_count);
  let update = new Promise((resolve, reject) => {
    var blog = new Blog({ unique_id: count.toString() + req.body.name.replace(/ /g,''), creator: req.user.username, name: req.body.name, description: req.body.description});
    blog.save(function(err) {
      if (err) {
        console.log(err);
      }
      resolve(blog.unique_id);
    });
  });
  let update_result = await(update);
  return update_result;
}

router.post('/', function(req, res, next) {
  update_db(req, res).then((response) => {
    res.status(200).send(response);
  })
});

module.exports = router;