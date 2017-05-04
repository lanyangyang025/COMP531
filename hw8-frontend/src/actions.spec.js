const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
import mockery from 'mockery'
import { mock } from 'mock-fetch'

describe('Test actions', (done) => {

	let resource, url,updateError, updateSuccess,goToIndex,goToProfile,goToMain

	beforeEach(() => {
		if (mockery.enable) {
				mockery.enable({warnOnUnregistered: false, useCleanCache:true})
				mockery.registerMock('node-fetch', fetch)
				require('node-fetch')
  			}
			url = require('./actions').url
			resource = require('./actions').resource
			updateError = require('./actions').updateError
			updateSuccess = require('./actions').updateSuccess
			goToIndex = require('./actions').goToIndex
			goToProfile = require('./actions').goToProfile
			goToMain = require('./actions').goToMain
		})

	afterEach(() => {
  		if (mockery.enable) {
				mockery.deregisterMock('node-fetch')
				mockery.disable()
  			}
		})

	it('resource should be a resource (i.e., mock a request)', (done)=> {
		mock(`${url}/login`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
		})

		resource('GET', 'sample').then((res) => {
			expect(res).to.exist
			
		})
		done()
	})

	it('resource should give me the http error', (done)=> {
		const username = 'bad'
		const password = 'bad'
		
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})

		resource('POST', 'login', {username, password}).catch((err) => {
			expect(err).to.exist
			
		})
		done()
	})

	it('resource should be POSTable', (done)=> {
		const username = 'yl128'
		const password = 'keep-degree-from'
		
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})

		resource('POST', 'login', {username, password }).then((res) => {
			expect(res).to.eql({username: "yl128", result: "success"})	
		})
		done()
	})

    it('should update error message (for displaying error mesage to user)', (done)=> {
		const expect_error = {
			type: 'ERROR',
			error: 'error'
		}
		expect(updateError('error')).to.eql(expect_error);
		done()
	})

	it('should update success message (for displaying success message to user)', (done)=> {
		const expect_success = {
			type: 'SUCCESS',
			success: 'success'
		}
		expect(updateSuccess('success')).to.eql(expect_success);
		done()
	})

	it('should navigate to landing)', (done)=> {
		const expect_landing = {
			type: 'GO_INDEX',
		}
		expect(goToIndex()).to.eql(expect_landing);
		done()
	})

	it('should navigate to profile)', (done)=> {
		const expect_profile = {
			type: 'GO_PROFILE',
		}
		expect(goToProfile()).to.eql(expect_profile);
		done()
	})

	it('should navigate to main)', (done)=> {
		const expect_main = {
			type: 'GO_MAIN',
		}
		expect(goToMain()).to.eql(expect_main);
		done()
	})

})






	



