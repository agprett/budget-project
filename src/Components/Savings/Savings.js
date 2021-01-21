import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Savings.css'

function Savings() {
  const [savings, setSavings] = useState([])

  useEffect(() => {
    axios.get('/api/savings')
    .then(res => {
      setSavings(res.data)
    })
    .catch(err => console.log(err))
  })
  
  return (
    <section className='savings'>
      <h3> Total savings: $ {savings.overall}</h3>
    </section>
  )
}

export default Savings