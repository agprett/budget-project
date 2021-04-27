import React from 'react'
import {connect} from 'react-redux'
import './BudgetDisplay.css'

function BudgetDisplay(props){
  const {budget, current} = props

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

  const displayed = budget.map((budget, i) => {
    const {category, amount} = budget
    
    return (
      <section className='home-sub-budget' key={i}>
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
    <section className='budget-section'>
      <div className='sub-budgets'>
        {displayed}
      </div>
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, )(BudgetDisplay)