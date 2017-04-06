const expect = require('chai').expect
const fetch = require('isomorphic-fetch')


const url = path => `http://localhost:3000${path}`

describe('Validate Profile Functions', () => {

	it('returns default email for requested user, or default user', (done) => {
		fetch(url("/email/yl128"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var email = {"username": "yl128","email": "yl128@rice.edu"}
			expect(body).to.equal(JSON.stringify(email))
		})
		.then(done)
		.catch(done)
 	}, 500)

 	it('updates email value for default user', (done) => {
		fetch(url("/email"),{
 		 	method : "PUT",    
    		headers: {
      		'Content-Type': 'application/json'
    		},
    		body : JSON.stringify({"email":"a@b.co"})
  		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(body).to.equal(JSON.stringify({username:"yl128", email:"a@b.co"}))
		})
		.then(done)
		.catch(done)

 	},500)

	it('returns default zipcode for requested user, or default user', (done) => {
		fetch(url("/zipcode/yl128"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var zipcode = {"username": "yl128","zipcode": "77005"}
			expect(body).to.equal(JSON.stringify(zipcode))
		})
		.then(done)
		.catch(done)
 	}, 500)

 	it('updates zipcode value for default user', (done) => {
		fetch(url("/zipcode"),{
 		 	method : "PUT",    
    		headers: {
      		'Content-Type': 'application/json'
    		},
    		body : JSON.stringify({"zipcode":"12345"})
  		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(body).to.equal(JSON.stringify({username:"yl128", zipcode:"12345"}))
		})
		.then(done)
		.catch(done)

 	},500)

 	it('returns default avatar url for requested user, or default user', (done) => {
		fetch(url("/avatars/yl128"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			var avatar = {"avatars":[{"username":"yl128","avatar":"1.jpg"}]}
			expect(body).to.equal(JSON.stringify(avatar))
		})
		.then(done)
		.catch(done)
 	}, 500)

 	it('updates avatar value for default user', (done) => {
		fetch(url("/avatar"),{
 		 	method : "PUT",    
    		headers: {
      		'Content-Type': 'application/json'
    		},
    		body : JSON.stringify({"avatar":"new.jpg"})
  		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(body).to.equal(JSON.stringify({username:"yl128", avatar:"new.jpg"}))
		})
		.then(done)
		.catch(done)

 	},500)


})
