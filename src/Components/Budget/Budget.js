import React, {useState, useEffect} from 'react'
import axios from 'axios'
import BudgetDisplay from '../Budget/BudgetDisplay'
import './Budget.css'
import Loading from '../Loading/Loading'

function Budget() {
  const [loading, setLoading] = useState(false)
  const [budget, setBudget] = useState([])
  const [current, setCurrent] = useState([])

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
      setLoading(false)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
      {loading ? (
        <div className='loading'>
          <Loading />
        </div>
      ) : (
        <section className='budget-route'>
          <BudgetDisplay budget={budget[0]} current={current}/>
        </section>
      )
      }
    </div>
  )
}

export default Budget