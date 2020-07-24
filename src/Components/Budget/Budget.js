import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import './Budget.css'
import BudgetDisplay from './BudgetDisplay'
import Loading from '../Loading/Loading'
import DonutChart from './DonutChart'
// import Dropdown from '../Dropdown/Dropdown'
import {remove, update, check, x} from '../img.json'

function Budget(props){
  const {budget} = props.budgetReducer
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({name: '', category: '', amount: 0})
  const [current, setCurrent] = useState({monthly: 0})
  const [time, setTime] = useState('monthly')
  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState({expense: false, upcoming: false})
  const [editting, setEditting] = useState({expense: null, upcoming: null})
  const [editExpense, setEditExpense] = useState({})
  const [rerender, setRerender] = useState(false)
  
  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    // axios.get('/api/expenses/condensed')
    // .then(res => {
    //   setCondensed(res.data)
    // })
    // .catch(err => console.log(err))

    // axios.put('/api/expenses/condensed')
    // .then(() => console.log('recondensed'))
    // .catch(err => console.log(err))

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
    axios.post('/api/expenses', newExpense)
    .then(() => {
      setNewExpense({name: '', category: '', amount: 0})
      setRerender(true)
    })
    .catch(err => console.log(err))
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
    const {expense_id, name, category, date, amount} = expense

    return (
      <section key={i} className='view-expense'>
        <div>
          <h2>{name}</h2>
          <p>{category}</p>
        </div>
        
        <h4 style={{position: 'absolute', right: '60px', bottom: '7px'}}>{moment(date).format('MM/DD')}</h4>
        
        <h2 style={{position: 'absolute', right: '60px', top: '7px'}}>$ {amount}</h2>
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
                  setEditExpense({name: name, date: date, amount: amount})
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
            <DonutChart data={budget}/>
          </section>
          <BudgetDisplay budget={budget} current={current} time={time}/>
        </section>

        <section className='bottom-section'>
          {/* <section className='viewer'> */}
            <section className='add-form'>
              {/* <section className='add-left'> */}
                <input
                  placeholder='Name'
                  value={newExpense.name}
                  onChange={event => setNewExpense({...newExpense, name: event.target.value})}
                />
                <input
                  placeholder='Category'
                  value={newExpense.category}
                  onChange={event => setNewExpense({...newExpense, category: event.target.value})}
                />
                {/* <Dropdown /> */}
              {/* </section> */}
              <input
                className='form-amount'
                value={newExpense.amount}
                onChange={event => setNewExpense({...newExpense, amount: event.target.value})}
              />
              <div className='add-form-buttons'>
                <button
                  style={{margin: '10px'}}
                  onClick={() => {
                    addNewExpense()
                    setNewExpense({name: '', category: '', amount: 0})
                    setRerender(true)
                  }}
                  >Add</button>
                <button
                  style={{margin: '10px'}}
                  onClick={() => {
                    setNewExpense({name: '', category: '', amount: 0})
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

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(Budget)