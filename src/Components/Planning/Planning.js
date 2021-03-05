import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import Loading from '../Loading/Loading'
import './Planning.css'

function Planning() {
  const [savings, setSavings] = useState([])
  const [goals, setGoals] = useState([])
  const [debts, setDebts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    axios.get('/api/savings')
    .then(res => {
      setSavings(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/debts')
    .then(res => {
      setDebts(res.data)
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
        <div>{goal_amount}</div>
        <div>{saved_amount}</div>
        <div>{name}</div>
        <div>{moment(goal_date).format('MM/DD/YY')}</div>
        <div>{monthly_amount}</div>
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
            <h3 className='overall-savings'> Total savings: $ {savings.overall}</h3>
            <section className='accounts'>
              <div>accounts</div>
            </section>
            <section className='goals'>
              {viewGoals}
            </section>
          </section>
          <section className='debt'>
            <div className='overall-debt'>Overall Debt</div>
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