import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducer.js'
import promiseMiddleware from 'redux-promise-middleware'

export default createStore(reducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))