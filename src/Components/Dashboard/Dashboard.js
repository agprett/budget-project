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
  const [condensed, setCondensed] = useState({monthly: 0, weekly: 0, personal: 0, groceries: 0, travel: 0, other: 0})
  const [quickAdd, setQuickAdd] = useState({name: '', category: '', amount: 0})
  // const [upcoming, setUpcoming] = useState([])
  const [loading, setLoading] = useState(false)
  // const [display, setDisplay] = useState(false)
  
  let budgetData = [
    {category: 'Personal', amount: budget.personal},
    {category: 'Groceries', amount: budget.groceries},
    {category: 'Travel', amount: budget.travel},
    {category: 'Other', amount: budget.other}
  ]

  let expensesData = [
    {category: 'Personal', amount: condensed.personal},
    {category: 'Groceries', amount: condensed.groceries},
    {category: 'Travel', amount: condensed.travel},
    {category: 'Other', amount: condensed.other}
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

    axios.get('/api/expenses/current')
    .then(res => {
      setCurrent(res.data)
    })
    .catch(err => console.log(err))

    // axios.get('/api/upcoming')
    // .then(res => {
    //   setUpcoming({})
    // })

    axios.get('/api/expenses/recent')
    .then(res => {
      setExpenses(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 200);
    })
    .catch(err => console.log(err))
    console.log('hit')
  }, [expenses[expenses.length], quickAdd.name === ''])

  const handleQuickAdd = () => {
    axios.post('/api/expenses/new', quickAdd)
    .then(() => {
      setQuickAdd({name: '', category: '', amount: 0})
    })
    .catch(err => console.log(err))
  }

  const view = expenses.map((expense, i) => {
    return (
      <div className='recent' key ={i}>
        <section>
          <h3>{expense.name}</h3>
          <p>{expense.category}</p>
        </section>
        <h3>{moment(expense.date_paid).format('MM/DD')}</h3>
        <h2>$ {expense.amount}</h2>
      </div>
    )
  })

  return (
    <div>
      {loading ? (
        <div>
          <div style={{height: '30vh', width: '100vw'}}></div>
          <Loading />
        </div>
      ) : (
      <div className='dash'>
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
              $ {current.monthly}
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
              $ {current.weekly}
            </h3>
          </div>
        </div>
        <div className='expense-graph'>
          <BarChart budget={budgetData} expenses={expensesData}/>
        </div>
        <section className='dash-upcoming'>list of upcoming</section>
        <div className='recent-expenses'>
          <section className='quick-add'>
            <h3>Quick Add:</h3>
            <input
              placeholder='name'
              name='name'
              value={quickAdd.name}
              onChange={event => setQuickAdd({...quickAdd, name: event.target.value})}
            />
            <input
              placeholder='category'
              name='category'
              value={quickAdd.category}
              onChange={event => setQuickAdd({...quickAdd, category: event.target.value})}
            />
            {/* <button
              className={display ? `cat-expanded cat-button` : `cat-button`}
              onClick={() => setDisplay((display ? false : true))}
            >
              --Select Category--
              <span className='selector' name='entertainment'>Entertainment</span>
              <span className='selector' name='personal_care'>Personal Care</span>
              <span className='selector' name='groceries'>Groceries</span>
              <span className='selector' name='travel'>Travel</span>
              <span className='selector' name='other'>Other</span>
            </button> */}
            <div>
              $<input
                placeholder='amount'
                name='amount'
                value={quickAdd.amount}
                onChange={event => setQuickAdd({...quickAdd, amount: event.target.value})}
              />
            </div>
            <section>
              <button className='quick-add-buttons' onClick={() => handleQuickAdd()}>Add</button>
              <button className='quick-add-buttons' onClick={() => setQuickAdd({name: '', category: '', amount: 0})}>Cancel</button>
            </section>
          </section>
          <section className='recent-view'>{view}</section>
        </div>
        <div className='dash-friends'></div>
      </div>)}
    </div>
  )
}

export default Dashboard