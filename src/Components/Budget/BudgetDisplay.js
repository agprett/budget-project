import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './Budget.css'
import {x, dots} from '../img.json'

function BudgetDisplay(props){
  const {budget, current, setRerender} = props
  const [budgetView, setBudgetView] = useState('view')
  const [displayDropdown, setDisplayDropdown] = useState(false)
  const [updated, setUpdated] = useState({})
  const [newBudget, setNewBudget] = useState({category: '', amount: 0})

  const spent = (category) => {
    let amount

    for(let i = 0; i < current.length; i++){
      if(current[i].category === category){
        return amount = current[i].amount
      }
      amount = 0
    }

    return amount
  }

  const displayed = budget.map((budget, i) => {
    const {category, amount} = budget

    if(budgetView === 'view'){
      return (
        <section key={i}>
          <p>{category}:</p>
          <p>${spent(category)} / ${amount}</p> 
        </section>
      )
    } else if(budgetView === 'edit'){
      return (
        <section key={i}>
          <p>{category}:</p>
          <input
            placeholder={amount}
            value={updated[category]}
            onChange={data => (
              setUpdated({...updated, [category]: +data.target.value})
            )}
          />
        </section>
      )
    }
  })

  return (
    <section>
      <section className='budget-section'>
        {displayDropdown ? (
          <section className='edit-dropdown'>
            <img
              className='button-img'
              src={x}
              alt='x'
              onClick={() => setDisplayDropdown(false)}
            />
            <section className='dropdown-options'>
              <button className='dropdown-option'
                onClick={() => {
                  setBudgetView('view')
                  setDisplayDropdown(false)
                }}
              >View Budget Amounts</button>
              <button className='dropdown-option'
                onClick={() => {
                  setBudgetView('edit')
                  setDisplayDropdown(false)
                }}
              >Edit Budget Amounts</button>
              <button className='dropdown-option'
                onClick={() => {
                  // setBudgetView('new')
                  setDisplayDropdown(false)
                }}
              >New Budget</button>
            </section>
          </section>
        ) : (
          <img
            className='edit-dropdown button-img'
            src={dots}
            alt='...'
            onClick={() => {setDisplayDropdown(true)}}
          />
        )}
        {budgetView === 'new' ? (
          <section className='new-budget'>
            <input
              placeholder='Category'
              value={newBudget.category}
              onChange={data => {
                setNewBudget({...newBudget, category: data.target.value})
              }}
            />
            <input
              placeholder='Amount'
              value={newBudget.amount}
              onChange={data => {
                setNewBudget({...newBudget, amount: data.target.value})
              }}
            />
            <button
              onClick={() => {
                axios.post('/api/budget', newBudget)
                .then(() => {
                  setRerender(true)
                  setNewBudget({category: '', amount: 0})
                  setBudgetView('view')
                })
                .catch(() => alert('Failed to add'))
              }}
            >Save</button>
          </section>
        ) : (
          <section>
            {displayed}
            {budgetView === 'edit' ? (
              <button
                onClick={() => {
                  axios.put('/api/budget', updated)
                  .then(() => {
                    setUpdated({})
                    setRerender(true)
                  })
                }}
              >Update</button>
            ) : null }
          </section>
        )}
      </section>
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, )(BudgetDisplay)