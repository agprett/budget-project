import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import './Expenses.css'

function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({name: '', category: '', amount: 0})
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

  const addNewExpense = newExpense => {
    axios.post('api/expenses', newExpense)
    .then(() => {
      setNewExpense({name: '', category: '', amount: 0})
    })
    .catch(err => console.log(err))
  }
  
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
        <section className='expense-left'>
          <div className='new-expense'>
            <input
              placeholder='Name'
              value={newExpense.name}
              onChange={event => {
                setNewExpense({...newExpense, name: event.target.value})
              }}
            />
            <input
              placeholder='Category'
              value={newExpense.category}
              onChange={event => {
                setNewExpense({...newExpense, category: event.target.value})
              }}
            />
            <input
              placeholder='Amount'
              value={newExpense.amount}
              onChange={event => {
                setNewExpense({...newExpense, amount: +event.target.value})
              }}
            />
            <button
              onClick={() => {
                addNewExpense(newExpense)
              }}
            >Submit</button>
            <button
              onClick={() => {
                setNewExpense({name: '', category: '', amount: 0})
             }}
            >Cancel</button>
          </div>
        </section>
        <section className='expense-right'>
          <div className='expenses-view'>
            {expenses[0] ? viewExpenses : <div style={{textAlign: 'center'}}>No Expenses to Show</div>}
          </div>
        </section>

    </section>
  )
}

export default Expenses