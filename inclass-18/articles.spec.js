/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200);	
			return res.json();
		})
		.then(body => {
			expect(body.length).to.be.above(2);
		})
		.then(done).catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		fetch(url("/article"), {
            method:'POST',
            headers:new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({"body":"inclass-18_1"})
        })
		.then(res => {
			expect(res.status).to.eql(200);
			return res.json();				
		})
		.then(res => {
			expect(res.body).to.eql('inclass-18_1');
			return res.id;
		})
		.then((article_id) => {
				fetch(url("/article"), {
		            method:'POST',
		            headers:new Headers({ 'Content-Type': 'application/json' }),
		            body: JSON.stringify({"body":"inclass-18_2"})
        		})
				.then(res => {
					expect(res.status).to.eql(200)	
					return res.json()				
				})	
				.then(res => {
					expect(res.id).to.eql(article_id+1);
					expect(res.body).to.eql("inclass-18_2");
				})
		})
		.then(done).catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		let temp=0;
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200);
			return res.json();				
		})
		.then(res=> {
			temp = res.articles[0].id;
			return fetch(url(`/articles/${temp}`))
		}).then(res=>{
			expect(res.status).to.eql(200);
			return res.json();
		}).then(res=>{
			expect(res.length).to.eql(1);
		}).then(done).catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/0"))
		.then(res => {
			expect(res.status).to.eql(200);
			return res.json();			
		})
		.then(res => {
			expect(res.length).to.eql(0);
		})		
		.then(done)
		.catch(done)
	}, 200);

});