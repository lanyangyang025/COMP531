const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
import authReducer from './authReducer'


describe('Test Auth Reducer', () => {

  it('should return the initial state', () => {
    expect(
      authReducer(undefined, {})
    ).to.eql(
      { location: 'LANDING_PAGE', error: '', success: ''}
    )
  })


  it('Navigate to LANDING Page', () => {
    expect(
      authReducer(undefined, {type :'GO_INDEX'})
    ).to.eql(
      { location: 'LANDING_PAGE', error: '', success: ''}
    )
  })

  it('Navigate to Profile Page', () => {
    expect(
      authReducer(undefined, {type :'GO_PROFILE'})
    ).to.eql(
      { location: 'PROFILE_PAGE', error: '', success: ''}
    )
  })

  it('Navigate to Main Page', () => {
    expect(
      authReducer(undefined, {type :'GO_MAIN'})
    ).to.eql(
      { location : 'MAIN_PAGE', error: '', success: ''}
    )
  })

  it('should state success (for displaying success message to user)', () => {
    let success='success'
    expect(
      authReducer(undefined, {type :'SUCCESS',success})
    ).to.eql(
      { location: 'LANDING_PAGE', error: '', success:success }
    )
  })

  it('should state error (for displaying error message to user)', () => {
    let error='error'
    expect(
      authReducer(undefined, {type :'ERROR',error})
    ).to.eql(
      { location: 'LANDING_PAGE', error: error, success:'' }
    )
  })

})
