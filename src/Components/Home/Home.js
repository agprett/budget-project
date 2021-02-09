import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import './Home.css'
import Loading from '../Loading/Loading'
// import BarChart from '../BarChart/BarChart'
// import DonutChart from '../DonutChart/DonutChart'
import BudgetDisplay from './BudgetDisplay/BudgetDisplay'

function Home(props){
  const {overall} = props.user
  const [loading, setLoading] = useState(true)
  const [budget, setBudget] = useState([])
  const [current, setCurrent] = useState([])
  const [expenses, setExpenses] = useState([])
  const [chartData, setChartData] = useState({})
  const [recurring, setRecuring] = useState([])
  // const [savings, setSavings] = useState([])
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

    axios.get('/api/expenses/current')
    .then(res => {
      setCurrent(res.data)
      let donut = {}
      for(let i = 0; i < res.data.length; i++){
        if(res.data[i].category !== 'Overall'){
          let key = res.data[i].category
          donut[key] = res.data[i].amount
        }
      }
      setChartData(donut)
    })
    .catch(err => console.log(err))

    // axios.get('/api/recurring')
    // .then(res => {
    //   setRecurring(res.data)
    // })
    // .catch(err => console.log(err))

    // axios.get('/api/savings')
    // .then(res => {
    //   setSavings(res.data)
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

  const viewRecuring = recurring.map((recure, i) => {
    const {name, amount, date} = recure

    return (
      <section className='view-recurring' key={i}>
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
          <section className='pie-chart'>
            <p className='title-one'>Title One</p>
            <p className='title-two'>Title Two</p>
            <p className='title-three'>Title Three</p>
            <p className='text-one'>Text One</p>
            <p className='text-two'>Text Two</p>
            <p className='text-three'>Text Three</p>
            <p className='text-four'>Text Four</p>
          </section>
          <BudgetDisplay budget={budget} current={current} setRerender={setRerender}/>
        </section>

        {/* <Expenses expenses={expenses} setExpenses={setExpenses} setRerender={setRerender}/> */}

        <section className='right-section'>
          <section className='quick-view'>
            <h3>Savings</h3>
          </section>
          <section className='quick-view'>
            <div>{viewRecuring}</div>
          </section>
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