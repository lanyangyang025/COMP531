const expect = require('chai').expect
const fetch = require('isomorphic-fetch')


const url = path => `http://localhost:3000${path}`

describe('Test Articles Functions', () => {


	it('returns at least three articles', (done) => {
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json()
		})
		.then(res=> {
			return res.articles;
		})
		.then(body => {
			expect(body.length).to.be.above(2)
		})
		.then(done)
		.catch(done)
 	}, 500)

	it('returns a newly added article', (done) => {
		var count, articles;
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json()
		})
		.then(res=> {
			count = res.articles.length;
		})
		fetch(url("/article"),{
			method : "POST",
			headers: {
	      		'Content-Type': 'application/json'
	    		},
			body : JSON.stringify({"text": "a newly added article"})
		})
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			articles = {"id":count+1,"author":"yl128","text":"a newly added article"}
			expect(body).to.equal(JSON.stringify(articles))
		})

		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json()
		})
		.then(res=> {
			expect(res.articles[res.articles.length-1].author).to.equal("yl128")
			expect(res.articles[res.articles.length-1].id).to.equal(count+1)
			expect(res.articles[res.articles.length-1].text).to.equal("a newly added article")
		})
		.then(done)
		.catch(done)
 	}, 500)

 	it('returns the desired article by article id', (done) => {

		fetch(url("/articles/1"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var articles = '{"articles":[{"id":1,"author":"Scott","text":"First post"}]}'
			expect(body).to.equal(articles)
		})
		.then(done)
		.catch(done)
 	}, 500)

	it('should return the articles with multiple id', (done) => {

		fetch(url("/articles/1,2"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var articles = '{"articles":[{"id":1,"author":"Scott","text":"First post"},{"id":2,"author":"yl128","text":"Second post"}]}'
			expect(body).to.equal(articles)
		})
		.then(done)
		.catch(done)
 	}, 500)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/0"))
		.then(res => {
			expect(res.status).to.eql(200);
			return res.json()
		})
		.then(res=> {
			expect(res.articles.text).to.not.be.ok;
		})
		.then(done)
		.catch(done)
	}, 200);


})
