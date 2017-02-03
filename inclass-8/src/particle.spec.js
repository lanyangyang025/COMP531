import { expect } from 'chai'
import particle, { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // IMPLEMENT ME:
        //   check position, velocity, acceleration, mass
        //   these should all be numbers or arrays of numbers
        expect(p.position).to.have.lengthOf(2)
        expect(p.position[0]).to.be.a('number')
        expect(p.position[1]).to.be.a('number')
        expect(p.velocity).to.have.lengthOf(2)
        expect(p.velocity[0]).to.have.a('number')
        expect(p.velocity[1]).to.be.a('number')
        expect(p.acceleration).to.have.lengthOf(2)
        expect(p.acceleration[0]).to.be.a('number')
        expect(p.acceleration[1]).to.be.a('number')
        expect(p.mass).to.be.a('number')
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        // IMPLEMENT ME:
        //    similar to the previous check
        //    check that the velocity is updated correctly
        const p = particle({ velocity: [1, 1], acceleration: [0.5, -0.5] })
        const { velocity } = update(p, 1.0) // dt is different here
        expect(velocity).to.eql([1.5, 0.5])
        
    })

        // IMPLEMENT ME:
        
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides

        // you will want to send the canvas into the update function
        // this means you decide the size of the canvas here.
        // canvas = { width, height }



    it('particles should wrap around the world above [800,800]', () => {
        const p = particle({ position: [810, 810], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)     
        expect(position[0]).to.be.at.least(0)
        expect(position[1]).to.be.at.least(0)
        expect(position[0]).to.be.at.most(800)
        expect(position[1]).to.be.at.most(800)
    })

    it('particles should wrap around the world above [800,0]', () => {
        const p = particle({ position: [810, -10], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position[0]).to.be.at.least(0)
        expect(position[1]).to.be.at.least(0)
        expect(position[0]).to.be.at.most(800)
        expect(position[1]).to.be.at.most(800)
    })

    it('particles should wrap around the world above [0,0]', () => {
        const p = particle({ position: [-10, -10], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position[0]).to.be.at.least(0)
        expect(position[1]).to.be.at.least(0)
        expect(position[0]).to.be.at.most(800)
        expect(position[1]).to.be.at.most(800)
    })

    it('particles should wrap around the world above [0,800]', () => {
        const p = particle({ position: [-10, 810], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position[0]).to.be.at.least(0)
        expect(position[1]).to.be.at.least(0)
        expect(position[0]).to.be.at.most(800)
        expect(position[1]).to.be.at.most(800)
    })
})
