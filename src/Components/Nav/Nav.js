import React, {useEffect} from 'react'
import axios from 'axios'
import './Nav.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../../ducks/reducer'
import {home, budget, friends, groups, logout} from './img.json'

function Nav(props){

  useEffect(() => {
    axios.get('/api/getUser')
    .then(res => {
      props.getUser(res.data)
    })
    .catch(err => console.log(err))
  }, [])
  
  return (
    <div className='nav-bar'>
      <div className='nav-prof'>
        <div className='prof-pic'></div>
        <p>{props.user.username}</p>
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
      <img
        className='nav-button'
        src={friends}
        alt='friends'
      />
      <img
        className='nav-button'
        src={groups}
        alt='groups'
      />
      <img
        className='nav-logout'
        src={logout}
        alt='logout'
      />
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser})(withRouter(Nav))