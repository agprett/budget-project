import React, {useState} from 'react'
import axios from 'axios'

function BudgetDisplay(props){
  const {budget, setBudget, time} = props
  const [editting, setEditting] = useState(false)
  const weeklyBudget = [
    {name: 'Entertainment', category: 'entertainment', amount: budget.entertainment},
    {name: 'Personal Care', category: 'personal_care', amount: budget.personal_care},
    {name: 'Groceries', category: 'groceries', amount: budget.groceries},
    {name: 'Travel', category: 'travel', amount: budget.travel},
    {name: 'Other', category: 'other', amount: budget.other}
  ]
  const [updatedBudget, setUpdatedBudget] = useState({})

  const handleUpdate = () => {
    axios.put('/api/budget', budget)
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
            onChange={event => setUpdatedBudget({...updatedBudget, [column.category]: +event.target.value})}
          />
        ) : (
          <h3 style={{fontWeight: 400}}>$ {column.amount}</h3>
        )}
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
              onChange={event => setUpdatedBudget({monthly: +event.target.value})}
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
          <p className='amount'>$ 123</p>
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
          <p className='amount'>$ 123</p>
        </section>
      )}
    </section>
  )
}
export default BudgetDisplay