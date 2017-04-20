var Following = require('./model.js').Following;
var User = require('./model.js').User;

const getFollowing = (req, res) => {
    const username = req.params.user ? req.params.user : req.username;
	Following.find({username: username}, (err, users) => {
		if (err) return res.status(500).send({ error: error });
        return res.status(200).send({username: users[0].username, following: users[0].following});
    })
}

const putFollowing = (req, res) => {
	const new_user = req.params.user;
	const username = req.body.username ? req.body.username : req.username;
	User.find({username: new_user}, (err, users) => {
		const userObj = users[0];
		if (!userObj){
			return res.status(500).send({ err: err });	
		}
		Following.update({username: username}, { $push: { following: new_user }})
			.then(r=>Following.find({username:username},(err, users) => {
			if (err) return res.status(500).send({ err: err });
	        return res.status(200).send({username: users[0].username, following: users[0].following});
    	})); 
    })
}

const deleteFollowing = (req, res) => {
	const delete_user = req.params.user;
	const username = req.body.username ? req.body.username : req.username;
	Following.update({username: username}, { $pull: { following: delete_user }})
		.then(r=>Following.find({username:username},(err, users) => {
		if (err) return res.status(400).send({ err: err });
        return res.status(200).send({username: users[0].username, following: users[0].following});
	}));  
}

module.exports = app => {
    app.get('/following/:user?', getFollowing);
    app.put('/following/:user', putFollowing);
    app.delete('/following/:user', deleteFollowing);
}