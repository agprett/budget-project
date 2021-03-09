import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import Loading from '../Loading/Loading'
import './Planning.css'

function Planning() {
  const [savings, setSavings] = useState([])
  const [goals, setGoals] = useState([])
  const [debts, setDebts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    axios.get('/api/debts')
    .then(res => {
      setDebts(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/total')
    .then(res => {
      setTotal(res.data.sum)
    })
    .catch(err => console.log(err))

    axios.get('/api/savings')
    .then(res => {
      setSavings(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/goals')
    .then(res => {
      setGoals(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    })
    .catch(err => console.log(err))
  }, [])

  const viewGoals = goals.map((goal, i) => {
    const {goal_amount, saved_amount, name, goal_date, monthly_amount} = goal
    
    return (
      <section key={i} className='savings-goal'>
        <div>{name}</div>
        <div>$ {goal_amount}</div>
        <div>$ {saved_amount}</div>
        <div>{moment(goal_date).format('MM/DD/YY')}</div>
        <div>$ {monthly_amount}</div>
      </section>
    )
  })

  const viewDebts = debts.map((debt, i) => {
    const {name, total, monthly, paid, due} = debt

    return (
      <section key = {i} className='debts'>
        <div>{name}</div>
        <div>$ {total}</div>
        <div>$ {monthly}</div>
        <div>$ {paid}</div>
        <div>{moment(due).format('MM/DD/YY')}</div>
      </section>
    )
  })
  
  return (
    <section>
      {loading ? (
        <div className='loading'>
          <Loading/>
        </div>
      ) : (
        <section className='planning'>
          <section className='savings'>
            <div className='planning-overall'> 
              <h3>Total savings: </h3>
              <h3>$ {savings.overall}</h3>
            </div>
            <section className='accounts'>
              <div>accounts</div>
            </section>
            <section className='goals'>
              {viewGoals}
            </section>
          </section>
          <section className='debt'>
            <div className='planning-overall'>
              <h3>Overall Debt: </h3>
              <h3>$ {total}</h3>
            </div>
            <div className='debts-display'>
              {viewDebts}
            </div>
          </section>
        </section>
      )}
    </section>
  )
}

export default Planning