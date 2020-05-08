import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './userReducer'
import expenseReducer from './expenseReducer'
import promiseMiddleware from 'redux-promise-middleware'

const rootReducer = combineReducers({userReducer, expenseReducer})

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))