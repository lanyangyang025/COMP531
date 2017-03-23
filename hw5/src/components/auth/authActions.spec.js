const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
import mockery from 'mockery'
import { mock } from 'mock-fetch'

describe('Test Auth', (done) => {

	let resource, url, authActions, updateError

	beforeEach(() => {
		if (mockery.enable) {
				mockery.enable({warnOnUnregistered: false, useCleanCache:true})
				mockery.registerMock('node-fetch', fetch)
				require('node-fetch')

  			}
			url = require('../../actions').url
			resource = require('../../actions').resource
			authActions = require('./authActions')
			updateError = require('../../actions').updateError
		})

	afterEach(() => {
  		if (mockery.enable) {
				mockery.deregisterMock('node-fetch')
				mockery.disable()
  			}
		})

	it('should log in a user', (done) => {

			mock(`${url}/login`, { 
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				json : {username : 'yl128' , result : 'success'}
			})

			authActions.login('yl128', 'keep-degree-from')(action => {
				expect(action.type).to.eql('LOGIN')
				done()			
			})

	})

	it('should not log in an invalid user', (done) => {

			mock(`${url}/login`, { 
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				text : 'Unauthorized'
			})

			authActions.login('bad', 'bad')(action => {
				expect(action.type).to.eql('ERROR')
				done()			
			})

	})	

    it('should log out a user (state should be cleared)', (done)=>{
        mock(`${url}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        })

        authActions.logout()((action)=>{
            expect(action).to.eql({type:'LOGIN', username: undefined})
            done()
        })
        
    })

})






	



