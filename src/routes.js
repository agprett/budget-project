import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import Budget from './Pages/Budget/Budget'

export default (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/dash' component={Dashboard} />
    <Route path='/budget' component={Budget} />
  </Switch>
)