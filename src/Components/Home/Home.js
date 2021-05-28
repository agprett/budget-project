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
  // const {savings, debt} = props
  const [loading, setLoading] = useState(true)
  const [budget, setBudget] = useState([])
  const [current, setCurrent] = useState([])
  const [recent, setRecent] = useState([])
  const [chartData, setChartData] = useState({})
  const [chartColors, setChartColors] = useState([])
  const [recurring, setRecuring] = useState([])
  // const [priority, setPriority] = useState({})
  // const [upcoming, setUpcoming] = useState({})
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

    // axios.get('/api/goals/1')
    // .then(res => {
    //   setPriority(res.data)
    // })
    // .catch(err => console.log(err))

    // axios.get('/api/upcoming')
    // .then(res => {
    //   setUpcoming(res.data)
    // })
    // .catch(err => console.log(err))

    axios.get('/api/user/chart')
    .then(res => {
      setChartData(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/current')
    .then(res => {
      setCurrent(res.data)
      setTimeout(() => {
        setLoading(false)
        setRerender(false)
      }, 500)
    })
    .catch(err => console.log(err))
  }, [rerender])

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

  const handleRecurringPay = (name, category, amount, date, recurring_id) => {
    let newExpense = {name, category, amount, date}
    let updated = {recurring_id, date}
    
    axios.post('/api/expenses', newExpense)
    .then(()=> {
      axios.put('/api/recurring/date', updated)
      .then(() => {
        setRerender(true)
      })
    })
  }

  const viewRecent = recent.map((recentExpense, i) => {
    const {name, category, amount, date} = recentExpense

    return (
      <section className='recent' key={i} style={{backgroundColor: i % 2 === 1 ? '#F5F5F5' : '#987DC1'}}>
        <div className='expense-name'>{name}</div>
        <div className='expense-category'>{category}</div>
        <div className='expense-date'>{moment(date).format('MM/DD/YY')}</div>
        <div className='expense-amount'>$ {amount}</div>
      </section>
    )
  })

  const viewRecuring = recurring.map((recure, i) => {
    const {name, amount, date, category, recurring_id} = recure

    return (
      <section className='recurring-home' key={i}>
        <div>{name}</div>
        <div>$ {amount}</div>
        <div>{category}</div>
        <div>{moment(date).format('MM/DD/YY')}</div>
        <button
          onClick={() => {
            handleRecurringPay(name, category, amount, date, recurring_id)
          }}
        >Pay Now</button>
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
        <section className='home-left'>
          <section className='home-lt'>
            <div className='home-budget'>
              <p className='title-three'>Monthly Budget:</p>
              <p>${spent('Overall')} / ${overall}</p>
            </div>
            <section className='donut-chart'>
              <DonutChart data={chartData}/>
            </section>
          </section>
          <BudgetDisplay budget={budget} current={current}/>
        </section>

        <section className='home-right'>
          <section className='recent-expenses'>
            {viewRecent}
          </section>
          <section className='view-recurring'>
            {viewRecuring}
          </section>
          <section className='planning-home'>
            Savings and Debt Tracker coming soon!
            {/* <section className='planning-divs'>
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
              <p>Upcoming:</p>
              <div>{upcoming.name}</div>
              <div>$ {upcoming.total}</div>
              <div>$ {upcoming.paid}</div>
              <div>{moment(upcoming.due).format('MM/DD/YY')}</div>
            </section> */}
          </section>
        </section>
      </div>
    )}
  </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(Home)