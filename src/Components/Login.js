import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Login(props){
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
            axios.post('/api/user/login', user)
            .then(() => props.history.push('/dash'))
            .catch(() => alert('Username or password incorrect'))
          }}
        >Login</button>
        <button
          onClick={() => setUser({username: '', password: ''})}
        >Cancel</button>
        <p>New to the site? <Link to='/register'>Click here!</Link></p>
      </section>
    </div>
  )
}

export default Login