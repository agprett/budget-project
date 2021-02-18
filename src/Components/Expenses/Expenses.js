import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import Loading from '../Loading/Loading'
import './Expenses.css'
import { style } from 'd3'

function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({name: '', category: '', amount: 0})
  const [recurring, setRecurring] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterDropdown, setFilterDropdown] = useState(false)

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
          <section className='recurring'>
            {/* <div className='new-expense'>
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
              </div> */}
              {viewRecurring}
          </section>
          <section className='expense-right'>
            <section className='expense-buttons'>
              <button>New</button>
              <button>Edit</button>
              <button>Delete</button>
              <button
                onClick={() => {
                  if(filterDropdown){
                    setFilterDropdown(false)
                  } else {                    
                    setFilterDropdown(true)
                  }
                }}
              >Filter
                <img
                  className={filterDropdown ? 'arrow down-arrow' : 'arrow'}
                  src='https://image.flaticon.com/icons/png/512/16/16038.png'
                  alt='arrow'
                />
              </button>
            </section>
            <section className={filterDropdown ? 'expense-filter' : ' expense-filter null'}>
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
        </section>
      )}
    </section>
  )
}

export default Expenses