var redis = require('redis').createClient("redis://h:p465b83b1294601e3fdbdd41b3c6b82ad8fa837c9a0e640c644d6e24f9a5c61e2@ec2-34-206-56-122.compute-1.amazonaws.com:35389");
const cookieParser = require('cookie-parser') 
const md5 = require('md5');
var cookieKey = 'sid';

const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

let users = []

const config = {
	clientID:'1373734226023015', 
	clientSecret:'ef72849bb49623087c9c1933a03a4200', 
	callbackURL: 'http://localhost:3000/callback'
}

var sid = 1
function generateSid() {
	sid++
	return sid
}

const login = (req, res) => {
	const username = req.body.username
	const password = req.body.password
	if(!username || !password) {
		res.sendStatus(400)
		return
	}
	var hash="my password"+password
    const userObj = users.filter(r => { return r.username == username })[0]
	if(!userObj || !isAuthorized(req, userObj)) {
		res.sendStatus(401)
		return
	}
	redis.hmset(generateSid(), userObj)
	// cookie lasts for 1 hour
	res.cookie(cookieKey, generateSid(), {MaxAge: 3600*1000, httpOnly: true })

	res.send({ username: username, result: 'success'})
}

const register = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password) {
		res.status(400);
		return;
	}
	let salt = "my password";
	let h1 = md5(salt + password);

	User.users.push({username: username, salt: salt, h1: h1});
	res.status(200);
}


passport.serializeUser(function(user, done){
    users[user.id] = user
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    var user = users[id]
    done(null, user)
})

passport.use(new FacebookStrategy(config,
    function(token, refreshToken, profile, done){
        process.nextTick(function(){
            return done(null,profile)
        })
    })
)

function isLoggedIn(req, res, next){
	var sid = req.cookies[cookieKey];
	if (!sid){
        return res.status(401);
    }
	redis.hgetall(cookieKey, function(err, userObj) {
		console.log(cookieKey + ' mapped to ' + userObj)
		if (userObj) {
			req.username = userObj.username
			next()
		} else {
			res.redirect('/callback')
		}
	})
}

function profile(req,res){
	res.send({'ok now what?':req.user})
}

function fail(req,res){
    res.send({'fail':req.user})
}

function hello(req,res){
    res.send({'hello':''})
}

function logout(req,res){
	req.logout();
	res.redirect('/')
}

module.exports = app => {
	app.post('/login', login)
	app.post('/register', register)


	app.use(session({secret: 'thisismysecret'}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(cookieParser())

	app.use('/auth/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/logout'}))

	app.use('/logout',logout)
	app.use('/profile', isLoggedIn, profile)
}