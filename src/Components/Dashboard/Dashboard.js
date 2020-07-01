import React, {useState, useEffect} from 'react'
import moment from 'moment'
import './Dash.css'
import axios from 'axios'
import BarChart from '../BarChart/BarChart'
import Loading from '../Loading/Loading'

function Dashboard(){
  const [budget, setBudget] = useState({monthly: 0, weekly: 0, personal: 0, groceries: 0, travel: 0, other: 0})
  const [expenses, setExpenses] = useState([])
  const [current, setCurrent] = useState({weekly: 0, monthly: 0})
  const [condensed, setCondensed] = useState({personal: 0, groceries: 0, travel: 0, other: 0})
  const [upcoming, setUpcoming] = useState([])
  const [loading, setLoading] = useState(false)
  const [rerender, setRerender] = useState(false)
  
  let budgetData = [
    {category: 'Personal', amount: budget.personal},
    {category: 'Groceries', amount: budget.groceries},
    {category: 'Travel', amount: budget.travel},
    {category: 'Other', amount: budget.other}
  ]

  let expensesData = [
    {category: 'Personal', amount: condensed.personal, color: condensed.personal > budget.personal ? '#bb0a21' : budget.personal * .8 < condensed.personal ? '#eae151' : '#0cce6b'},
    {category: 'Groceries', amount: condensed.groceries, color: condensed.groceries > budget.groceries ? '#bb0a21' : budget.groceries * .8 < condensed.groceries ? '#eae151' : '#0cce6b'},
    {category: 'Travel', amount: condensed.travel, color: condensed.travel > budget.travel ? '#bb0a21' : budget.travel * .8 < condensed.travel ? '#eae151' : '#0cce6b'},
    {category: 'Other', amount: condensed.other, color: condensed.other > budget.other ? '#bb0a21' : budget.other * .8 < condensed.other ? '#eae151' : '#0cce6b'}
  ]

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    axios.get('/api/budget')
    .then(res => {
      setBudget({...res.data})
    })
    .catch(err => console.log(err))

    axios.get('/api/expenses/condensed')
    .then(res => {
      setCondensed(res.data)
    })
    .catch(err => console.log(err))

    axios.put('/api/expenses/condensed')
    .then(() => console.log('recondensed'))
    .catch(err => console.log(err))

    axios.get('/api/expenses/current')
    .then(res => {
      setCurrent(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/upcoming/next')
    .then(res => {
      setUpcoming(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/expenses/recent')
    .then(res => {
      setExpenses(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 500);
    })
    .catch(err => console.log(err))

    setRerender(false)
  }, [rerender])

  const next = upcoming.map((next, i) => {
    return (
      <div className='next' key ={i}>
        <section>
          <h3>{next.name}</h3>
          <p>{next.category}</p>
        </section>
        <section>
          <p>Due On:</p>
          <h3>{moment(next.pay_date).format('MM/DD')}</h3>
        </section>
        <section
          onClick={() => console.log(next)}
        >
          {/* <p>Pay Now:</p> */}
          <h3>$ {next.amount}</h3>
        </section>
      </div>
    )
  })

  const view = expenses.map((expense, i) => {
    return (
      <div className='recent-expenses' key ={i}>
        <section>
          <h3>{expense.name}</h3>
          <p>{expense.category}</p>
        </section>
        <h3 className='expense-date'>{moment(expense.date_paid).format('MM/DD')}</h3>
        <h2>$ {expense.amount}</h2>
      </div>
    )
  })

  return (
    <div>
      {loading ? (
        <div className='loading'>
          <Loading />
        </div>
      ) : (
      <div className='dash'>
        <div className='expense-graph'>
          <BarChart budget={budgetData} expenses={expensesData}/>
        </div>
        <div className='dash-budget-expense'>
          <div className='budget-expenses'>
            <h3 className='dash-budget'>
              Monthly Budget:
              <br/>
              $ {budget.monthly}
            </h3>
            <h3 className='dash-budget spent'>
              Monthly Spent:
              <br/>
              $ {+current.monthly}
              </h3>
              </div>
              <div className='budget-expenses'>
            <h3 className='dash-budget'>
              Weekly Budget:
              <br/>
              $ {budget.weekly}
            </h3>
            <h3 className='dash-budget spent'>
              Weekly Spent:
              <br/>
              $ {+current.weekly}
            </h3>
          </div>
        </div>
        <div className='dash-friends'>
          <p>Feature coming soon!</p>
        </div>
        <section className='recents'>
          <h3>Expenses:</h3>
          {view}
        </section>
        <section className='recents'>
          <h3>Upcoming:</h3>
          {next}
        </section>
      </div>)}
    </div>
  )
}

export default Dashboard