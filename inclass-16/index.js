
const express = require('express')
const bodyParser = require('body-parser')

const articles_temp = [
		{ id:1, author: 'Scott', text:'A post'}, 
      	{ id:2, author: 'Max', text:'This is Max post' }, 
      	{ id:3, author: 'Yiqing', text:'This is Yiqing post' }
        ]

const addArticle = (req, res) => {
     console.log('Payload received', req.body) 
     articles_temp.push({id:articles_temp.length+1, author: 'New Author', text: req.body}); 
     let new_article=[{id:articles_temp.length, author: 'New Author', text: req.body}]
     res.send({articles: new_article})
}

const getArticle = (req, res) => {
     console.log('Payload got', req.body)    
     res.send({articles:articles_temp})
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/article', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
