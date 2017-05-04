import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import App from './app'
import { initialVisit_1 } from './components/auth/authActions'

const logger = createLogger()

let store = createStore(Reducer, applyMiddleware(thunkMiddleware))
store.dispatch(initialVisit_1());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)