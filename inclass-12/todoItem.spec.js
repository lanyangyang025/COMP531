import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert the innerHTML of the todo is the text you initially set

        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={0} text='add 1st item' done={false} toggle ={_ => _} remove = {_ => _}/>
        </div>)
        const elements=findDOMNode(node).children[0]
        expect(elements.children).to.have.length(3)
        const span=elements.children[1]
        expect(span.innerHTML).to.equal('add 1st item');

    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert there is no child with classname 'completed'
        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={0} text='add 2st item' done={false} toggle ={_ => _} remove = {_ => _}/>
        </div>)
        const elements=findDOMNode(node).children[0]
        const span=elements.children[1]
        expect(span.className).to.not.equal('completed');
    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument
        // when the checkbox is clicked via TestUtils.Simulate.click()
        // we expect the variable toggled to be true

        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={0} text='add 3st item' done={false} toggle ={() => {toggled=true}} remove = {_ => _}/>
        </div>)
        const elements=findDOMNode(node).children[0]
        expect(toggled).to.be.false
        TestUtils.Simulate.click(elements.children[0])
        expect(toggled).to.be.true
    })


    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        // when the remove button is clicked via TestUtils.Simulate.click()
        // we expect the variable removed to be true
        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={0} text='add 3st item' done={false} remove = {()=>{removed = true}} toggle ={_ => _}/>
        </div>)
        expect(removed).to.be.false
        const elements=findDOMNode(node).children[0]
        TestUtils.Simulate.click(elements.children[2])
        expect(removed).to.be.true
    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        // assert that the rendered className is "completed"
        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={0} text='add 5st item' done={true} toggle ={_ => _} remove = {_ => _}/>
        </div>)
        const elements=findDOMNode(node).children[0]
        const span=elements.children[1]
        expect(span.className).to.equal('completed');
    })
})
