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
      <h3 className='overall-savings'> Total savings: $ {savings.overall}</h3>
      <section className='goals'>
        <div>goals</div>
      </section>
      <section className='accounts'>
        <div>accounts</div>
      </section>
    </section>
  )
}

export default Savings