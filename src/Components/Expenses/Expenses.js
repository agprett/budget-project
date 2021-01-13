import React, {useState} from 'react'
import moment from 'moment'
import axios from 'axios'
import './Expenses.css'
import {remove} from '../img.json'

function Expenses(props) {
  const {expenses, setExpenses, setRerender} = props
  const [form, setForm] = useState(false)
  const [edit, setEdit] = useState(false)
  const [filterDisplay, setFilterDisplay] = useState(false)
  const [filters, setFilters] = useState({name: '', category: '', start: '', end: '', low: '', high: ''})
  const [newExpense, setNewExpense] = useState({name: '', category: '', date: '', amount: ''})
  // const [filters, setFilters] = useState({name: '', category: '', start: '', end: '', low: '', high: ''})

  const addNewExpense = () => {
    axios.post('/api/expenses', newExpense)
    .then(() => {
      setNewExpense({name: '', category: '', date: '', amount: 0})
      setRerender(true)
    })
  }

  // const filterExpenses = (filters, reset) => {
  //   if(reset){
  //     axios.get('/api/expenses')
  //     .then(res => {
  //       setExpenses(res.data)
  //     })
  //   } else {
  //     axios.post('/api/filter', filters)
  //     .then(res => {
  //       setExpenses(res.data.filtered)
  //       setFilters(res.data.filters)
  //     })
  //   }
  // }
  
  const viewExpenses = expenses.map((expense, i) => { 
    const {name, category, date, amount} = expense

    return (
      edit ? (
        <section key={i} className='expenses' style={{backgroundColor: i % 2 === 1 ? '#F5F5F5' : '#987DC1'}}>
          <input
            className='expense-name'
            placeholder={name}
          />
          <input
            className='expense-category'
            placeholder={category}
          />
          <input
            className='expense-date'
            placeholder={moment(date).format('MM/DD/YY')}
          />
          <input
            className='expense-amount'
            placeholder={amount}
          />
          <img
            className={edit ? 'remove' : 'null'}
            src={remove}
            alt='delete'
          />
        </section>
      ) : (
        <section key={i} className='expenses' style={{backgroundColor: i % 2 === 1 ? '#F5F5F5' : '#987DC1'}}>
          <h2 className='expense-name'>{name}</h2>
          <p className='expense-category'>{category}</p>
          <h4 className='expense-date'>{moment(date).format('MM/DD/YY')}</h4>
          <h2 className='expense-amount'>$ {amount}</h2>
        </section>
      )
    )
  })

  return (
    <section className='expense-section'>

      <section className={form ? 'new-expense-form' : 'null'}>
        <div>
          <p>Name</p>
          <input
            value={newExpense.name}
            onChange={event => setNewExpense({...newExpense, name: event.target.value})}
            />
        </div>
        <div>
          <p>Category</p>
          <input
            value={newExpense.category}
            onChange={event => setNewExpense({...newExpense, category: event.target.value})}
          />
        </div>
        <div>
          <p>Amount</p>
          <input
            value={newExpense.amount}
            onChange={event => setNewExpense({...newExpense, amount: event.target.value})}
          />
        </div>
        <section>
          <button
            style={{margin: '10px'}}
            onClick={() => {
              addNewExpense()
            }}
          >Add</button>
          <button
            style={{margin: '10px'}}
            onClick={() => {
              setNewExpense({name: '', category: '', date: '', amount: 0})
              setForm(false)
            }}
          >Cancel</button>
        </section>
      </section>

      <section className='expense-left'>
        <section className='filter-expense-form'>
          <p className='title-two'>Filters:</p>
          <div className='filter-options'>
            <p>Name</p>
            <input
              className='filter-input-l'
              value={filters.name}
              onChange={event => (
                setFilters({...filters, name: event.target.value})
              )}
            />
          </div>
          <div className='filter-options'>
            <p>Category</p>
            <input
              className='filter-input-l'
              value={filters.category}
              onChange={event => {
                setFilters({...filters, category: event.target.value})
              }}
            />
          </div>
          <div className='filter-options'>
            <p>Dates</p>
            <div className='filter-split'>
              <input
                className='filter-input-s'
                value={filters.start}
                onChange={event => (
                  setFilters({...filters, start: event.target.value})
                )}
              />
              <div className='filter-spacer'>to</div>
              <input
                className='filter-input-s'
                value={filters.end}
                onChange={event => {
                  setFilters({...filters, end: event.target.value})
                }}
              />
            </div>
          </div>
          <div className='filter-options'>
            <p>Amount</p>
            <div className='filter-split'>
              <div>
                <p>Low:</p>
                <input
                  className='filter-input-s'
                  value={filters.low}
                  onChange={event => {
                    setFilters({...filters, low: event.target.value})
                  }}
                />
              </div>
              <div className='filter-spacer'>to</div>
              <p>High:</p>
              <input
                className='filter-input-s'
                value={filters.high}
                onChange={event => {
                  setFilters({...filters, high: event.target.value})
                }}
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                // set
              }}
            >Add Filter(s)</button>
            <button
              onClick={() => {
                setFilters({name: '', category: '', start: '', end: '', low: '', high: ''})
              }}
            >Clear All</button>
          </div>
        </section>
      </section>

      <section className='expense-right'>
        {edit ? (
          <div>
            <button className='expense-button'>Save</button>
            <button
              className='expense-button'
              onClick={() => setEdit(false)}
            >Cancel</button>
          </div>
        ) : (
          <div>
            <button
              className='expense-button'
              onClick={() => setForm(true)}
            >New Expense</button>
            <button
              className='expense-button'
              onClick={() => setEdit(true)}
            >Edit Expenses</button>
            <button
              className='expense-button'
              onClick={() => (setFilterDisplay(true))}
            >Filter Expenses</button>
          </div>
        )}
        <section className='expenses-view'>
          {expenses[0] ? viewExpenses : <section style={{textAlign: 'center'}}>No Expenses to Show</section>}
        </section>
      </section>

    </section>
  )
}

export default Expenses