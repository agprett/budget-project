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
  const [quickAdd, setQuickAdd] = useState({name: '', category: '', amount: 0})
  // const [upcoming, setUpcoming] = useState([])
  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState(false)
  const [displayed, setDisplayed] = useState('')
  
  let budgetData = [
    {category: 'Personal', amount: budget.personal},
    {category: 'Groceries', amount: budget.groceries},
    {category: 'Travel', amount: budget.travel},
    {category: 'Other', amount: budget.other}
  ]

  let expensesData = [
    {category: 'Personal', amount: condensed.personal, color: condensed.personal > budget.personal ? 'red' : budget.personal * .8 < condensed.personal ? 'orange' : 'green'},
    {category: 'Groceries', amount: condensed.groceries, color: condensed.groceries > budget.groceries ? 'red' : budget.groceries * .8 < condensed.groceries ? 'orange' : 'green'},
    {category: 'Travel', amount: condensed.travel, color: condensed.travel > budget.travel ? 'red' : budget.travel * .8 < condensed.travel ? 'orange' : 'green'},
    {category: 'Other', amount: condensed.other, color: condensed.other > budget.other ? 'red' : budget.other * .8 < condensed.other ? 'orange' : 'green'}
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

    // axios.get('/api/upcoming')
    // .then(res => {
    //   setUpcoming({})
    // })

    axios.get('/api/expenses/recent')
    .then(res => {
      setExpenses(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 500);
    })
    .catch(err => console.log(err))
    console.log('hit')
  }, [quickAdd.name === ''])

  const handleQuickAdd = () => {
    axios.post('/api/expenses/new', quickAdd)
    .then(() => {
      setQuickAdd({name: '', category: '', amount: 0})
      setDisplayed('')
    })
    .catch(err => console.log(err))
  }

  const handleQuickClick = (data) => {
    setQuickAdd({...quickAdd, category: data})
  }

  const view = expenses.map((expense, i) => {
    return (
      <div className='recent' key ={i}>
        <section>
          <h3>{expense.name}</h3>
          <p>{expense.category}</p>
        </section>
        <h3 style={{position: 'absolute', right: '125px'}}>{moment(expense.date_paid).format('MM/DD')}</h3>
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
              style={{position: 'absolute', top: '60px', width: '90%'}}
              onChange={event => setQuickAdd({...quickAdd, name: event.target.value})}
            />
            <button
              className={display ? `cat-expanded cat-button` : `cat-button`}
              onClick={() => setDisplay((display ? false : true))}
            >
              {displayed ? displayed : '--Select Category--'}
              <span
                className='selector'
                id='personal'
                onClick={event => {
                  handleQuickClick(event.target.id)
                  setDisplayed('Personal')
                }}
                >Personal</span>
              <span
                className='selector'
                id='groceries'                
                onClick={event => {
                  handleQuickClick(event.target.id)
                  setDisplayed('Groceries')
                }}
                >Groceries</span>
              <span
                className='selector'
                id='travel'                
                onClick={event => {
                  handleQuickClick(event.target.id)
                  setDisplayed('Travel')
                }}
                >Travel</span>
              <span
                className='selector'
                id='other'                
                onClick={event => {
                  handleQuickClick(event.target.id)
                  setDisplayed('Other')
                }}
              >Other</span>
            </button>
            <div style={{position: 'absolute', top: '160px', zIndex: 0}}>
              Amount: <input
                placeholder='amount'
                name='amount'
                value={quickAdd.amount}
                onChange={event => setQuickAdd({...quickAdd, amount: event.target.value})}
              />
            </div>
            <section style={{display: 'flex', justifyContent: 'space-around'}}>
              <button className='quick-add-buttons' onClick={() => handleQuickAdd()}>Add</button>
              <button className='quick-add-buttons' onClick={() => setQuickAdd({name: '', category: '', amount: 0}, setDisplayed(''))}>Cancel</button>
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