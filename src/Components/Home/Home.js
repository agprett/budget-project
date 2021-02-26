import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import './Home.css'
import Loading from '../Loading/Loading'
import BudgetDisplay from './BudgetDisplay/BudgetDisplay'
import DonutChart from '../DonutChart/DonutChart'

function Home(props){
  const {overall} = props.user
  const {savings, debt} = props
  const [loading, setLoading] = useState(true)
  const [budget, setBudget] = useState([])
  const [current, setCurrent] = useState([])
  const [recent, setRecent] = useState([])
  const [chartData, setChartData] = useState({})
  const [chartColors, setChartColors] = useState([])
  const [recurring, setRecuring] = useState([])
  const [priority, setPriority] = useState({})
  
  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    axios.get('/api/budget')
    .then(res => {
      setBudget(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/recurring')
    .then(res => {
      setRecuring(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/recent')
    .then(res => {
      setRecent(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/goals/1')
    .then(res => {
      setPriority(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/user/chart')
    .then(res => {
      setChartData(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/expenses/current')
    .then(res => {
      setCurrent(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    })
    .catch(err => console.log(err))
  }, [])

  const spent = (category) => {
    let amount

    for(let i = 0; i < current.length; i++){
      if(current[i].category === category){
        return amount = (current[i].amount ? current[i].amount : 0)
      }
      amount = 0
    }

    return amount
  }

  const viewRecent = recent.map((recentExpense, i) => {
    const {name, amount, date} = recentExpense

    return (
      <section className='recent' key={i} style={{backgroundColor: i % 2 === 1 ? '#F5F5F5' : '#987DC1'}}>
        <div>{name}</div>
        <div>{amount}</div>
        <div>{moment(date).format('MM/DD/YY')}</div>
      </section>
    )
  })

  const viewRecuring = recurring.map((recure, i) => {
    const {name, amount, date} = recure

    return (
      <section className='recurring-home' key={i}>
        <div>{name}</div>
        <div>{amount}</div>
        <div>{moment(date).format('MM/DD/YY')}</div>
      </section>
    )
  })
  
  return (
  <div>
    {loading ? (
      <div className='loading'>
        <Loading/>
      </div>
    ) : (
      <div className='home-route'>
        <section className='left-section'>
          <div className='main-budget'>
            <p className='title-three'>Monthly Budget:</p>
            <p>${spent('Overall')} / ${overall}</p>
          </div>
          {/* <div className='line-graph'>
            <BarChart budget={budget} current={current}/>
          </div> */}
          <section className='donut-chart'>
            <DonutChart data={chartData}/>
          </section>
          <BudgetDisplay budget={budget} current={current}/>
        </section>

        <section className='right-section'>
          <section className='recent-expenses'>
            {viewRecent}
          </section>
          <section className='view-recurring'>
            {viewRecuring}
          </section>
          <section className='planning-home'>
            <section className='planning-divs'>
              <h3>Total Savings: $ {savings}</h3>
              <div className='goal-home'>
                <p>Goal:</p>
                <div>{priority.name}</div>
                <div>{moment(priority.goal_date).format('MM/DD/YY')}</div>
                <div>$ {priority.monthly_amount}</div>
                <div>$ {priority.goal_amount}</div>
                <div>$ {priority.saved_amount}</div>
              </div>
            </section>
            <section className='planning-divs'>
              <h3>Total Debt: $ {debt}</h3>
              <div></div>
            </section>
          </section>
        </section>
      </div>
    )}
  </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(Home)