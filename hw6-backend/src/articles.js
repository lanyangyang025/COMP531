const articles = [
	{"id":1, "author": 'Scott', "text" :'First post'},{"id":2, "author": 'yl128', "text" :'Second post'},{"id":3, "author": 'yl128test', "text" :'Third post'}
]

const add_article = (req, res) => {
	const item = {"id":articles.length+1, "author": req.body.username||"yl128", "text" :req.body.text || 'A post'}  
	articles.push(item)
	res.send(item)
}

const get_article = (req, res) => {

	if(req.params.id) {
		const arr_articles =[];
		const arr_id = req.params.id.split(',') || req.params.id
		arr_id.forEach((id) => {
			arr_articles.push(articles.filter((article) => {return article.id == id })[0])
		return
		})
		res.send({"articles" : arr_articles})
	}
	else {
		res.send( { "articles" : articles})
	}

}

const put_article = (req, res) => {
	res.send({"id":req.params.id||"1", "author": 'Scott', "text" :'Put post'})
} 

module.exports = app => {

     app.get('/articles/:id*?', get_article)
     app.post('/article', add_article)	
     app.put('/article/id', put_article)

}
