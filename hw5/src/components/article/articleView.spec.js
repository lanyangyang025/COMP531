const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
import mockery from 'mockery'
import  { mock } from 'mock-fetch'

describe('Test AritcleView', () => {

	let articleActions,url

	beforeEach(() => {
		if (mockery.enable) {
				mockery.enable({warnOnUnregistered: false, useCleanCache:true})
				mockery.registerMock('node-fetch', fetch)
				require('node-fetch')

  			}
            url = require('../../actions')
            articleActions = require('./articleActions')
		})

	afterEach(() => {
  		if (mockery.enable) {
				mockery.deregisterMock('node-fetch')
				mockery.disable()
  			}
		})

    it('should fetch articles (mocked request)', (done)=>{
        mock(`${url}/articles`,{
            method:'GET',
            headers: {'Content-Type':'application/json'},
            json: { articles: [{_id: 1, author: 'Scott', comments: [] },{_id: 2, author: 'yl128', comments: [] }]}
        })

        articleActions.getArticle()(action => {
            expect(action).to.satisfy((action)=>{
                    action.articles['1'].author == 'Scott' && action.articles['2'].author == 'yl128'
                })
            })
        .then(done())
    })

    it('should dispatch actions to create a new article', (done)=>{
        mock(`${url}/articles`,{
            method:'GET',
            headers: {'Content-Type':'application/json'},
            json: { articles: [{_id: 2, author: 'yl128', comments: [] }]}
        })

        articleActions.addArticle()(action => {
        	expect(action).to.satisfy((action)=>{
                    return action.type=='ADD_ARTICLES' && action.articles['2'].author == 'yl128'
                })
            })
        .then(done())
    })

})	
