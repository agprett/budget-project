import React, {useEffect} from 'react'
import axios from 'axios'
import './Nav.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser, logoutUser} from '../../ducks/reducer'
import {profile_pic} from '../img.json'

function Nav(props){
  const {user} = props

  useEffect(() => {    
    axios.get('/api/user')
    .then(res => {
      props.getUser(res.data)
    })
  }, [])
  
  return (
    <section>
      <div className='upper-nav'>
        <div className='nav-left'>
          
        </div>
        <section className='nav-right'>
          <p className='title-three'>Welcome, {user.username}</p>
          <img
            className='prof-pic'
            src={profile_pic}
            alt='prof-pic'
          />
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
      </div>
      <div className='lower-nav'>
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
        <button className='nav-lower-buttons'>Expenses</button>
        <button className='nav-lower-buttons'>Savings</button>
        <button className='nav-lower-buttons'>Debt</button>
      </div>
    </section>
  )
}

const mapStateToProps = state => state

const functions = {getUser, logoutUser}

export default connect(mapStateToProps, functions)(withRouter(Nav))