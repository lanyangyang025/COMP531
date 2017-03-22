const express = require('express')
const bodyParser = require('body-parser')

var articles = {article:[
		{ id:1, author: 'Scott', text:'First post'}, 
  	{ id:2, author: 'Apple', text:'Second post' }, 
  	{ id:3, author: 'Banana', text:'Third post' }]}

const getArticle = (req, res) => {
	if(req.params.id !== undefined){
    	res.send(articles.article.filter((r) =>{return r.id === req.params.id}));
    }else{
    	res.send(articles);
    }
}


const addArticle = (req, res) => {
    console.log('Payload received', req.body) 
    var _id=articles.article.length + 1;
    articles.article.push({id:_id, author: 'Lemon', text: req.body.body});  
    res.send({id:_id, author: 'Lemon', text: req.body.body});
}

const app = express();
app.use(bodyParser.json());
app.get('/articles/:id?', getArticle);
app.post('/article', addArticle);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})