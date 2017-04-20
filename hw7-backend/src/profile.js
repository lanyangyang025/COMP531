var Headline = require('./model.js').Headline;
var Email = require('./model.js').Email;
var Zipcode = require('./model.js').Zipcode;
var Dob = require('./model.js').Dob;
var Avatar = require('./model.js').Avatar;
var User = require('./model.js').User;
var chars="abcdefghijklmnopqrstuvwxyz";


const md5 = require('md5');


const getHeadlines = (req, res) => {
    const user_list = req.params.users ? req.params.users.split(',') : [req.body.username ? req.body.username : req.username];
	Headline.find({username: {$in: user_list}}).exec(function(err, users){
		if (err) return res.status(500).send({ err: err });
        let headlines = {headlines: []};
        users.forEach(user => {headlines.headlines.push({username: user.username, headline: user.headline})});
        return res.status(200).send(headlines);
    })
}

const putHeadline = (req, res) => {
	const username = req.body.username ? req.body.username : req.username;
	const headline = req.body.headline || "";
	Headline.update({username: username}, {headline: headline}, function(error, doc){
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send({username: username, headline: headline});
    }) 
}

const getEmail= (req, res) => {
    const username = req.params.user;
	Email.find({username: username}).exec(function(err, users){
		if (err) return res.status(500).send({ err: err });
        return res.status(200).send({username: users[0].username, email: users[0].email});
    })
}

const putEmail = (req, res) => {
	const username = req.body.username ? req.body.username : req.username;
	const email = req.body.email || "";
	Email.update({username: username}, {email: email}, function(err, email){
		if (err) return res.status(500).send({ err: err });
		put_email={username: username, email: email};
        return res.status(200).send(put_email);
    }) 
}

const getZipcode= (req, res) => {
	const username = req.body.username ? req.body.username : req.username;
	Zipcode.find({username: username}).exec(function(err, users){
		if (err) return res.status(500).send({ err: err });
        return res.status(200).send({username: users[0].username, zipcode: users[0].zipcode});
    })
}

const putZipcode = (req, res) => {
	const username = req.body.username ? req.body.username : req.username;
	const zipcode = req.body.zipcode || "";
	Zipcode.update({username: username}, {zipcode: zipcode}, function(err, zipcode){
		if (err) return res.status(500).send({ err: err });
		put_zipcode={username: username, zipcode: zipcode};
        return res.status(200).send(put_zipcode);
    }) 
}

const getDob= (req, res) => {
	const username = req.body.username ? req.body.username : req.username;
	Dob.find({username: username}).exec(function(err, users){
		if (err) return res.status(500).send({ err: err });
        return res.status(200).send({username: users[0].username, dob: users[0].dob});
    })
}

const putPassword = (req, res) => {
	const username = req.body.username ? req.body.username : req.username;
	const password = req.body.password || "";
	var s=Math.ceil(Math.random()*21);
	var temp=chars.substring(s,s+5);
	var salt = md5(temp + username);
	const h1 = md5(salt + password);
	User.update({username: username}, {salt: salt, h1: h1}, function(err, doc){
		if (err) return res.status(500).send({ err: err });
        return res.status(200);
    }) 
}

const getAvatars = (req, res) => {
    const user_list = req.params.users ? req.params.users.split(',') : [req.body.username ? req.body.username : req.username];
	Avatar.find({username: {$in: user_list}}).exec(function(err, users) {
		if (err) return res.status(500).send({ err: err });
        let avatars = {avatars: []};
        users.forEach(user => {avatars.avatars.push({username: user.username, avatar: user.avatar})});
        return res.status(200).send(avatars);
    })
}

const putAvatar = (req, res) => {
	const username = req.body.username ? req.body.username : req.username;
	Avatar.update({username:req.username},{$set:{'avatar':req.fileurl}},function(err, avatar){ 
			res.send({
				username: req.username,
				avatar : req.fileurl
		})
	})
}

module.exports = app => {
     app.get('/headlines/:users?', getHeadlines);
     app.put('/headline', putHeadline);
     app.get('/email/:user?', getEmail);
     app.put('/email', putEmail);
     app.get('/zipcode/:user?', getZipcode);
     app.put('/zipcode', putZipcode);
     app.get('/dob', getDob);
     app.put('/password', putPassword);
     app.get('/avatars/:users?', getAvatars);
	 app.put('/avatar', putAvatar);
}
