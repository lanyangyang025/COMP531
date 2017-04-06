const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
require('./articles.js')(app)
require('./profile.js')(app)
require('./auth.js')(app)
require('./following.js')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
