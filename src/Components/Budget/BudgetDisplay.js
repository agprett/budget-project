import React, {useState} from 'react'
import axios from 'axios'

function BudgetDisplay(props){
  const {budget, setBudget, condensed, current, time} = props
  const [editting, setEditting] = useState(false)
  const [updatedBudget, setUpdatedBudget] = useState({})
  
  const weeklyBudget = [
    {name: 'Personal', category: 'personal', amount: budget.personal},
    {name: 'Groceries', category: 'groceries', amount: budget.groceries},
    {name: 'Travel', category: 'travel', amount: budget.travel},
    {name: 'Other', category: 'other', amount: budget.other}
  ]

  const weeklyExpense = [
    {name: 'Personal', category: 'personal', amount: condensed.personal},
    {name: 'Groceries', category: 'groceries', amount: condensed.groceries},
    {name: 'Travel', category: 'travel', amount: condensed.travel},
    {name: 'Other', category: 'other', amount: condensed.other}
  ]

  const handleUpdate = () => {
    axios.put('/api/budget', updatedBudget)
    .then(() => {
      setEditting(false)
      setUpdatedBudget({})
    })
    .catch(err => console.log(err))
  }

  const budgetAmount = weeklyBudget.map((column, i) => {
    return (
      <section key={i}>
        <h4 style={{marginTop: '10px'}}>{column.name}</h4>
        {editting ? (
          <input
            placeholder={column.amount}
            onChange={event => setUpdatedBudget({...budget, ...updatedBudget, [column.category]: +event.target.value})}
          />
        ) : (
          <h3 style={{fontWeight: 400}}>$ {column.amount}</h3>
        )}
      </section>
    )
  })

  const expenseAmount = weeklyExpense.map((column, i) => {
    return (
      <section key={i}>
        <h4 style={{marginTop: '10px'}}>{column.name}</h4>
        {column.amount ? <h3 style={{fontWeight: 400}}>$ {column.amount}</h3> : <h3 style={{fontWeight: 400}}>$ 0</h3>}
      </section>
    )
  })

  return (
    <section>
      {time === 'monthly' ? (
        <section className='budget-amounts'>
          <h4>Monthly Budget:</h4>
          {editting ? (
            <input
              placeholder={budget.monthly}
              onChange={event => setUpdatedBudget({...budget, monthly: +event.target.value})}
            />
          ) : (
            <p className='amount'>$ {budget.monthly}</p>
          )}
          {editting ? (
            <section>
              <button
                onClick={() => {
                  setBudget({...budget, ...updatedBudget})
                  handleUpdate()
                }}
              >Update</button>
              <button onClick={() => {
                setUpdatedBudget({})
                setEditting(false)
              }}>Cancel</button>
            </section>
          ) : (  
            <button style={{margin: '10px 0 15px'}} onClick={() => setEditting(true)}>Edit</button>
          )}
          <h4>Monthly Expense:</h4>
          {current.monthly ? <p className='amount'>$ {current.monthly}</p> : <p className='amount'>$ 0</p>}
        </section>
      ) : (
        <section className='budget-amounts'>
          <h4>Total Weekly Budget:</h4>
          <p className='amount'>$ {budget.weekly}</p>
          <section className='weekly-budget'>
            {budgetAmount}
          </section>
          {editting ? (
            <section style={{margin: '15px 0'}}>
              <button
                onClick={() => {
                  setBudget({...budget, ...updatedBudget})
                  handleUpdate()
                }}
              >Update</button>
              <button onClick={() => {
                setUpdatedBudget({})
                setEditting(false)
              }}>Cancel</button>
            </section>
          ) : (  
            <button style={{margin: '10px 0'}} onClick={() => setEditting(true)}>Edit</button>
          )}
          <h4>Weekly Expense:</h4>
          {current.weekly ? <p className='amount'>$ {current.weekly}</p> : <p className='amount'>$ 0</p>}
          <section className='weekly-budget'>
            {expenseAmount}
          </section>
        </section>
      )}
    </section>
  )
}
export default BudgetDisplay