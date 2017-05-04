import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import landing from './landing'

describe('Test Landing Page', () => {

    before('should log in', (done) => {
        go().then(landing.login).then(done)
    })

    it('should login as test user', (done) => {
        sleep(500)
        .then(findId('user_img')
            .then(element => {
                expect(element).to.be.ok;
            })
            .then(done))
    })
   
})
