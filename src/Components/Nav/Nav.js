import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './Nav.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser, logoutUser} from '../../ducks/userReducer'
import {home, budget, logout} from '../img.json'

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

      // axios.get('/api/budget')
      // .then(res => {
      //   props.getBudget(res.data)
      // })

      // axios.get('/api/savings')
      // .then(res => {
      //   props.getSavings(res.data)
      // })
    })
    // .catch(() => props.history.push('/'))
    console.log('hit')
  }, [])
  
  return (
    <div
      className='nav-bar'
    >
      <div className='nav-prof'>
        <img
          className='prof-pic'
          src={user.profile_pic}
          alt='prof-pic'
        />
        <p>{user.username}</p>
      </div>
      {/* <img
        className='nav-button'
        src={home}
        alt='home'
        onClick={() => props.history.push('/dash')}
      /> */}
      <img
        className='nav-button'
        src={budget}
        alt='budget'
        onClick={() => props.history.push('/budget')}
      />
      {/* <div
        onClick={() => props.history.push('/savings')}
      >Debt</div> */}
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