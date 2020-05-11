import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Register(props){
  const [user, setUser] = useState({username: '', password: ''})

  return (
    <div>
      <section>
        username:
        <input
          value={user.username}
          onChange={event => setUser({...user, username: event.target.value})}
        />
        password:
        <input
          type='password'
          value={user.password}
          onChange={event => setUser({...user, password: event.target.value})}        
        />
        <button
          onClick={() => {
            axios.post('/api/user/new', user)
            .then(() => props.history.push('/dash'))
            .catch(() => alert('Username taken'))
          }}
        >Register</button>
        <button
          onClick={() => setUser({username: '', password: ''})}
        >Cancel</button>
        <p>Already have an account? <Link to='/'>Click here!</Link></p>
      </section>
    </div>
  )
}

export default Register