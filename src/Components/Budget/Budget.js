import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import './Budget.css'

function Budget(props){
  const {overall} = props.user
  const [budget, setBudget] = useState([])
  const [current, setCurrent] = useState([])

  useEffect(() => {
    axios.get('api/expenses/current')
      .then(res => {
        setCurrent(res.data)
      })
      .catch(err => console.log(err))

    axios.get('api/budget')
      .then(res => {
        setBudget(res.data)
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

  const viewSubs = budget.map((budget, i) => {
    const {category, amount} = budget

    return (
      <section className='sub-budget' key={i}>
        <p>{category}:</p>
        <p>${spent(category)} / ${amount}</p>
        <div className='amount-bar'>
          <div className='spent-bar'
            style={{width: `${spent(category)/amount*100}%`}}
          >
          </div>
        </div>
      </section>
    )
  })

  return (
    <section className='budget-page'>
      <div className='budget-left'>
        <div className='budget-overall'>
          <div>Monthly Budget: {overall}</div>
          <div>amounts</div>
        </div>
        <div className='budget-pie-chart'>Pie Chart</div>
      </div>
      <div className='sub-budgets'>
        {viewSubs}
      </div>
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(Budget)