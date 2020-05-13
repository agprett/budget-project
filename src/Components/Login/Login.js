import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Login.css'

function Login(props){
  const [user, setUser] = useState({username: '', password: ''})

  return (
    <div className='log-back'>
    <section className='login'>
      <p className='title'>Welcome to Budgetry!</p>
      <section className='log-inputs'>
        <input
          className='log-input'
          value={user.username}
          placeholder='Username'
          onChange={event => setUser({...user, username: event.target.value})}
        />
        <input
          className='log-input'
          type='password'
          placeholder='Password'
          value={user.password}
          onChange={event => setUser({...user, password: event.target.value})}
        />
      </section>
      <section className='log-buttons'>
        <button
          className='log-button'
          onClick={() => {
            axios.post('/api/user/login', user)
            .then(() => props.history.push('/dash'))
            .catch(() => alert('Username or password incorrect'))
          }}
          >Login</button>
          <button
            className='log-button'
            onClick={() => setUser({username: '', password: ''})}
          >Cancel</button>
        </section>
        <p>New to the site? <Link to='/register' style={{color: 'orange'}}>Click here!</Link></p>
      </section>
    </div>
  )
}

export default Login