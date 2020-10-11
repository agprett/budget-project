import React from 'react'
import './Savings.css'

function Savings(props) {
  const {savings} = props
  
  return (
    <section className='quick-view'>
      <h3> Total savings: $ {savings.overall}</h3>
    </section>
  )
}

export default Savings