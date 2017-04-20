// this is model.js 
var mongoose = require('mongoose');
require('./db.js');

var commentSchema = new mongoose.Schema({
	commentId: Number, author: String, date: Date, text: String
});

var articleSchema = new mongoose.Schema({
	id: Number, author: String, img: String, date: Date, text: String,
	comments: [ commentSchema ]
});

var headlineSchema = new mongoose.Schema({
	username: String, headline: String
});

var emailSchema = new mongoose.Schema({
	username: String, email: String
});

var zipcodeSchema = new mongoose.Schema({
	username: String, zipcode: String
});

var dobSchema = new mongoose.Schema({
	username: String, dob: String
});

var avatarSchema = new mongoose.Schema({
	username: String, avatar: String
});

var followingSchema = new mongoose.Schema({
	username: String, following: [ String ]
});

var authSchema = new mongoose.Schema({
	username: String, salt: String, h1: String
})


exports.Comment = mongoose.model('comment', commentSchema);
exports.Article = mongoose.model('article', articleSchema);
exports.Headline = mongoose.model('headline', headlineSchema);
exports.Email = mongoose.model('email', emailSchema);
exports.Zipcode = mongoose.model('zipcode', zipcodeSchema);
exports.Dob = mongoose.model('dob', dobSchema);
exports.Avatar = mongoose.model('avatar', avatarSchema);
exports.Following = mongoose.model('following', followingSchema);
exports.User = mongoose.model('user', authSchema);
