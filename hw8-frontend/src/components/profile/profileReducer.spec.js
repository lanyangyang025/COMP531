const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
import mockery from 'mockery'
import { mock } from 'mock-fetch'
import profileReducer from './profileReducer'

const state_initial={
	  username:'Yiqing Lu',
    avatar: './images/Bottles.jpg',
    zipcode: '12345',
    email: 'yl128@rice.edu',
    phone:'123-234-3456',
    password:'123456',
    confirm:'123456'
}

describe('Test Profile Reducer', () => {
  it('should return the initial state', () => {
    expect(
      profileReducer(undefined, {})
    ).to.eql(
      {
        state_initial
      }
    )
  })
})
