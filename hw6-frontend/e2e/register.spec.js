import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import landing from './landing'

describe('Test Landing Page', () => {

    before('should regester', (done) => {
        go().then(landing.register).then(done)
    })

    it('should register as a new user', (done) => {
        sleep(500)
        .then(findId('successMessage').getText()
            .then(text => {
                expect(text).to.be.ok;
            })
            .then(done))
    })
  
})
