import React, {useState, useEffect} from 'react'
import moment from 'moment'
import axios from 'axios'
import './Budget.css'
import BudgetDisplay from './BudgetDisplay'
import Loading from '../Loading/Loading'
import DonutChart from './DonutChart'
import Dropdown from '../Dropdown/Dropdown'
import {remove, update, check, x} from '../img.json'

function Budget(){
  const [budget, setBudget] = useState({})
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({name: '', category: '', amount: 0})
  const [current, setCurrent] = useState({weekly: 0, monthly: 0})
  const [condensed, setCondensed] = useState({personal: 0, groceries: 0, travel: 0, other: 0})
  const [time, setTime] = useState('monthly')
  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState({expense: false, upcoming: false})
  const [displayed, setDisplayed] = useState({expense: '', upcoming: ''})
  const [editting, setEditting] = useState({expense: null, upcoming: null})
  const [editExpense, setEditExpense] = useState({})
  const [rerender, setRerender] = useState(false)

  let chartData = time === 'monthly' ? (
    {
      budget: budget.monthly - current.monthly,
      expense: +current.monthly
    }
  ) : (
    {
      budget: budget.weekly - current.weekly,
      pExpense: condensed.personal,
      gExpense: condensed.groceries,
      tExpense: condensed.travel,
      oExpense: condensed.other
    }
  )
  
  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    axios.get('/api/budget')
    .then(res => {
      setBudget(res.data)
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

    axios.get('/api/expenses')
    .then(res => {
      setExpenses(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    })
    .catch(err => console.log(err))
    
    setRerender(false)
  }, [rerender])

  const addNewExpense = () => {
    axios.post('/api/expenses/new', newExpense)
    .then(() => {
      setNewExpense({name: '', category: '', amount: 0})
      setDisplayed({...displayed, expense: ''})
    })
    .catch(err => console.log(err))
  }

  const handleClick = (data) => {
    setNewExpense({...newExpense, category: data})
  }

  const handleEditExpense = () => {
    axios.put(`/api/expenses/${editting.expense}`, editExpense)
    .then(() => {
      setEditting({...editting, expense: null})
      setEditExpense({})
      setRerender(true)
    })
    .catch(err => console.log(err))
  }

  const viewExpenses = expenses.map((expense, i) => { 
    const {expense_id, name, category, date_paid, amount} = expense

    return (
      <section key={i} className='view-expense'>
        <div>
          {editting.expense === expense_id ? (
          <input
            onChange={event => setEditExpense({...editExpense, name: event.target.value})}
            placeholder={name}
          />
          ) : <h2>{name}</h2>}
          <p>{category}</p>
        </div>
        {editting.expense === expense_id ? (
          <input
            onChange={event => setEditExpense({...editExpense, date_paid: event.target.value})}
            placeholder='mm/dd/yyyy'
            style={{position: 'absolute', right: '60px', bottom: '7px', width: '20%'}}
          />
        ) : (
          <h4 style={{position: 'absolute', right: '60px', bottom: '7px'}}>{moment(date_paid).format('MM/DD')}</h4>
        )}
        {editting.expense === expense_id ? (
          <input
            onChange={event => setEditExpense({...editExpense, amount: event.target.value})}
            style={{position: 'absolute', right: '60px', top: '7px', width: '15%'}}
            placeholder={amount}
          />
        ) : <h2 style={{position: 'absolute', right: '60px', top: '7px'}}>$ {amount}</h2>}
        <section className='buttons-section'>
          {editting.expense === expense_id ? (
            <section className='expense-buttons'>
              <img
                onClick={() => {
                  handleEditExpense()
                  setRerender(true)
                }}
                className='bud-button'
                src={check}
                alt='check'
              />
              <img
                onClick={() => {
                  setEditting({...editting, expense: null})
                  setEditExpense({})
                }}
                className='bud-button'
                src={x}
                alt='x'
              />
            </section>
          ) : (
            <section className='expense-buttons'>
              <img
                onClick={() => {
                  setEditting({...editting, expense: expense_id})
                  setEditExpense({name: name, date_paid: date_paid, amount: amount})
                }}
                className='bud-button'
                src={update}
                alt='update'
              />
              <img
                onClick={() => {
                  axios.delete(`/api/expenses/${expense_id}`)
                    .then(() => {
                      setRerender(true)
                    })
                    .catch(err => console.log(err))
                }}
                className='bud-button'
                src={remove}
                alt='remove'
              />
            </section>
          )}
        </section>
      </section>
    )
  })
  
  return (
  <div>
    {loading ? (
      <div className='loading'>
        <Loading />
      </div>
    ) : (
      <div className='budget-route'>
        <section className='budget'>
          <section className='pie-chart'>
            <DonutChart data={chartData}/>
          </section>
          <BudgetDisplay budget={budget} setBudget={setBudget} condensed={condensed} current={current} time={time}/>
        </section>

        <section className='bottom-section'>
          {/* <section className='viewer'> */}
            <section className='add-form'>
              <section className='add-left'>
                <input
                  placeholder='Name'
                  value={newExpense.name}
                  style={{width: '100%', position: 'absolute', top: 0}}
                  onChange={event => setNewExpense({...newExpense, name: event.target.value})}
                />

                <Dropdown />
                {/* <button
                  style={{width: '100%', position: 'absolute', bottom: 0}}
                  className={display.expense ? `cat-expanded select-cat` : `select-cat`}
                  onClick={() => setDisplay({...display, expense: !display.expense})}
                >
                  {displayed.expense ? displayed.expense : '--Select Category--'}
                  <span
                    className='selector'
                    id='personal'
                    onClick={event => {
                      handleClick(event.target.id)
                      setDisplayed({...displayed, expense: 'Personal'})
                    }}
                  >Personal</span>
                  <span
                    className='selector'
                    id='groceries'
                    onClick={event => {
                      handleClick(event.target.id)
                      setDisplayed({...displayed, expense: 'Groceries'})
                    }}
                  >Groceries</span>
                  <span
                    className='selector'
                    id='travel'
                    onClick={event => {
                      handleClick(event.target.id)
                      setDisplayed({...displayed, expense: 'Travel'})
                    }}
                  >Travel</span>
                  <span
                    className='selector'
                    id='other'
                    onClick={event => {
                      handleClick(event.target.id)
                      setDisplayed({...displayed, expense: 'Other'})
                    }}
                  >Other</span>
                </button> */}
              </section>
              <input
                className='form-amount'
                value={newExpense.amount}
                onChange={event => setNewExpense({...newExpense, amount: event.target.value})}
              />
              <div className='add-form-buttons'>
                <button
                  onClick={() => {
                    addNewExpense()
                    setNewExpense({name: '', category: '', amount: 0})
                    setRerender(true)
                  }}
                >Add</button>
                <button
                  onClick={() => {
                    setNewExpense({name: '', category: '', amount: 0})
                    setDisplayed({...displayed, expense: ''})
                  }}
                >Cancel</button>
              </div>
            </section>
            <div className='expenses' style={{marginBottom: '10px'}}>
              <h2>Expenses:</h2>
              {expenses[0] ? viewExpenses : <section className='view-expense' style={{textAlign: 'center'}}>No Expenses to Show</section>}
            </div>
          </section>
        {/* </section> */}
      </div>
    )}
  </div>
  )
}

export default Budget