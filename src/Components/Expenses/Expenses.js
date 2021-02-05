import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import Loading from '../Loading/Loading'
import './Expenses.css'

function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({name: '', category: '', amount: 0})
  const [recurring, setRecurring] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    axios.get('/api/recurring')
    .then(res => {
      setRecurring(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/expenses')
    .then(res => {
      setExpenses(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    })
    .catch(err => console.log(err))
  }, [])

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

  const viewRecurring = recurring.map((purchase, i) => {
    const {name, category, date, amount} = purchase

    return (
      <div key={i} className='recure'>
        <h2 className='recure-name'>{name}</h2>
        <h2 className='recure-category'>{category}</h2>
        <h2 className='recure-date'>{moment(date).format('MM/DD/YY')}</h2>
        <h2 className='recure-amount'>$ {amount}</h2>
        <button
          onClick={() => {
            newExpense(name, category, amount)
          }}
        >Pay now</button>
      </div>
    )
  })

  return (
    <section>
      {loading ? (
        <div className='loading'>
          <Loading/>
        </div>
      ) : (
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
            <section className='expense-filter'>
              <input
                placeholder='Name'
              />
              <input 
                placeholder='Category'
              />
              <input
                placeholder='Start Date'
              />
              <input
                placeholder='End Date'
              />
              <input
                placeholder='Minimum'
              />
              <input
                placeholder='Maximum'
              />
            </section>
            <div className='expenses-view'>
              {expenses[0] ? viewExpenses : <div style={{textAlign: 'center'}}>No Expenses to Show</div>}
            </div>
          </section>
          <section className='recurring'>
            {viewRecurring}
          </section>
        </section>
      )}
    </section>
  )
}

export default Expenses