import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'
import Budget from './Components/Budget/Budget'
import Expenses from './Components/Expenses/Expenses'
import Savings from './Components/Savings/Savings'

export default (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/home' component={Home} />
    <Route path='/budget' component={Budget} />
    <Route path='/expenses' component={Expenses} />
    <Route path='/savings' component={Savings} />
  </Switch>
)