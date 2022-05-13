var express = require('express');
const User = require('../models/user')
const Blog = require('../models/blog')
const Post = require('../models/post')
var router = express.Router();

router.get('/:blog', function(req, res, next) {
  var name = req.params['blog'];
  Blog.findOne({unique_id : name}, function(err, blog) {
    if (blog == null) {
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
    Post.find({blog: blog.unique_id}).exec(function (err, list_posts) {
      res.render('blog', {username: blog.creator, my_username: my_username, logged_in: logged_in, my_name: my_name, blog: blog, posts_list: list_posts.reverse(), un_id: "'" + blog.unique_id + "'"});
    });
  });
});

async function update_db(req, res) {
  let update = new Promise((resolve, reject) => {
    var post = new Post({ author: req.user.username, blog: req.body.unique_id, label: req.body.label, text: req.body.text});
    post.save(function(err) {
      if (err) {
        console.log(err);
      }
      resolve();
    });
  });
  let update_result = await(update);
  return update_result;
}

router.post('/', function(req, res, next) {
  update_db(req, res).then((response) => {
    res.status(200).send();
  })
});

module.exports = router;