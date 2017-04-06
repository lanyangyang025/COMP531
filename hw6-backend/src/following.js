const getFollowing  = (req, res) => {
	res.send({username: req.params.user || "yl128", following: ["yl128test","guest"]})
}

const putFollowing = (req, res) => {
	res.send({username: req.params.user || "yl128", following: ["yl128test","guest", req.params.user]})
}

const delFollowing = (req, res) => {
	res.send({username: req.params.user || "yl128", following: [ "yl128test"]})
}

module.exports = app => {
     app.get('/following/:user?', getFollowing)
     app.put('/following/:user',  putFollowing )
     app.delete('/following/:user', delFollowing )
}