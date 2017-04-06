import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import landing from './landing'

describe('Test Profile Page', () => {

    before('should log in', (done) => {
        go().then(landing.login).then(done)
    })

    it("Update user email and verify", (done) => {
        sleep(500)
        .then(findId('maintopro').click())
        .then(sleep(500))

        sleep(500)
        .then(findId('pro_email').sendKeys('yl128@rice.edu'))
        .then(findId('update_profile_button').click())
        .then(sleep(1000))
        .then(findId('profile_email').getText()
        .then(text=>{
            expect(text).to.eql('yl128@rice.edu')
        }))
        .then(done)
    })

    it("Update user zipcode and verify", (done) => {
        sleep(500)
        .then(findId('pro_zipcode').sendKeys(12345))
        .then(findId('update_profile_button').click())
        .then(sleep(2000))
        .then(findId('profile_zipcode').getText()
        .then(text=>{
            expect(parseInt(text)).to.eql(12345)
        }))
        .then(done)
    })

    it("Update user password and verify", (done) => {
        sleep(500)
        
        .then(findId('pro_password').sendKeys('new_password'))
        .then(findId('pro_confirm').sendKeys('new_password'))
        .then(findId('update_profile_button').click())
        .then(sleep(1000))
        .then(findId('successMessage').getText()
            .then((text)=>{
            expect(text).to.equal('Success for updating!')
        }))
        .then(done)
    })


    
})
