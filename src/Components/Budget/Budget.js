import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {updateOverall} from '../../ducks/reducer'
import axios from 'axios'
import Loading from '../Loading/Loading'
import './Budget.css'
import BreakdownChart from '../BreakdownChart/BreakdownChart'

function Budget(props){
  const {overall} = props.user
  const [loading, setLoading] = useState(false)
  const [budget, setBudget] = useState([])
  const [current, setCurrent] = useState([])
  const [updatedSub, setUpdatedSub] = useState({user_id: '', budget_id: '', amount: '', category: ''})
  const [updatedMain, setUpdatedMain] = useState(0)
  const [editting, setEditting] = useState({main: false, sub: false})
  const [newSub, setNewSub] = useState({amount: '', category: ''})
  const [data, setData] = useState({})
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
    
    axios.get('/api/user/breakdown')
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.log(err))
      
    axios.get('api/budget')
      .then(response => {
        setBudget(response.data)
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
    axios.put('/api/budget', updatedSub)
    .then(() => {
      setUpdatedSub({user_id: '', budget_id: '', amount: '', category: ''})
      setRerender(true)
    })
  }

  const handleDeleteSubBudget = id => {
    axios.post(`/api/budget/${id}`)
    .then(() => {
      setRerender(true)
    })
  }

  const handleNewSubBudget = () => {
    if(newSub.category && newSub.amount){
      axios.post('/api/budget', newSub)
      .then(() => {
        setNewSub({category: '', amount: ''})
        setEditting({...editting, sub: false})
        setRerender(true)
      })
    } else {
      alert("Please add a category and an amount")
    }
  }

  const handleUpdateMain = () => {
    axios.post(`/api/user/${updatedMain}`)
    .then(() => {
      setEditting({...editting, main: false})
      setUpdatedMain(0)
      props.updateOverall(updatedMain)
      setRerender(true)
    })
  }

  const viewSubs = budget.map((budget, i) => {
    const {category, amount, budget_id} = budget

    return (
      <section key={i}>
        {updatedSub.budget_id === budget_id ? (
          <section className='sub-budget'>
            <p>{category}</p>
            <input
              placeholder={`$${amount}`}
              onChange={event => {
                setUpdatedSub({...updatedSub, amount: event.target.value})
              }}
            ></input>
            <section className='sub-budget-buttons'>
              <button
                onClick={() => {
                  handleUpdateSubBudget()
                }}
              >Save</button>
              <button
                onClick={() => {
                  handleDeleteSubBudget(budget_id)
                }}
              >Delete</button>
              <button
                onClick={() => {
                  setUpdatedSub({user_id: '', budget_id: '', amount: '', category: ''})
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
                setUpdatedSub(budget)
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
          {editting.main ? (
            <div className='budget-overall'>
              <div>
                Monthly Budget: 
                <input 
                  placeholder={overall} 
                  onChange={event => {
                    setUpdatedMain(event.target.value)
                  }}
                  />
              </div>
              <div>Spent: {spent("Overall")}</div>
              <button
                onClick={() => {
                  handleUpdateMain()
                }}
              >Save</button>
              <button
                onClick={() => {
                  setEditting({...editting, main: false})
                  setUpdatedMain(0)
                }}
              >Cancel</button>
            </div>
          ) : (
            <div className='budget-overall'>
              <div>Monthly Budget: {overall}</div>
              <div>Spent: {spent("Overall")}</div>
              <button
                onClick={() => {
                  setEditting({...editting, main: true})
                }}
              >Edit</button>
            </div>
          )}
            <div className='breakdown-chart'>
              <BreakdownChart data={data}/>
            </div>
          </div>
          <div className='budgets-sub'>
            {editting.sub ? (
              <section className='sub-budget'>
                <input
                  placeholder={'Category'}
                  onChange={event => {
                    setNewSub({...newSub, category: event.target.value})
                  }}
                ></input>
                <input
                  placeholder={'Amount'}
                  onChange={event => {
                    setNewSub({...newSub, amount: event.target.value})
                  }}
                ></input>
                <button
                  onClick={() => {
                    handleNewSubBudget()
                  }}
                >Add</button>
                <button
                  onClick={() => {
                    setEditting({...editting, sub: false})
                  }}
                >Cancel</button>
              </section>
            ) : (
              <button
                onClick={() => {
                  setEditting({...editting, sub: true})
                }}
              >New</button>
            )}
            {viewSubs}
          </div>
        </section>
      )}
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {updateOverall})(Budget)