import React, {useEffect} from 'react'
import axios from 'axios'
import './Nav.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../../ducks/reducer'

function Nav(props){

  useEffect(() => {
    axios.get('/api/getUser')
    .then(res => {
      props.getUser(res.data)
    })
    .catch(err => console.log(err))
  })
  
  return (
    <div className='nav-bar'>
      <div className='prof-pic'></div>
      <p>{props.user.username}</p>
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser})(withRouter(Nav))