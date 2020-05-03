import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Budget.css'

function Budget(){
  const [budget, setBudget] = useState({})
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    axios.get('/api/budget')
    .then(res => {
      setBudget(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/expenses')
    .then(res => {
      setExpenses(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  const view = expenses.map((expense, i) => {
    return (
      <section key={i} className='view-expense'>
        <h2>{expense.name}</h2>
        <p>{expense.category}</p>
      </section>
    )
  })

  return (
    <div className='budget-route'>
      <section className='budget'>
        <section className='pie-chart'>
          budget pie chart
        </section>
        <section className='budget-amounts'>
          <h2>Summary:</h2>
          <br/>
          <h4>Monthly Budget:</h4>
          <p className='amount'>${budget.monthly}</p>
          <br/>
          <h4>Monthly Expense:</h4>
          <p className='amount'>$123</p>
          <br/>
          <h4>Weekly Budget:</h4>
          <p className='amount'>$</p>
          <br/>
          <h4>Weekly Expense:</h4>
          <p className='amount'>$123</p>
        </section>
        <section className='line-graph'>
          expense line graph
        </section>
      </section>
      <div className='expenses'>
        {expenses[0] ? view : <section className='view-expense' style={{'text-align': 'center'}}>No Expenses to Show</section>}
      </div>
    </div>
  )
}

export default Budget