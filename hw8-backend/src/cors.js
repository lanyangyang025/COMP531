const enableCORS = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Request-With, X-Session-Id');
    if(req.method === 'OPTIONS') {
    	return res.status(200).send("OK");
    } else {
    	return next();
    }
}

module.exports = app => {
	app.use(enableCORS);
}