import React, {useEffect} from 'react'
import axios from 'axios'
import './Nav.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser, logoutUser, getSavings, getDebt} from '../../ducks/reducer'
// import {profile_pic} from '../img.json'

function Nav(props){
  const {user} = props

  useEffect(() => {    
    axios.get('/api/user')
    .then(res => {
      props.getUser(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/savings')
    .then(res => {
      props.getSavings(res.data.overall)
    })
    .catch(err => console.log(err))

    
    axios.get(`/api/total`)
    .then(res => {
      props.getDebt(res.data.sum)
    })
    .catch(err => console.log(err))
    console.log(props.user.user_id)
  }, [])
  
  return (
    <section>
      <nav className='upper-nav'>
        <div className='nav-left'>
          <h2 className='main-title'>PB Budgetry</h2>
          <h4>Financial planning done easy</h4>
        </div>
        <section className='nav-right'>
          <p className='title-three'>Welcome, {user.username}</p>
          {/* <img
            className='prof-pic'
            src={profile_pic}
            alt='prof-pic'
          /> */}
          <button
            className='nav-button'
            // onClick={() => {
            //   axios.post('/api/user/logout')
            //   .then(() => {
            //     props.logoutUser()
            //     props.history.push('/')
            //   })
            //   .catch(err => {
            //     alert('Failed to sign out')
            //     console.log(err)
            //   })
            // }}
          >Sign Out</button>
        </section>
      </nav>
      <nav className='lower-nav'>
        <button
          className={props.location.pathname === '/home' ? 'nav-lower-buttons stuff' : 'nav-lower-buttons'}
          onClick={() => {
            if(props.location.pathname !== '/home'){
              props.history.push('/home')
            }
          }}
        >Home</button>
        <button
          className={props.location.pathname === '/budget' ? 'nav-lower-buttons stuff' : 'nav-lower-buttons'}
          onClick={() => {
            if(props.location.pathname !== '/budget'){
              props.history.push('/budget')
            }
          }}
        >Budget</button>
        <button 
          className={props.location.pathname === '/expenses' ? 'nav-lower-buttons stuff' : 'nav-lower-buttons'}
          onClick={() => {
            if(props.location.pathname !== '/expenses'){
              props.history.push('/expenses')
            }
          }}
        >Expenses</button>
        {/* <button
          className={props.location.pathname === '/planning' ? 'nav-lower-buttons stuff' : 'nav-lower-buttons'}
          onClick={() => {
            if(props.location.pathname !== '/planning'){
              props.history.push('/planning')
            }
          }}
        >Planning</button> */}
      </nav>
    </section>
  )
}

const mapStateToProps = state => state

const functions = {getUser, logoutUser, getSavings, getDebt}

export default connect(mapStateToProps, functions)(withRouter(Nav))