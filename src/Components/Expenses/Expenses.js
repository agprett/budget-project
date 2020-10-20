import React, {useState} from 'react'
import moment from 'moment'
import axios from 'axios'
import './Expenses.css'

function Expenses(props) {
  const {expenses, setExpenses, setRerender} = props
  const [display, setDisplay] = useState('New')
  const [newExpense, setNewExpense] = useState({name: '', category: '', amount: ''})
  const [filters, setFilters] = useState({name: '', category: '', start: '', end: '', low: '', high: ''})

  const addNewExpense = () => {
    axios.post('/api/expenses', newExpense)
    .then(() => {
      setNewExpense({name: '', category: '', amount: 0})
      setRerender(true)
    })
  }

  const filterExpenses = (filters, reset) => {
    if(reset){
      axios.get('/api/expenses')
      .then(res => {
        setExpenses(res.data)
      })
    } else {
      axios.post('/api/filter', filters)
      .then(res => {
        setExpenses(res.data.filtered)
        setFilters(res.data.filters)
      })
    }
  }
  
  const viewExpenses = expenses.map((expense, i) => { 
    const {name, category, date, amount} = expense

    return (
      <section key={i} className='expenses' style={{backgroundColor: i % 2 === 1 ? 'grey' : '#01a7c2'}}>
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
        <section className='expense-left-buttons'>
          <button
            onClick={() => setDisplay('New')}
          >New</button>
          <button
            onClick={() => setDisplay('Filter')}
          >Filter</button>
        </section>
        {display === 'New' ? (
          <section className='expense-forms'>
            <input
              placeholder='Name'
              value={newExpense.name}
              onChange={event => setNewExpense({...newExpense, name: event.target.value})}
            />
            <input
              placeholder='Category'
              value={newExpense.category}
              onChange={event => setNewExpense({...newExpense, category: event.target.value})}
            />
            {/* <Dropdown /> */}
            <input
              placeholder='Amount'
              value={newExpense.amount}
              onChange={event => setNewExpense({...newExpense, amount: event.target.value})}
            />
            <div className='add-expense-buttons'>
              <button
                style={{margin: '10px'}}
                onClick={() => {
                  addNewExpense()
                }}
              >Add</button>
              <button
                style={{margin: '10px'}}
                onClick={() => {
                  setNewExpense({name: '', category: '', amount: 0})
                }}
              >Cancel</button>
            </div>
          </section>
        ) : (
          <section className='expense-forms'>
            <input
              value={filters.name}
              placeholder='Name'
              onChange={event => {
                setFilters({...filters, name: event.target.value})
              }}
            />
            <input
              value={filters.category}
              placeholder='Category'
              onChange={event => (
                setFilters({...filters, category: event.target.value})
              )}
            />
            <section>
              <input
                value={filters.start}
                placeholder='MM/DD/YY'
                onChange={event => {
                  setFilters({...filters, start: event.target.value})
                }}
              />
              to 
              <input
                value={filters.end}
                placeholder='MM/DD/YY'
                onChange={event => {
                  setFilters({...filters, end: event.target.value})
                }}
              />
            </section>
            <section>
              <input
                value={filters.low}
                placeholder='Minimum'
                onChange={event => {
                  setFilters({...filters, low: event.target.value})
                }}
              />
              to
              <input
                value={filters.high}
                placeholder='Maximum'
                onChange={event => {
                  setFilters({...filters, high: event.target.value})
                }}
              />
            </section>
            <section>
              <button
                onClick={() => {
                  filterExpenses(filters, false)
                  setFilters({name: '', category: '', start: '', end: '', low: '', high: ''})
                }}
              >Filter</button>
              <button
                onClick={() => {
                  filterExpenses(filters, true)
                  setFilters({name: '', category: '', start: '', end: '', low: '', high: ''})
                }}
              >Cancel</button>
            </section>
          </section>
        )}
      </section>
          <section className='expenses-view'>
            {expenses[0] ? viewExpenses : <section style={{textAlign: 'center'}}>No Expenses to Show</section>}
          </section>
        </section>
  )
}

export default Expenses