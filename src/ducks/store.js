import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './userReducer'
import promiseMiddleware from 'redux-promise-middleware'

export default createStore(userReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))