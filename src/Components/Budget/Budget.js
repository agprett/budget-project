import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Loading from '../Loading/Loading'
import './Budget.css'
import BreakdownChart from '../BreakdownChart/BreakdownChart'

function Budget(props){
  const {overall} = props.user
  const [loading, setLoading] = useState(false)
  const [budget, setBudget] = useState([])
  const [current, setCurrent] = useState([])
  const [subEdit, setSubEdit] = useState({user_id: '', budget_id: '', amount: '', category: ''})
  const [data, setData] = useState([])
  const [rerender, setRerender] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    axios.get('api/expenses/current')
      .then(res => {
        setCurrent(res.data)
      })
      .catch(err => console.log(err))

    axios.get('api/budget')
      .then(res => {
        setBudget(res.data)
        setTimeout(() => {
          setLoading(false)
        }, 500)
        setRerender(false)
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

  const handleUpdateSubBudget = () => {
    axios.put('/api/budget', subEdit)
    .then(() => {
      setSubEdit({user_id: '', budget_id: '', amount: '', category: ''})
      setRerender(true)
    })
  }

  const viewSubs = budget.map((budget, i) => {
    const {category, amount, budget_id} = budget

    return (
      <section key={i}>
        {subEdit.budget_id === budget_id ? (
          <section className='sub-budget'>
            <p>{category}</p>
            <input
              placeholder={`$${amount}`}
              onChange={event => {
                setSubEdit({...subEdit, amount: event.target.value})
              }}
            ></input>
            <section className='sub-budget-buttons'>
              <button
                onClick={() => {
                  handleUpdateSubBudget()
                }}
              >Save</button>
              {/* <button>Delete</button> */}
              <button
                onClick={() => {
                  setSubEdit({user_id: '', budget_id: '', amount: '', category: ''})
                }}
              >Cancel</button>
            </section>
          </section>
        ) : (
          <section className='sub-budget'>
            <p>{category}:</p>
            <p>${spent(category)} / ${amount}</p>
            <div className='amount-bar'>
              <div className='spent-bar'
                style={{width: `${spent(category)/amount*100}%`}}
              >
              </div>
            </div>
            <button
              onClick={() => {
                setSubEdit(budget)
              }}
            >Edit</button>
          </section>
        )}
      </section>
    )
  })

  return (
    <section>
      {loading === true ? (
        <div className='loading'>
          <Loading/>
        </div>
      ) : (
        <section className='budget-page'>
          <div className='budget-left'>
            <div className='budget-overall'>
            <div>Monthly Budget: {overall}</div>
            <div>Spent: {spent("Overall")}</div>
            <button>Edit</button>
          </div>
            <div className='budget-donut-chart'>
              <BreakdownChart data={data}/>
            </div>
          </div>
          <div className='budgets-sub'>
            {viewSubs}
          </div>
        </section>
      )}
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(Budget)