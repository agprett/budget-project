import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Budget from './Components/Budget/Budget'
import Savings from './Components/Savings/Savings'

export default (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/budget' component={Budget} />
    <Route path='/savings' component={Savings} />
  </Switch>
)