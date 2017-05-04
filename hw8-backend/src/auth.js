const cookieParser = require('cookie-parser') 
const md5 = require('md5');
const session = require('express-session');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = { clientID:'1927081114238967', clientSecret:'d8c49f0a0b8760117324380be02aeb4d', 
	callbackURL: 'https://quiet-caverns-31163.herokuapp.com/facebook/callback', 
	profileFields: ['emails', 'name', 'displayName', 'photos'] };

var redis = require('redis').createClient("redis://h:p17f19eda071fbb83690a1033fbcfd2304d063056786a9bd94b8360948148261a@ec2-34-206-56-163.compute-1.amazonaws.com:42059");

var User = require('./model.js').User;
var Email = require('./model.js').Email;
var Zipcode = require('./model.js').Zipcode;
var Dob = require('./model.js').Dob;
var Avatar = require('./model.js').Avatar;
var Password = require('./model.js').Password;
var Headline = require('./model.js').Headline;
var Following = require('./model.js').Following;

const cookieKey = 'sid';


const isAuthorized = (userObj, req) => {
	const salt = userObj.salt;
	const password = req.body.password;
	const h1 = md5(salt + password);
	return (h1 == userObj.h1);
}

const login = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password){
		return res.sendStatus(400);	// Bad request
	}
	User.find({username: username}, (error, docs) => {
		const userObj = docs[0];
		if (!userObj || !isAuthorized(userObj, req)){
			return res.sendStatus(401);	
		}
		const sessionKey = md5("mysessionkey"+new Date().getTime());
		redis.hmset(sessionKey, userObj); 
		res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true}); 
		const msg = {username: username, result: 'success'};
		return res.status(200).send(msg);
	});
}

const register = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const dob = req.body.dob;
	const zipcode = req.body.zipcode;
	const avatar = "https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/svg/1f61c.svg";
	const headline = "Every day is coding day!"
	const password = req.body.password;
	const salt = md5("myregistersalt"+new Date().getTime());
	const h1 = md5(salt + password);
	const newUser = {username: username, salt: salt, h1: h1};
	User.find({username: username}, (error, docs) => {
		if (error) return res.status(500).send({ error: error });
		if (docs[0]) return res.sendStatus(403); // Forbidden
		User.create(newUser, (error, doc) => {
			if (error) return res.status(500).send({ error: error });
			Email.create({username: username, email: email}, (error, doc) => {
				if (error) return res.status(500).send({ error: error });
			})
			Zipcode.create({username: username, zipcode: zipcode}, (error, doc) => {
				if (error) return res.status(500).send({ error: error });
			})
			Dob.create({username: username, dob: dob}, (error, doc) => {
				if (error) return res.status(500).send({ error: error });
			})
			Avatar.create({username: username, avatar: avatar}, (error, doc) => {
				if (error) return res.status(500).send({ error: error });
			})
			Headline.create({username: username, headline: headline}, (error, doc) => {
				if (error) return res.status(500).send({ error: error });
			})
			Following.create({username: username, following: []}, (error, doc) => {
				if (error) return res.status(500).send({ error: error });
			});

	        return res.status(200).send({result: 'success', username: doc.username});
	    }); 
	});
}



//use Facebook Strategy to login
let users = {};
passport.serializeUser((user, done) => {
	users[user.id] = user;
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	const user = users[id];
	done(null, user);
});

passport.use(new FacebookStrategy(config,
	(token, refreshToken, profile, done) => {
		const username = profile['_json']['first_name']+"_facebook";
		const email = profile['_json']['email'];
		const avatar = profile['_json']['picture']['data']['url'];
		User.find({username: username}, (error, docs) => {
			const userObj = docs[0];
			if(!userObj){
			User.create({username: username}, (error, doc) => {
				if (error) return res.status(500).send({ error: error });
				Email.create({username: username, email: email}, (error, doc) => {
					if (error) return res.status(500).send({ error: error });
				})
				Zipcode.create({username: username, zipcode: 12345}, (error, doc) => {
					if (error) return res.status(500).send({ error: error });
				})
				Dob.create({username: username, dob: "12/12/1994"}, (error, doc) => {
					if (error) return res.status(500).send({ error: error });
				})
				Avatar.create({username: username, avatar: avatar}, (error, doc) => {
					if (error) return res.status(500).send({ error: error });
				})
				Headline.create({username: username, headline: "Facebook login"}, (error, doc) => {
					if (error) return res.status(500).send({ error: error });
				})
				Following.create({username: username, following: []}, (error, doc) => {
					if (error) return res.status(500).send({ error: error });
				});

				})
			};
		})
		return done(null, profile);
	})
)


const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		const username = req.user['_json']['first_name']+"_facebook";
		req.username = username;
		return next();
	}else{
		const sid = req.cookies[cookieKey];
		if (!sid){
	        return res.status(401).send('Not Authorized');
	    }
	    redis.hgetall(sid, (error, userObj) => {
	    	if(error) {
	    		console.error('Error: ${err}');
	    	}else if(userObj){
	    		console.log(sid + ' mapped to ' + userObj.username);
	    		req.username = userObj.username;
				return next();
			}else{
				return res.redirect('/login');
			}
	    })
	}
}

const logout = (req, res) => {
	if (req.isAuthenticated()) {
		req.session.destroy();
		req.logout();
		return res.status(200).send("OK");
	} else{
		const sid = req.cookies[cookieKey];
		redis.del(sid);
		res.clearCookie(cookieKey);
		return res.status(200).send("OK");
	}
}

let url

const findFrontend = (req, res, next) => {
	url = req.headers.referer;
	next();
}

const fbsuccess = (req, res) => {
	res.redirect(url);
}


module.exports = app => {
	app.use(cookieParser());
	app.use(findFrontend);
	app.post('/register', register);
	app.post('/login', login);
	app.use(session({secret:'thisismysecret', resave: false, saveUninitialized: false}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use('/facebook/login', passport.authenticate('facebook', {scope: 'email'}));
	app.use('/facebook/callback', passport.authenticate('facebook', {successRedirect: '/fbsuccess', failureRedirect:'/fail'}));
	app.use('/fbsuccess', fbsuccess);
	app.use(isLoggedIn);
	app.put('/logout', logout);
}