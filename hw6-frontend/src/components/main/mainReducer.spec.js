const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
import mockery from 'mockery'
import { mock } from 'mock-fetch'
import mainReducer from './mainReducer'

const followers = {
	followers: {} 
}

const articles = {
	articles: {}, 
	searchKeyword: '', 
	avatars: {}
}

const headlines={
    headline: ''
}

describe('Test Main Reducer', () => {
  it('should return the initial state', () => {
    expect(
      mainReducer(undefined, {})
    ).to.eql(
      {
        followers,articles,headlines
  
      }
    )
  })


  it('should set headline', () => {
  	let headline='headline'
    expect(
      mainReducer(undefined, {type :'UPDATE_HEADLINE', headline})
    ).to.eql(
      { followers, articles, headlines:{headline}}
    )
  })


})
