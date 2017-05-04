const md5 = require('md5');
const cloudinary = require('cloudinary');

var Headline = require('./model.js').Headline;
var Email = require('./model.js').Email;
var Zipcode = require('./model.js').Zipcode;
var Dob = require('./model.js').Dob;
var Avatar = require('./model.js').Avatar;
var User = require('./model.js').User;

const uploadImage = require('./uploadCloudinary');

const getHeadlines = (req, res) => {
    const users = req.params.users ? req.params.users.split(',') : [req.username];
	Headline.find({username: {$in: users}}, (error, docs) => {
		if (!docs[0]) return res.sendStatus(403);
		if (error) return res.status(500).send({ error: error });
        let headlines = {headlines: []};
        docs.forEach(doc => {headlines.headlines.push({username: doc.username, headline: doc.headline})});
        return res.status(200).send(headlines);
    })
}

const putHeadline = (req, res) => {
	const username = req.username;
	const headline = req.body.headline || "";
	Headline.update({username: username}, {headline: headline}, (error, doc) => {
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send({username: username, headline: headline});
    }) 
}


const getEmail= (req, res) => {
    const username = req.username;
	Email.find({username: username}, (error, docs) => {
		if (!docs[0]) return res.sendStatus(403);
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send({username: docs[0].username, email: docs[0].email});
    })
}

const putEmail = (req, res) => {
	const username = req.username;
	const email = req.body.email || "";
	Email.update({username: username}, {email: email}, (error, doc) => {
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send({username: username, email: email});
    }) 
}

const getZipcode= (req, res) => {
    const username = req.username;
	Zipcode.find({username: username}, (error, docs) => {
		if (!docs[0]) return res.sendStatus(403);
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send({username: docs[0].username, zipcode: docs[0].zipcode});
    })
}

const putZipcode = (req, res) => {
	const username = req.username;
	const zipcode = req.body.zipcode || "";
	Zipcode.update({username: username}, {zipcode: zipcode}, (error, doc) => {
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send({username: username, zipcode: zipcode});
    }) 
}

const getDob= (req, res) => {
    const username = req.username;
	Dob.find({username: username}, (error, docs) => {
		if (!docs[0]) return res.sendStatus(403);
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send({username: docs[0].username, dob: docs[0].dob});
    })
}

const putPassword = (req, res) => {
	const username = req.username;
	const password = req.body.password || "";
	const salt = md5("Password " + " for " + username + " is: ");
	const h1 = md5(salt + password);
	User.update({username: username}, {salt: salt, h1: h1}, (error, doc) => {
		if (error) return res.status(500).send({ error: error });
        return res.status(200).send({username: username, status: "password updated"});
    }) 
}

const getAvatars = (req, res) => {
    const users = req.params.users ? req.params.users.split(',') : [req.username];
	Avatar.find({username: {$in: users}}, (error, docs) => {
		if (!docs[0]) return res.sendStatus(403);
		if (error) return res.status(500).send({ error: error });
        let avatars = {avatars: []};
        docs.forEach(doc => {avatars.avatars.push({username: doc.username, avatar: doc.avatar})});
        return res.status(200).send(avatars);
    })
}

const putAvatar = (req, res) => {
	const username = req.username;
	if (req.fileurl == '' || req.fileurl == null) return res.status(401).send("Error when upload avatar");
   	const image = cloudinary.image(req.fileid, {
       format: "png", width: 100, height: 130, crop: "fill" 
	});
    Avatar.update({username: username}, {avatar: req.fileurl}, (error, doc) => {
		if (error) return res.status(500).send({ error: error });
   		return res.status(200).send({username: req.username, avatar: req.fileurl});
   	});
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
	 app.put('/avatar', uploadImage('avatar'), putAvatar);
}
