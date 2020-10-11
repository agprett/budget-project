import React, {useState} from 'react'
import moment from 'moment'
import './Expenses.css'

function Expenses(props) {
  const expenses = props.expenses
  const [filter, setFilter] = useState({name: '', category: '', start: '', end: '', low: null, high: null})
  
  const viewExpenses = expenses.map((expense) => { 
    const {expense_id, name, category, date, amount} = expense

    return (
      <section key={expense_id} className='expenses' style={{backgroundColor: expense_id % 2 === 1 ? 'grey' : '#01a7c2'}}>
        <h2 className='expense-name'>{name}</h2>
        <p className='expense-category'>{category}</p>
        <h4 className='expense-date'>{moment(date).format('MM/DD/YY')}</h4>
        <h2 className='expense-amount'>$ {amount}</h2>
      </section>
    )
  })

  return (
    <section className='expense-section'>
          <section className='expense-filter'>
            <input
              placeholder='Name'
            />
            <input
              placeholder='Category'
              onChange={event => (
                setFilter({...filter, category: event.target.value})
              )}
            />
            <section>
              <input placeholder='DD/MM/YY'/> to <input placeholder='DD/MM/YY'/>
            </section>
            <section>
              <input placeholder='Minimum'/> to <input placeholder='Maximum'/>
            </section>
          </section>
          {/* <section className='add-expense'>
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
            <Dropdown />
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
          </section> */}
          <section className='expenses-view'>
            {expenses[0] ? viewExpenses : <section style={{textAlign: 'center'}}>No Expenses to Show</section>}
          </section>
        </section>
  )
}

export default Expenses