const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.json());
//require('./uploadCloudinary.js').setup(app);
require('./src/cors')(app);
require('./src/auth')(app);
require('./src/following')(app);
require('./src/articles')(app);
require('./src/profile')(app);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`);
});
