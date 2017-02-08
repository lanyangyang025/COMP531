//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;(function(exports) {

'use strict'

function h(tag, props, ...children) {
    return { tag, props: props ? props : { }, 
        children: Array.isArray(children[0]) ? children[0] : children }
}

function createElement(node) {
	console.log('Create element called for', node)
	// create the element and return it to the caller
	// the node might have event listeners that need to be registered
	// the node might have children that need to be created as well
	var curr = document.createElement(node.tag);
    if(node.props){
        Object.keys(node.props).forEach(function(key){
            //class is the attribute for className
            if (key === "className") {
                curr.setAttribute("class", node.props[key]);
                curr.value = node.props[key];
            } 
            //click is the attribute for onClick
            else if (key === "onClick") {
                curr.addEventListener("click",function(event){
                    node.props["onClick"](event);
                    update();
                })
            } 
            //other kinds of key is primitive name of the attribute 
            else {
                curr.setAttribute(key, node.props[key]);
            }
        })
    }
    if (node.children) {
        node.children.forEach(function(tag) {
            if (typeof tag === "string") {
                //get the tag of the children which will be used in the recursive method
                curr.innerHTML = tag;
            } 

            else {
                //recursively call createElement method to traverse and set the values for attributes
                //for each element
                curr.appendChild(createElement(tag));
            }
        })
    }
    return curr;
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props && 
            	node1.props.id && node2.props.id && 
            	node1.props.id != node2.props.id)
}

function updateElement(parent, newNode, oldNode, index=0) {
	// index will be needed when you traverse children
	// add the new node to the parent DOM element if
	// the new node is different from the old node 
	// at the same location in the DOM.
	// ideally we also handle inserts, but ignore that functionality for now.

    if (!oldNode) {
        
        parent.appendChild(createElement(newNode))
    } else {
        console.log('update element that may have changed')
        // you can use my changed(node1, node2) method above
        // to determine if an element has changed or not
        // be sure to also update the children!
        if (changed(newNode, oldNode)) {
            parent.removeChild(parent.children[index])
            parent.appendChild(createElement(newNode));
        } else {
            if(newNode.children){
                if (newNode.children<oldNode.children) {
                    parent.removeChild(parent.children[index])
                    parent.appendChild(createElement(newNode))
                }
                else {
                    newNode.children.forEach(function (child, i) {
                        updateElement(parent.children[index], child, oldNode.children[i], i)
                    })
                }
            }

        }
    }
    
}

const deepCopy = (obj) => {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const props = {}
    if (obj.props) {
        for (let p in obj.props) {
            props[p] = obj.props[p]
        }
    }
    return h(obj.tag, props,
        Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
}

const update = () => requestAnimationFrame(() => {
	// compare the current vdom with the original vdom for updates
    updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
    h.mounted.original = deepCopy(h.mounted.current)
})

h.mount = (root, component) => {
    // we keep a copy of the original virtual DOM so we can diff it later for updates
    const originalComponent = deepCopy(component)
    h.mounted = { root: root, current: component, original: originalComponent }
    updateElement(root, originalComponent)
}

exports.h = h

})(window);