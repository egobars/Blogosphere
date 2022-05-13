var mongoose = require('mongoose');
var user_connection = require('../db/db.js').user_connection;

var userSchema = mongoose.Schema({
	name: {type: String},
	surname: {type: String},
	username: {type: String},
	password: {type: String},
	description: {type: String},
	image_url: {type: String}
});

const user = user_connection.model('user', userSchema)

module.exports = user;