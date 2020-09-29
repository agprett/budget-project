import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import './Home.css'
import Loading from '../Loading/Loading'
import BarChart from '../BarChart/BarChart'
import BudgetDisplay from '../Budget/BudgetDisplay'
import {remove, update, check, x} from '../img.json'

function Home(props){
  const [loading, setLoading] = useState(false)
  const [budget, setBudget] = useState([])
  const [expenses, setExpenses] = useState([])
  const [recurring, setRecurring] = useState([])
  const [savings, setSavings] = useState([])
  const [current, setCurrent] = useState([])
  // const [display, setDisplay] = useState({expense: false, upcoming: false})
  const [editting, setEditting] = useState({expense: null, upcoming: null})
  const [editExpense, setEditExpense] = useState({})
  const [rerender, setRerender] = useState(false)
  
  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    axios.get('/api/budget')
    .then(res => {
      setBudget(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/expenses/current')
    .then(res => {
      setCurrent(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/recurring')
    .then(res => {
      setRecurring(res.data)
    })

    axios.get('/api/savings')
    .then(res => {
      setSavings(res.data)
    })

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

  const handleEditExpense = () => {
    axios.put(`/api/expenses/${editting.expense}`, editExpense)
    .then(() => {
      setEditting({...editting, expense: null})
      setEditExpense({})
      setRerender(true)
    })
    .catch(err => console.log(err))
  }

  const viewExpenses = expenses.slice(0, 5).map((expense, i) => { 
    const {expense_id, name, category, date, amount} = expense

    return (
      <section key={i} className='expenses'>
        <div>
          <h2>{name}</h2>
          <p>{category}</p>
        </div>
        
        <h4 style={{position: 'absolute', right: '50px', bottom: '7px'}}>{moment(date).format('MM/DD/YY')}</h4>
        
        <h2 style={{position: 'absolute', right: '50px', top: '7px'}}>$ {amount}</h2>
        <section>
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
      <div className='home-route'>
        <section className='top-section'>
          <BudgetDisplay budget={budget} current={current}></BudgetDisplay>
          <div className='line-graph'>
            <BarChart budget={budget} expenses={[]}/>
          </div>
          <section className='expense-section'>
            {expenses[0] ? viewExpenses : <section style={{textAlign: 'center'}}>No Expenses to Show</section>}
          </section>
        </section>

        <section className='bottom-section'>
          {savings ? (
            <section className='quick-view'>
              <h3> Total savings: $ {savings.overall}</h3>
            </section>
          ) : null}
          {recurring[0] ? (
            <section className='quick-view'>
              <h3>Next Recurring Payment:</h3>
              <h2>{recurring[0].name}</h2>
              <h4>Category: {recurring[0].category}</h4>
              <p>$ {recurring[0].amount}</p>
              <p>{moment(recurring[0].pay_date).format('MM/DD/YY')}</p>
              <button>Pay</button>
            </section> 
          ) : null}
          <section className='quick-view'>
            <h3>Total Debt: $ 0</h3>
          </section>
        </section>
      </div>
    )}
  </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(Home)