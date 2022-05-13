const mongoose = require('mongoose');
var constants = require('../constants.js');

var user_connection = mongoose.createConnection(constants.user_connection_url);
var blog_connection = mongoose.createConnection(constants.blog_connection_url);
var post_connection = mongoose.createConnection(constants.post_connection_url);


module.exports = {
	user_connection: user_connection,
	blog_connection: blog_connection,
	post_connection: post_connection
}