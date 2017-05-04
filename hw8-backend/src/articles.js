'use strict'

const md5 = require('md5');
const cloudinary = require('cloudinary');
const multer = require('multer');

var Comment = require('./model.js').Comment;
var Article = require('./model.js').Article;
var Following = require('./model.js').Following;

const uploadImage = require('./uploadCloudinary');


const getArticle = (req, res) => {
	const id = req.params.id;
    if(id){
		Article.findById(id, (error, doc) => {
			if (!doc) return res.sendStatus(403);
            if (error) return res.status(500).send({ error: error });
            res.status(200).send({articles: doc});
	   });
	}else{
	const username = req.username;
	Following.find({username: username}).exec(function(err, users){
		if (err) return res.status(500).send({ err: err });
		let following = users[0].following;
		following.push(username);
		Article.find({author: {$in: following}}).limit(10).sort({date: -1}).exec(function(err, articles){
			if (err) return res.status(500).send({ err: err });
	        let get_articles = {articles: articles};
	        return res.status(200).send(get_articles);
    	});
    });
    }
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
	//console.log(req);
	const username = req.username;
	const date = new Date();
	const newArticleId = date.getTime() + Math.floor((Math.random() * 100000023) + 1);
	const text = req.body.text || "";
	let img = null;
	if (req.fileurl){
	   	const image = cloudinary.image(req.fileid, {
	       format: "png", width: 100, height: 130, crop: "fill" 
		});
	   	img = req.fileurl;
   	}
	const newArticle = {id: newArticleId, text: text, author: username, img: img, date: date, comments:[]};
	Article.create(newArticle, (err, new_article) => {
		if (err) return res.status(500).send({ err: err });
        return res.status(200).send({articles: [new_article]});
    }); 
}


module.exports = (app) => {
	app.get('/articles/:id*?', getArticle);
    app.put('/articles/:id', putArticle);
    app.post('/article', uploadImage('img'), postArticle);
}