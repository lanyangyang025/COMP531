const express = require('express')
const bodyParser = require('body-parser')

const middleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
  	res.header("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Request");

	if (req.method === 'OPTIONS'){
		res.status(200).send('OK')
	}
	else {
		next()
	}
 }


const app = express()

app.use(bodyParser.json())
app.use(middleware)


require('./profile.js')(app)
require('./auth.js')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
