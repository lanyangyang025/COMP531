var cookieParser = require('cookie-parser') 
const md5 = require('md5')

var cookieKey = 'sid'
var user=[]
var chars="abcdefghijklmnopqrstuvwxyz"

const register = (req, res) => {
	var username_1 = req.body.username
	var password_1 = req.body.password
	var s=Math.ceil(Math.random()*21);
	var salt=chars.substring(s,s+5);
	var password_new=md5(salt+password_1);
	user.push({"username": req.body.username, "salt": salt, "hash": password_new});
	res.send({"username": req.body.username, "salt": salt, "hash": password_new});
}

const login = (req, res) => {
	var result =  user.find(function(user) {
		if(user.username === req.body.username)
			{
				return user.hash === md5(user.salt+req.body.password);	
		}
		else {
			return false;
		}		
	});

	if(typeof(result)==='object') {
		var s=Math.ceil(Math.random()*21);
		res.cookie(cookieKey, chars.substring(s,s+5),{maxAge: 3600*1000, httpOnly: true})
		var msg = { username: user.username, result: 'success'}
		res.send(msg)			
	}else { 
		res.sendStatus(401);
	}
}


module.exports = app => {
     app.post('/register/', register);
     app.post('/login', login);	
}
