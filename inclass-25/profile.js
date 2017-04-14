const uploadImage = require('./uploadCloudinary')

const profile = {
"username" : "yl128",
"headline" : "my headline",
"email" : "yl128@rice.com",
"zipcode" : "77005",
"avatar" : "1.jpg"
}



const getHeadlines = (req, res) => {
	if(req.params.user) {
	 var userList = req.params.user.split(',')  
	 var user_headlines=userList.map((user) => ({
				username: user,
				headline: user === profile.username? profile.headline : 'headline'
				}))	
	 res.send({ headlines: user_headlines})
	}
	else {
		res.send({"username" : profile.username, "headline": profile.headline})	
	}	
}	



const putHeadline = (req, res) => {
	profile.headline = req.body.headline;
	res.send({"username" : profile.username, "headline": profile.headline})
}


const getEmail = (req, res) => {
	if(req.params.user!==profile.email){
		res.send({
			username: req.params.user ? req.params.user : 'yl128',
			email : 'user'+req.params.user+'@email.com'
		})
	}
	else {
		res.send({username : profile.username, email : profile.email})
	}
	
}

const putEmail = (req, res) => {
	profile.email = req.body.email? req.body.email : profile.email 
	res.send({
		username: profile.username,
		email: req.body.email || 'No Email'
	})
}

const getZipcode = (req, res) => {
	if(req.params.user !== profile.user){
	res.send({
		   username: req.params.user ? req.params.user : 'yl128',
		   zipcode: '12345'	
		})
	}
	else {
		res.send({username : profile.username, zipcode : profile.zipcode})
	}		
			
}

const putZipcode = (req, res) => {
	profile.zipcode = req.body.zipcode? req.body.zipcode : profile.zipcode
	res.send({
			username: profile.username,
			zipcode : req.body.zipcode || 'No zipcode'
		
		})
	} 


const getAvatars = (req, res) => {
	if(req.params.user){
		var avatarList = req.params.user.split(',')
		var get_avatars= avatarList.map((avatar) => ({
			username: 'SomeUser'+avatar,
			avatar: avatar === profile.username?profile.avatar : avatar
			}))
		res.send({ avatars : get_avatars})
	}
	else {
		res.send({"username" : profile.username, "avatar": profile.avatar})	
	}

}	

const putAvatar = (req, res) => {
	profile.avatar = req.fileurl? req.fileurl : profile.avatar
	res.send({
			username: profile.username,
			avatar : req.fileurl || 'No Avatar'
		})
}


const getDob = (req, res) => {
	res.send({username: "yl128", dob : "12/12/1994" })
} 


module.exports = app => {
     app.put('/headline', putHeadline)
     app.get('/headlines/:user*?', getHeadlines)
     app.put('/email', putEmail)
     app.get('/email/:user?', getEmail)
     app.put('/zipcode', putZipcode)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/avatar', uploadImage('avatar'), putAvatar)
     app.get('/avatars/:user*?', getAvatars)
     app.get('/dob', getDob)
	
}
