const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const cookieParser = require('cookie-parser')
const session = require('express-session')
const users = []

const config = {
	clientID:'1373734226023015', 
	clientSecret:'ef72849bb49623087c9c1933a03a4200', 
	callbackURL: 'http://localhost:3000/callback'
}


const login = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password) {
		res.status(400);
		return;
	}
	res.status(200);
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
	if(req.isAuthenticated()){
		next()
	}
	else{
		res.redirect('/callback')
	}
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