const profile = {
	"username" : "yl128",
	"headline" : "old headline",
	"email" : "yl128@rice.edu",
	"zipcode" : "77005",
	"avatar" : "1.jpg",
}


const get_headlines = (req, res) => {
	if(req.params.user) {
		let arr_user = req.params.user.split(',')  	
		let headlines=arr_user.map((user) => ({
			username: user,
			headline: user === profile.username? profile.headline : 'a headline'
		}))
		res.send(headlines)
	}
	else {
		res.send({"username" : profile.username, "headline": profile.headline})	
	}	
}	

const put_headline = (req, res) => {
	profile.headline=req.body.headline
	res.send({"username" : profile.username, "headline": profile.headline})
}


const get_email = (req, res) => {
	
	if(req.params.user && req.params.user !== profile.username){
		res.send({
			username: req.params.user,
			email : req.params.user+'@rice.edu'
		})
	}
	else {
		res.send({username : profile.username, email : profile.email})
	}
	
}

const put_email = (req, res) => {
	res.send({
		username: profile.username,
		email: req.body.email || profile.email
	
	})
}

const get_zipcode = (req, res) => {
	if(req.params.user && req.params.user !== profile.username){
		res.send({
			   username: req.params.user,
			   zipcode: '54321'	
			})
	}
	else {
		res.send({username : profile.username, zipcode : profile.zipcode})
	}		
			
}

const put_zipcode = (req, res) => {
	res.send({
			username: profile.username,
			zipcode : req.body.zipcode || profile.zipcode
		
		})
	} 

const get_avatars = (req, res) => {
	if(req.params.user){
		 var arr_user = req.params.user.split(',')
		 res.send({ avatars : arr_user.map((user) => ({
				username: user,
				avatar: user === profile.username? profile.avatar : avatar
				}))
		})
	}
	else {
		res.send({"username" : profile.username, "avatar": profile.avatar})	
	}

}	


const put_avatar = (req, res) => {
	res.send({
			username: profile.username,
			avatar : req.body.avatar || profile.avatar	
		})
}


const get_dob = (req, res) => {
	res.send({username: "yl128", dob : "12/12/1994" })
} 


module.exports = app => {
     app.put('/headline', put_headline)
     app.get('/headlines/:user*?', get_headlines)
     app.put('/email', put_email)
     app.get('/email/:user?', get_email)
     app.put('/zipcode', put_zipcode)
     app.get('/zipcode/:user?', get_zipcode)
     app.put('/avatar', put_avatar)
     app.get('/avatars/:user*?', get_avatars)
     app.get('/dob', get_dob)	
}








