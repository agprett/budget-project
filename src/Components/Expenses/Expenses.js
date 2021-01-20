import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import './Expenses.css'

function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/expenses')
    .then(res => {
      setExpenses(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    })
    .catch(err => console.log(err))
  })
  
  const viewExpenses = expenses.map((expense, i) => { 
    const {name, category, date, amount} = expense

    return (
      <section key={i} className='expenses' style={{backgroundColor: i % 2 === 1 ? '#F5F5F5' : '#987DC1'}}>
        <h2 className='expense-name'>{name}</h2>
        <p className='expense-category'>{category}</p>
        <h4 className='expense-date'>{moment(date).format('MM/DD/YY')}</h4>
        <h2 className='expense-amount'>$ {amount}</h2>
      </section>
    )
  })

  return (
    <section className='expense-section'>
        <section className='expenses-view'>
          {expenses[0] ? viewExpenses : <section style={{textAlign: 'center'}}>No Expenses to Show</section>}
        </section>

    </section>
  )
}

export default Expenses