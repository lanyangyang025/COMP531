var Comment = require('./model.js').Comment;
var Article = require('./model.js').Article;
var Following = require('./model.js').Following;

const md5 = require('md5');

const getArticle = (req, res) => {
	const id = req.params.id;
	const username = req.username;
	Following.find({username: username}).exec(function(err, users){
		if (err) return res.status(500).send({ err: err });
		let following = users[0].following;
		following.push(username);
		Article.find({author: {$in: following}}).exec(function(err, articles){
			if (err) return res.status(500).send({ err: err });
	        let get_articles = {articles: articles};
	        return res.status(200).send(get_articles);
    	});
    });		
}

const putArticle = (req, res) => {
	const articleId = req.params.id;
	const commentId = req.body.commentId;
	const username = req.body.username ? req.body.username : req.username;
	const text = req.body.text || "";
	const date = new Date();
    let articles = {articles: []};
	if (!commentId){					// update article
		Article.findOneAndUpdate({_id: articleId}, { $set: {text: text}}, {new: true})
		.exec(function(err, doc){
			if (err) return res.status(500).send({ err: err });
	        articles.articles.push(doc);
	        return res.status(200).send(articles);
    	}); 
	}else if (commentId != -1){			// update comment
        Comment.update({commentId: commentId}, { $set: { text: text }}, { new: true }, function(err, comments){})
        Article.update({_id: articleId, 'comments.commentId': commentId}, { $set: { 'comments.$.text': text }}, 
        	{ new: true }, function(err, articles){})
        Article.find({_id: articleId}).exec(function(err, articles){
            res.status(200).send({articles: articles})
        })
	}else{								// add new comment

		const newCommentId = Math.floor((Math.random() * 100000000));
        const newComment = new Comment({commentId: newCommentId, author: username, date: date, text: text});

        Article.findOneAndUpdate({_id: articleId}, { $push: {comments: newComment}}, {upsert: true, new: true})
        	.exec(function(err, doc){
	        articles.articles.push(doc);
            return res.status(200).send(articles);
        });
       
	}
}

const postArticle = (req, res) => {
	const username = req.body.username ? req.body.username : req.username;
	const text = req.body.text || "";
	const date = new Date();
	const newarticle_id = Math.ceil((Math.random() * 100000000));
	const newArticle = {id: newarticle_id, text: text, author: username, img: null, date: date, comments:[]};
	Article.create(newArticle, (err, new_article) => {
		if (err) return res.status(500).send({ err: err });
        return res.status(200).send({articles: [new_article]});
    }); 
}


module.exports = (app) => {
	app.get('/articles/:id*?', getArticle);
    app.put('/articles/:id', putArticle);
    app.post('/article', postArticle);
}