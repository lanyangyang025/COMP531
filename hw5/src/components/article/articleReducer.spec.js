const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
import mockery from 'mockery'
import { mock } from 'mock-fetch'
import articleReducer from './articleReducer'

const initialState = {
  btnShowValue: '', 
  articles: {} ,
  searchKeyword: ''
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
      {  btnShowValue: '', articles: {} ,searchKeyword:keyword}
    )
  })

  it('should fetch articles', () => {
    let get_articles =[{_id: 1, author: 'Scott', comments: [] },{_id: 2, author: 'yl128', comments: [] }]
    expect(
      articleReducer(undefined, {type :'GET_ARTICLE',articles:get_articles})
    ).to.eql(
      {  btnShowValue: '', articles:get_articles, searchKeyword: ''}
    )
  })

  it('should add an article', () => {
    let _id='id'
    let add_article ={ id:_id, text: 'add_article', date: '1' }
    expect(
      articleReducer(undefined, {type :'ADD_ARTICLES',article:add_article})
    ).to.eql(
      {  btnShowValue: '', articles:{'id':add_article}, searchKeyword: ''}
    )
  })

})
