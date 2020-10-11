import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
// import moment from 'moment'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import './Home.css'
import Loading from '../Loading/Loading'
// import BarChart from '../BarChart/BarChart'
import DonutChart from '../DonutChart/DonutChart'
import BudgetDisplay from '../Budget/BudgetDisplay'
import Expenses from '../Expenses/Expenses'
// import Savings from '../Savings/Savings'
// import Recurring from '../Recurring/Recurring'
// import {remove, update, check, x} from '../img.json'

function Home(){

  const [loading, setLoading] = useState(false)
  const [budget, setBudget] = useState([])
  const [current, setCurrent] = useState([])
  const [expenses, setExpenses] = useState([])
  const [chartData, setChartData] = useState({})
  // const [recurring, setRecurring] = useState([])
  // const [savings, setSavings] = useState([])
  // const [newExpense, setNewExpense] = useState({name: '', category: '', amount: ''})
  // const [editExpense, setEditExpense] = useState({})
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

  // const handleEditExpense = () => {
  //   axios.put(`/api/expenses/${editting.expense}`, editExpense)
  //   .then(() => {
  //     setEditting({...editting, expense: null})
  //     setEditExpense({})
  //     setRerender(true)
  //   })
  //   .catch(err => console.log(err))
  // }

  // const addNewExpense = () => {
  //   axios.post('/api/expenses', newExpense)
  //   .then(() => {
  //     setNewExpense({name: '', category: '', amount: 0})
  //     setRerender(true)
  //   })
  // }
  
  return (
  <div>
    {loading ? (
      <div className='loading'>
        <Loading />
      </div>
    ) : (
      <div className='home-route'>
        <section className='top-section'>
          <BudgetDisplay budget={budget} current={current}/>
          {/* <div className='line-graph'>
            <BarChart budget={budget} current={current}/>
          </div> */}
          <section className='pie-chart'>
            <DonutChart data={chartData}/>
          </section>
        </section>

        <Expenses expenses={expenses} setRerender={setRerender}/>

        {/* <section className='bottom-section'>
          {recurring[0] ? (
            <Recurring recurring={recurring}/>
          ) : null}
          {savings ? (
            <Savings savings={savings}/>
          ) : null}
          <section className='quick-view'>
            <h3>Total Debt: $ 0</h3>
          </section>
        </section> */}
      </div>
    )}
  </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(Home)