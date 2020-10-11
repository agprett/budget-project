import React from 'react'
import {connect} from 'react-redux'
import './Budget.css'

function BudgetDisplay(props){
  const {budget, current} = props

  const spent = (category) => {
    let amount

    for(let i = 0; i < current.length; i++){
      if(current[i].category === category){
        amount = current[i].amount ? current[i].amount : 0
      }
    }

    return amount
  }

  const displayed = budget.map((budget, i) => {
    const {category, amount} = budget

    return (
      <section key={i}>
        <p>{category}:</p>
        <p>${spent(category)} / ${amount}</p>
      </section>
    )
  })

  return (
    <section>
      <section className='budget-amounts'>
        {displayed}
      </section>
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, )(BudgetDisplay)