import React, {useState} from 'react'
import {connect} from 'react-redux'
import {updateBudget} from '../../ducks/budgetReducer'
import axios from 'axios'

function BudgetDisplay(props){
  const {budget, current} = props
  const [editting, setEditting] = useState(false)
  const [updatedBudget, setUpdatedBudget] = useState({})

  const handleUpdate = () => {
    axios.put('/api/budget', updatedBudget)
      .then(() => {
        setEditting(false)
        setUpdatedBudget({})
      })
      .catch(err => console.log(err))
  }

  return (
    <section>
      <section className='budget-amounts'>
        <section>
          <h4>Monthly Expense:</h4>
          {current.monthly ? <p className='amount'>$ {current.monthly}</p> : <p className='amount'>$ 0</p>}
          <h4>Monthly Budget:</h4>
          {editting ? (
            <input
              placeholder={budget.monthly}
              onChange={event => setUpdatedBudget({...budget, monthly: +event.target.value})}
            />
          ) : (
            <p className='amount'>$ {budget}</p>
          )}
        </section>
        {editting ? (
          <section className='budget-edit'>
            <button onClick={() => {
              props.updateBudget({...budget, ...updatedBudget})
              handleUpdate()
            }}>Update</button>
            <button onClick={() => {
              setUpdatedBudget({})
              setEditting(false)
            }}>Cancel</button>
          </section>
        ) : (
          <button className='budget-edit' onClick={() => setEditting(true)}>Edit</button>
        )}
      </section>
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {updateBudget})(BudgetDisplay)