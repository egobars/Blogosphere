var mongoose = require('mongoose');
var post_connection = require('../db/db.js').post_connection;

var postSchema = mongoose.Schema({
	author: {type: String},
	blog: {type: String},
	label: {type: String},
	text: {type: String}
});

const post = post_connection.model('post', postSchema)

module.exports = post;