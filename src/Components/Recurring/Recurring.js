import React from 'react'
import './Recurring.css'
import moment from 'moment'

function Recurring(props) {
  const {recurring} = props

  const viewRecurring = recurring.map((recurring, i) => {
    const {name, category, amount, pay_date} = recurring

    return (
      <section key={i} className='recurrings'>
        <h2>{name}</h2>
        <h4>Category: {category}</h4>
        <p>$ {amount}</p>
        <p>{moment(pay_date).format('MM/DD/YY')}</p>
        <button>Pay Now</button>
      </section>
    )
  })

  return (
    <section className='quick-view'>
      <h3>Recurring Expenses</h3>
      <section className='viewRecurring'>
        {viewRecurring}
        {/* <img 
          className='viewRecurring'
        /> */}
      </section>
    </section>
  )
}

export default Recurring