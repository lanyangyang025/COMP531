const expect = require('chai').expect
const fetch = require('isomorphic-fetch')


const url = path => `http://localhost:3000${path}`

describe('Test Headline Functions', () => {

	it('returns the headline message for the default logged in user', (done) => {
		fetch(url("/headlines"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var headlines = {"username": "yl128","headline": "old headline"}
			expect(body).to.equal(JSON.stringify(headlines))
		})
		.then(done)
		.catch(done)
 	}, 500)



 	it('updates the headline message GET /headlines returns', (done) =>{
 		
 		fetch(url("/headline"),{
 		 	method : "PUT",    
    		headers: {
      		'Content-Type': 'application/json'
    		},
    		body : JSON.stringify({"headline":"new headline"})
  		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(body).to.equal(JSON.stringify({"username":"yl128", "headline" : "new headline"}))
		})

		fetch(url("/headlines"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			expect(body).to.equal(JSON.stringify({"username":"yl128", "headline" : "new headline"}))
		})

		.then(done)
		.catch(done)

 	},500)


	it('returns new headline messages for default user', (done) => {
		fetch(url("/headlines"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var headlines = {"username": "yl128","headline": "new headline"}
			expect(body).to.equal(JSON.stringify(headlines))
		})
		.then(done)
		.catch(done)
 	}, 500) 

 	it('returns headline for requestered user', (done) => {
		fetch(url("/headlines/sep1"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var headlines = [{"username": "sep1","headline": "a headline"}]
			expect(body).to.equal(JSON.stringify(headlines))
		})
		.then(done)
		.catch(done)
 	}, 500)	

})
