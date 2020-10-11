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
    <div
      className='nav-bar'
    >
      <div className='nav-left'>
        
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

const functions = {getUser, logoutUser}

export default connect(mapStateToProps, functions)(withRouter(Nav))