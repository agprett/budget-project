import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Register.css'

function Register(props){
  const [user, setUser] = useState({username: '', password: ''})

  return (
    <div className='reg-back'>
      <section className='register'>
        <p className='title'>Welcome to  PB Budgeting!</p>
        <section className='reg-inputs'>
          <p>Register:</p>
          <input
            className='reg-input'
            value={user.username}
            placeholder='Username'
            onChange={event => setUser({...user, username: event.target.value})}
          />
          <input
            className='reg-input'
            type='password'
            placeholder='Password'
            value={user.password}
            onChange={event => setUser({...user, password: event.target.value})}
          />
        </section>
        <section className='reg-buttons'>
          <button
            className='reg-button'
            onClick={() => {
              axios.post('/api/user/new', user)
              .then(res => {
                // console.log(res)  
                props.history.push('/home')
              })
              .catch(() => alert('Username taken'))
            }}
            >Register</button>
          <button
            className='reg-button'
            onClick={() => setUser({username: '', password: ''})}
          >Clear</button>
        </section>
        <p>Already have an account? <Link to='/' style={{color: 'orange'}}>Click here!</Link></p>
      </section>
    </div>
  )
}

export default Register