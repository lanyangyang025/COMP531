const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
import mockery from 'mockery'
import { mock } from 'mock-fetch'
import articleReducer from './articleReducer'

const initialState = { 
  articles: [] ,
  searchKeyword: '',
  comments: []
}

describe('Test Article Reducer', () => {
  it('should return the initial state', () => {
    expect(
      articleReducer(undefined, {})
    ).to.eql(
      initialState
    )
  })

  it('should set the search keyword', () => {
    let keyword ='filter'
    expect(
      articleReducer(undefined, {type :'SEARCH_KEYWORD',keyword})
    ).to.eql(
      {  articles: [] ,searchKeyword:keyword, comments: []}
    )
  })

  it('should fetch articles', () => {
    let get_articles =[{_id: 1, author: 'Scott', comments: [] },{_id: 2, author: 'yl128', comments: [] }]
    expect(
      articleReducer(undefined, {type :'GET_ARTICLE',articles:get_articles})
    ).to.eql(
      { articles:get_articles, searchKeyword: '', comments: []}
    )
  })

})
