
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const get_Headline = (req, res) => {
	res.send({ headlines: [
		 { 
		 	username: req.params.user || 'Scott', 
		 	headline: "my_Headline"
		 }
	]})
}

const put_Headline = (req, res) => {
	res.send({
		username: 'Scott',
		headline: req.body.headline || 'There is no headline'
	})
}

const get_Email = (req, res) => {
	res.send({
		username: req.params.user || 'Scott',
		email: "a@b.co"
	})
}

const put_Email = (req, res) => {
	res.send({
		username: 'Scott',
		email: req.body.email || 'There is no email'
	})
}

const get_Zipcode = (req, res) => {
	res.send({
		username: req.params.user || 'Scott',
		zipcode: "77005"
	})
}

const put_Zipcode = (req, res) => {
	res.send({
		username: 'Scott',
		zipcode: req.body.zipcode || 'There is no zipcode'
	})
}

const get_Avatar = (req, res) => {
	res.send({ avatars :[
		 { 
		 	username: req.params.user || 'Scott', 
		 	avatar: "my_Avatar"
		 }
	]})
}

const put_Avatar = (req, res) => {
	res.send({
		username: 'Scott',
		avatar: req.body.avatar || 'There is no avatar'
	})
}


module.exports = app => {
    app.get('/', index)
    app.get("/headlines/:user?", get_Headline)
    app.put("/headline", put_Headline);
    app.put("/email", put_Email);
    app.get("/email/:user?", get_Email);
    app.get("/zipcode/:user?", get_Zipcode);
    app.put("/zipcode", put_Zipcode);
    app.get("/avatars/:user?", get_Avatar);
    app.put("/avatar", put_Avatar);
}
