var express = require('express');
var request = require('request')
const User = require('../models/user')
var router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.user) {
    res.send(401);
    return;
  }
  var username = req.user.username;
  var name = req.user.name;
  var surname = req.user.surname;
  var description = req.user.description;
  var image_url = req.user.image_url;
  res.render('settings', {username: username, name: name, surname: surname, description: description, image_url: image_url, logged_in: true});
});

async function update_db(req, res) {
  var body = {
    image: req.body.image
  }
  if (req.body.image == '-') {
    let update = new Promise((resolve, reject) => {
      User.findByIdAndUpdate({_id: req.user._id}, {
          name: req.body.name,
          surname: req.body.surname,
          description: req.body.description
        }, function(err, result) {
          if (err) {
            console.log(err);
          }
          resolve(result);
      });
    });
    let update_result = await(update);
    return update_result;
  }
  let update = new Promise((resolve, reject) => {
    request.post({ url: 'https://api.imgbb.com/1/upload?key=a083c49cb011575ef83bb09e3c85c2ea', form: { image: req.body.image } }, function (error, response) {
      var p_body = JSON.parse(response.body);
      User.findByIdAndUpdate({_id: req.user._id}, {
          image_url: p_body.data.url,
          name: req.body.name,
          surname: req.body.surname,
          description: req.body.description
        }, function(err, result) {
          if (err) {
            console.log(err);
          }
          resolve(result);
      });
    });
  });
  let update_result = await(update);
  return update_result;
}

router.post('/', function(req, res, next) {
  update_db(req, res).then((response) => {
    res.status(200).send('');
  })
});

module.exports = router;