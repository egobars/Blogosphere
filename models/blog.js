var mongoose = require('mongoose');
var blog_connection = require('../db/db.js').blog_connection;

var blogSchema = mongoose.Schema({
	unique_id: {type: String},
	creator: {type: String},
	name: {type: String},
	description: {type: String}
});

const blog = blog_connection.model('blog', blogSchema)

module.exports = blog;