const cookieParser = require('cookie-parser') 
const md5 = require('md5');

//const FacebookStrategy = require('passport-facebook').Strategy;
//const callbackURL = 'http://localhost:3000/auth/callback'
//const config = { clientID:'325893917793968', clientSecret:'35f25c9c89b0a9d5e0076523e667ef4c', callbackURL };

var redis = require('redis').createClient("redis://h:p30acb65f436c5fb885b7fd182afe328304c6d1e73453013850ae2de6dfb65f47@ec2-34-206-56-122.compute-1.amazonaws.com:38209");

var User = require('./model.js').User;
var Email = require('./model.js').Email;
var Zipcode = require('./model.js').Zipcode;
var Dob = require('./model.js').Dob;
var Avatar = require('./model.js').Avatar;
var Password = require('./model.js').Password;
var Headline = require('./model.js').Headline;
var Following = require('./model.js').Following;

var chars="abcdefghijklmnopqrstuvwxyz";
var avatar_list=new Array('http://img0.imgtn.bdimg.com/it/u=3201493255,1543583049&fm=23&gp=0.jpg',
'http://img2.imgtn.bdimg.com/it/u=913559561,1365184677&fm=23&gp=0.jpg',
'http://img3.imgtn.bdimg.com/it/u=46338774,99738939&fm=23&gp=0.jpg',
'http://img3.imgtn.bdimg.com/it/u=2238255575,4173340898&fm=23&gp=0.jpg',
'http://img5.imgtn.bdimg.com/it/u=2586950312,4052850103&fm=11&gp=0.jpg');

const cookieKey = 'sid';

const register = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const dob = req.body.dob;
	const zipcode = req.body.zipcode;
	var i=Math.ceil(Math.random()*5)-1;
	var avatar = avatar_list[i];
	const headline = "COMP531 programming"
	const password = req.body.password;
	var s=Math.ceil(Math.random()*21);
	var salt=chars.substring(s,s+5);
	const h1 = md5(salt + password);
	const new_user = {username: username, salt: salt, h1: h1};
	User.create(new_user, (err, user) => {
		if (err) return res.status(500).send({ err: err });
		Email.create({username: username, email: email}, (err, email) => {
			if (err) return res.status(500).send({ err: err });
		})
		Zipcode.create({username: username, zipcode: zipcode}, (err, zipcode) => {
			if (err) 
				return res.status(500).send({ err: err });
		})
		Dob.create({username: username, dob: dob}, (err, dob) => {
			if (err) 
				return res.status(500).send({ err: err });
		})
		Avatar.create({username: username, avatar: avatar}, (err, avatar) => {
			if (err) 
				return res.status(500).send({ err: err });
		})
		Headline.create({username: username, headline: headline}, (err, headline) => {
			if (err) 
				return res.status(500).send({ err: err });
		})
		Following.create({username: username, following: []}, (err, following) => {
			if (err) 
				return res.status(500).send({ err: err });
		});
        return res.status(200).send({result: 'success', username: user.username});
    }); 
}

const isAuthorized = (userObj, req) => {
	var salt = userObj.salt;
	var password = req.body.password;
	var h1 = md5(salt + password);
	return (h1 == userObj.h1);
}


const login = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password){
		return res.status(400);	// Bad request
	}
	User.find({username: username}, (err, users) => {
		const userObj = users[0];
		if (!userObj || !isAuthorized(userObj, req)){
			return res.status(401).send({ err: err });	// Unauthorized
		}
		var s=Math.ceil(Math.random()*21);
		var temp=chars.substring(s,s+5);
		const sessionKey = md5(temp + new Date().getTime() + userObj.username);
		redis.hmset(sessionKey, userObj);
		res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true}); // cookie last for an hour
		const msg = {username: username, result: 'success'};
		return res.status(200).send(msg);
	});
}

const isLoggedIn = (req, res, next) => {
	const sid = req.cookies[cookieKey];
	if (!sid){
        return res.status(401).send('Not Authorized');
    }
    redis.hgetall(sid, (error, userObj) => {
    	if(error) {
    		console.error('Error: ${err}');
    	}else if(userObj){
    		req.username = userObj.username;
			return next();
		}else{
			return res.redirect('/login');
		}
    })
}

const logout = (req, res) => {
	const sid = req.cookies[cookieKey];
	redis.del(sid);
	res.clearCookie(cookieKey);
	res.status(200).send("OK");
}

module.exports = app => {
	app.use(cookieParser());
	app.post('/register', register);
	app.post('/login', login);
	app.use(isLoggedIn);
	app.put('/logout', logout);
}

