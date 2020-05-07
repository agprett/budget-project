import React, {useState, useEffect} from 'react'
import './Dash.css'
import axios from 'axios'
import BarChart from '../BarChart/BarChart'
import Loading from '../Loading/Loading'

function Dashboard(){
  const [budget, setBudget] = useState({monthly: 0, weekly: 0, entertainment: 0, personal_care: 0, groceries: 0, travel: 0, other: 0})
  // const [upcoming, setUpcoming] = useState([])
  const [expenses, setExpenses] = useState([])
  const [quickAdd, setQuickAdd] = useState({name: '', category: '', amount: 0})
  const [loading, setLoading] = useState(false)
  // const [display, setDisplay] = useState(false)
  
  let budgetData = [
    {category: 'Entertainment', amount: budget.entertainment},
    {category: 'Personal Care', amount: budget.personal_care},
    {category: 'Groceries', amount: budget.groceries},
    {category: 'Travel', amount: budget.travel},
    {category: 'Other', amount: budget.other}
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
    axios.post('/api/expenses/quick', quickAdd)
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
        <h2>Amount: $ {expense.amount}</h2>
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
              $ 300
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
              $ 300
            </h3>
          </div>
        </div>
        <div className='expense-graph'>
          <BarChart budget={budgetData}/>
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