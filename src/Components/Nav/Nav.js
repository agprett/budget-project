import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './Nav.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser, logoutUser} from '../../ducks/userReducer'
import {home, budget, logout} from '../img.json'

function Nav(props){
  const [local, setLocal] = useState({})

  let rerender = () => {
    if(local === props.userReducer.user) {
      return false
    } else {
      setLocal(props.userReducer.user)
      return true
    }
  }

  useEffect(() => {    
    axios.get('/api/user')
    .then(res => {
      props.getUser(res.data)
    })
    // .catch(() => props.history.push('/'))
    console.log('hit')
  }, [rerender()])
  
  return (
    <div
      className='nav-bar'
    >
      <div className='nav-prof'>
        <img
          className='prof-pic'
          src={props.userReducer.user.profile_pic}
          alt='prof-pic'
        />
        <p>{props.userReducer.user.username}</p>
      </div>
      <img
        className='nav-button'
        src={home}
        alt='home'
        onClick={() => props.history.push('/dash')}
      />
      <img
        className='nav-button'
        src={budget}
        alt='budget'
        onClick={() => props.history.push('/budget')}
      />
      {/* <img
        className='nav-button'
        src={friends}
        alt='friends'
      />
      <img
        className='nav-button'
        src={groups}
        alt='groups'
      /> */}
      <img
        className='nav-logout'
        src={logout}
        alt='logout'
        onClick={() => {
          axios.post('/api/user/logout')
            .then(() => {
              props.logoutUser()
              props.history.push('/')
            })
            .catch(err => {
              alert('Failed to log out')
              console.log(err)
            })
        }}
      />
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, logoutUser})(withRouter(Nav))