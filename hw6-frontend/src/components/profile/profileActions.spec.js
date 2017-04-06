const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
import mockery from 'mockery'
import { mock } from 'mock-fetch'


let resource, url, profileActions

describe('Test Profile', () => {


	beforeEach(() => {
  		if (mockery.enable) {
  			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
  			mockery.registerMock('node-fetch', fetch)
  			require('node-fetch')
  		}
      url = require('../../actions').url
      resource = require('../../actions').resource
      profileActions = require('./profileActions')
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
	  	}
	})

  it('should fetch the user email information', (done) => {

      const email = "a@b.co"
      mock(`${url}/email`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { email }
      })
    
      profileActions.getEmail()(
        fn => fn(action => {
        expect(action).to.eql({ 
          type: actions.UPDATE_EMAIL
        })
        }))
    done()
  })

  it('should fetch the user zipcode information', (done) => {

      const zipcode = "a@b.co"
      mock(`${url}/zipcode`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { zipcode }
      })
    
      profileActions.getZipcode()(
        fn => fn(action => {
        expect(action).to.eql({ 
          type: actions.UPDATE_ZIPCODE
        })
        }))
    done()
  })

})