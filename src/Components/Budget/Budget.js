import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Budget.css'
import BudgetDisplay from './BudgetDisplay'
import Loading from '../Loading/Loading'

function Budget(){
  const [budget, setBudget] = useState({})
  const [upcoming, setUpcoming] = useState([])
  const [newUpcoming, setNewUpcoming] = useState({name: '', category: '', amount: 0})
  const [expenses, setExpenses] = useState([])
  const [current, setCurrent] = useState({weekly: 0, monthly: 0})
  const [newExpense, setNewExpense] = useState({name: '', category: '', amount: 0})
  const [time, setTime] = useState('monthly')
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    axios.get('/api/budget')
    .then(res => {
      setBudget(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/upcoming')
    .then(res => {
      setUpcoming(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/expenses/current')
    .then(res => {
      setCurrent(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/expenses')
    .then(res => {
      setExpenses(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 200)
    })
    .catch(err => console.log(err))
  }, [newExpense.name === ''], [newUpcoming.name === ''])

  const addNewExpense = () => {
    axios.post('/api/expenses/new', newExpense)
    .then(() => {
      setNewExpense({name: '', category: '', amount: 0})
    })
    .catch(err => console.log(err))
  }

  const addNewUpcoming = () => {
    axios.post('/api/upcoming/new', newUpcoming)
    .then(() => {
      setNewExpense({name: '', category: '', amount: 0})
    })
    .catch(err => console.log(err))
  }
  
  const viewExpenses = expenses.map((expense, i) => {
    return (
      <section key={i} className='view-expense' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h2>{expense.name}</h2>
          <p>{expense.category}</p>
        </div>
        <h2>$ {expense.amount}</h2>
      </section>
    )
  })
  
  const viewUpcoming = upcoming.map((upcoming, i) => {
    return (
      <section key={i} className='view-expense' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h2>{upcoming.name}</h2>
          <p>{upcoming.category}</p>
        </div>
        <h2>$ {upcoming.amount}</h2>
      </section>
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
      <div className='budget-route'>
        <section style={{margin: '0 auto 20px auto'}}>
          <button
            className={time === 'monthly' ? 'pressed' : null}
            style={{height: '25px', width: '55px', borderRadius: '10px 0 0 10px', outline: 'none'}}
            onClick={() => setTime('monthly')}
          >Monthly</button>
          <button
            className={time === 'weekly' ? 'pressed' : null}
            style={{height: '25px', width: '55px', borderRadius: '0 10px 10px 0', outline: 'none'}}
            onClick={() => setTime('weekly')}
          >Weekly</button>
        </section>
        <section className='budget'>
          <section className='pie-chart'>budget pie chart</section>
          <BudgetDisplay budget={budget} setBudget={setBudget} current={current} time={time}/>
          <section className='line-graph'>
            expense line graph
          </section>
        </section>
        <section className='new-section'>
          <section className='add-forms'>
            <input
              placeholder='Name'
              value={newExpense.name}
              onChange={event => setNewExpense({...newExpense, name: event.target.value})}
            />
            <input
              value={newExpense.category}
              onChange={event => setNewExpense({...newExpense, category: event.target.value})}
            />
            {/* <input type='checkbox'/> */}
            <input
              value={newExpense.amount}
              onChange={event => setNewExpense({...newExpense, amount: event.target.value})}
            />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <button
                onClick={() => {
                  addNewExpense()
                  setNewExpense({name: '', category: '', amount: 0})
                }}
              >Add</button>
              <button
                onClick={() => setNewExpense({name: '', category: '', amount: 0})}
              >Cancel</button>
            </div>
          </section>
          <section className='add-forms'>
            <input
              placeholder='Name'
              value={newUpcoming.name}
              onChange={event => setNewUpcoming({...newUpcoming, name: event.target.value})}
            />
            <input
              value={newUpcoming.category}
              onChange={event => setNewUpcoming({...newUpcoming, category: event.target.value})}
            />
            {/* <input type='checkbox'/> */}
            <input
              value={newUpcoming.amount}
              onChange={event => setNewUpcoming({...newUpcoming, amount: event.target.value})}
            />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <button
                onClick={() => {
                  addNewUpcoming()
                  setNewUpcoming({name: '', category: '', amount: 0})
                }}
              >Add</button>
              <button
                onClick={() => setNewUpcoming({name: '', category: '', amount: 0})}
              >Cancel</button>
            </div>
          </section>
        </section>
        <section className='viewer'>
          <div className='expenses'>
            {expenses[0] ? viewExpenses : <section className='view-expense' style={{textAlign: 'center'}}>No Expenses to Show</section>}
          </div>
          <div className='upcoming'>
            {upcoming[0] ? viewUpcoming : <section className='view-expense' style={{textAlign: 'center'}}>No Upcoming to Show</section>}
          </div>
        </section>
      </div>
    )}
  </div>
  )
}

export default Budget