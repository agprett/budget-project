import React, {useState, useEffect} from 'react'
import './Dash.css'
import axios from 'axios'
import BarChart from '../BarChart/BarChart'

function Dashboard(){
  const [budget, setBudget] = useState({monthly: 0, entertainment: 0, personal_care: 0, groceries: 0, travel: 0, other: 0})
  
  useEffect(() => {
    axios.get('/api/budget')
    .then(res => {
      setBudget(res.data)
    })
    .catch(err => console.log(err))
    console.log('hit')
  }, [])

  let budgetData = [
    {category: 'Entertainment', amount: budget.entertainment},
    {category: 'Personal care', amount: budget.personal_care},
    {category: 'Groceries', amount: budget.groceries},
    {category: 'Travel', amount: budget.travel},
    {category: 'Other', amount: budget.other}
  ]

  return (
    <div className='dash'>
      <div className='dash-budget-expense'>
        <div className='budget-expenses'>
          <h3 className='budget'>
            Monthly Budget: 
            <br/>
            ${budget.monthly}
          </h3>
          <h3 className='budget spent'>
            Monthly Spent: 
            <br/>
            $300
          </h3>
        </div>
        <div className='budget-expenses'>
          <h3 className='budget'>
            Weekly Budget: 
            <br/>
            ${budget.entertainment + budget.personal_care + budget.groceries + budget.travel + budget.other}
          </h3>
          <h3 className='budget spent'>
            Weekly Spent: 
            <br/>
            $300
          </h3>
        </div>
      </div>
      <div className='expense-graph'>
        <BarChart data={budgetData}/>
      </div>
      <div className='recent-expenses'>Recent Expenses:</div>
      <div className='dash-friends'>Friends: <br/> COMING SOON</div>
    </div>
  )
}

export default Dashboard