import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './BudgetDisplay.css'
import {x, dots} from '../../img.json'

function BudgetDisplay(props){
  const {budget, overall, current, setRerender} = props
  const [budgetView, setBudgetView] = useState('view')
  const [displayDropdown, setDisplayDropdown] = useState(false)
  const [updated, setUpdated] = useState({})
  const [newBudget, setNewBudget] = useState({category: '', amount: 0})

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
      <section className='budget-section'>
          <section className='budget-display'>
              <div className='main-budget'>
                <p className='title-three'>Monthly Budget:</p>
                <p>${spent('Overall')} / ${overall}</p>
                <div className='amount-bar'>
                  <div className='spent-bar'
                    style={{width: `${spent('Overall')/overall*100}%`}}
                  >
                  </div>
                </div>
              </div>
            <div className='sub-budgets'>
              {displayed}
            </div>
          </section>
      </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, )(BudgetDisplay)