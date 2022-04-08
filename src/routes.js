import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './Components/Login/Login.js'
import Register from './Components/Register/Register.js'
import Home from './Components/Home/Home.js'
import Budget from './Components/Budget/Budget.js'
import Expenses from './Components/Expenses/Expenses.js'
import Planning from './Components/Planning/Planning.js'

export default (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/home' component={Home} />
    <Route path='/budget' component={Budget} />
    <Route path='/expenses' component={Expenses} />
    <Route path='/planning' component={Planning} />
  </Switch>
)