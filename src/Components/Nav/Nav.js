import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './Nav.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser, logoutUser, getRecurring, getSavings, getDebt} from '../../ducks/reducer'
import {home, budget, expense, profile_pic} from '../img.json'

function Nav(props){
  const [local, setLocal] = useState({})
  const {user} = props

  let rerender = () => {
    if(local === props.userReducer) {
      return false
    } else {
      setLocal(props.userReducer)
      return true
    }
  }

  useEffect(() => {    
    axios.get('/api/user')
    .then(res => {
      props.getUser(res.data)
    })

    // axios.get('/api/budget')
    // .then(res => {
    //   props.getBudget(res.data)
    // })

    axios.get('/api/savings')
    .then(res => {
      props.getSavings(res.data)
    })

    // axios.get('/api/expenses')
    // .then(res => {
    //   props.getExpenses(res.data)
    // })

    axios.get('/api/recurring')
    .then(res => {
      props.getRecurring(res.data)
    })
    .catch(() => rerender())
    // .catch(() => props.history.push('/'))

    axios.get('/api/debts')
    .then(res => {
      props.getDebt(res.data)
    })
  }, [])
  
  return (
    <div
      className='nav-bar'
    >
      <div className='nav-left'>
        <div
          onClick={() => props.history.push('/home')}
        >Home</div>
        {/* <img
          className='nav-button'
          src={home}
          alt='home'
          onClick={() => props.history.push('/home')}
        /> */}
        {/* <img
          className='nav-button'
          src={budget}
          alt='budget'
          onClick={() => props.history.push('/budget')}
        /> */}
        {/* <img
          className='nav-button'
          src={expense}
          alt='expense'
          onClick={() => props.history.push('/expense')}
        /> */}
        {/* <div
          onClick={() => props.history.push('/savings')}
        >Savings</div> */}
      </div>
      <section className='nav-right'>
        <div>Welcome, {user.username}</div>
        <img
          className='prof-pic'
          src={profile_pic}
          alt='prof-pic'
        />
        <button
          className='nav-button'
          onClick={() => {
            axios.post('/api/user/logout')
            .then(() => {
              props.logoutUser()
              props.history.push('/')
            })
            .catch(err => {
              alert('Failed to sign out')
              console.log(err)
            })
          }}
        >Sign Out</button>
      </section>
    </div>
  )
}

const mapStateToProps = state => state

const functions = {getUser, logoutUser, getSavings, getRecurring, getDebt}

export default connect(mapStateToProps, functions)(withRouter(Nav))