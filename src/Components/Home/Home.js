import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Home.css'
import Loading from '../Loading/Loading'
import BarChart from '../BarChart/BarChart'
import {remove, update, check, x} from '../img.json'

function Home(){
  const [loading, setLoading] = useState(false)
  const [budget, setBudget] = useState([])
  const [expenses, setExpenses] = useState([])
  // const [current, setCurrent] = useState([])
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

    // axios.get('/api/expenses/current')
    // .then(res => {
    //   setCurrent(res.data)
    // })
    // .catch(err => console.log(err))

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
        
        <h4 style={{position: 'absolute', right: '50px', bottom: '4px'}}>{moment(date).format('MM/DD/YY')}</h4>
        
        <h2 style={{position: 'absolute', right: '50px', top: '4px'}}>$ {amount}</h2>
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
          <div className='line-graph'>
            <BarChart budget={budget} expenses={[]}/>
          </div>
          <section className='expense-section'>
            {expenses[0] ? viewExpenses : <section style={{textAlign: 'center'}}>No Expenses to Show</section>}
            {/* <p style={{marginTop: '5px'}} ><Link to='/expenses' style={{color: 'white'}}>See more...</Link></p> */}
          </section>
        </section>

        <section className='bottom-section'>
          <section className='quick-view'>Debt</section>
          <section className='quick-view'>Savings</section>
          <section className='quick-view'>
            Recurring
          </section>
        </section>
      </div>
    )}
  </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(Home)