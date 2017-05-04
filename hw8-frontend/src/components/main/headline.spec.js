const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
import mockery from 'mockery'
import { mock } from 'mock-fetch'



let resource, url, mainActions

describe('Test Profile headline', () => {


	beforeEach(() => {
  		if (mockery.enable) {
  			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
  			mockery.registerMock('node-fetch', fetch)
  			require('node-fetch')
  		}
      url = require('../../actions').url
      resource = require('../../actions').resource
      mainActions = require('./mainActions')
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
	  	}
	})


  it('should update headline', (done) => {

      const headline = "visiting"
      mock(`${url}/headline`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { headline }
      })
    
      mainActions.getHeadline()(
        fn => fn(action => {
        expect(action).to.eql({ 
          type: actions.UPDATE_HEADLINE
        })
        }))
    done()
  })

})