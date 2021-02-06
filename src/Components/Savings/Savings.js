import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import Loading from '../Loading/Loading'
import './Savings.css'

function Savings() {
  const [savings, setSavings] = useState([])
  const [goals, setGoals] = useState([])
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
  
  return (
    <section>
      {loading ? (
        <div className='loading'>
          <Loading/>
        </div>
      ) : (
        <section className='savings'>
          <h3 className='overall-savings'> Total savings: $ {savings.overall}</h3>
          <section className='goals'>
            {viewGoals}
          </section>
          <section className='accounts'>
            <div>accounts</div>
          </section>
        </section>
      )}
    </section>
  )
}

export default Savings