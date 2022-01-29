import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {updateOverall} from '../../ducks/reducer'
import axios from 'axios'
import Loading from '../Loading/Loading'
import './Budget.css'
// import BreakdownChart from '../BreakdownChart/BreakdownChart'
// import BarChart from '../BarChart/BarChart'

function Budget(props){
  const [loading, setLoading] = useState(false)
  const [overall, setOverall] = useState(0)
  const [budget, setBudget] = useState([])
  const [current, setCurrent] = useState([])
  const [updatedBudget, setUpdatedBudget] = useState({budget_id: '', amount: ''})
  const [newSub, setNewSub] = useState({adding: false, amount: '', category: ''})
  // const [chartData, setChartData] = useState({budget: [], spent: []})
  const [rerender, setRerender] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    axios.get('/api/current')
      .then(res => {
        setCurrent(res.data)
      })
      .catch(err => console.log(err))

    // axios.get('api/user/breakdown')
    //   .then(res => {
    //     setChartData(res.data)
    //   })
    //   .catch(err => console.log(err))
      
    axios.get('/api/budget')
      .then(res => {
        res.data.forEach((element, index) => {
          if(element.category === "Overall"){
            setOverall(element.amount)
            res.data.splice(index, 1)
          }
        });
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

  const handleUpdateBudget = () => {
    axios.put('/api/budget', updatedBudget)
    .then(() => {
      setUpdatedBudget({budget_id: '', amount: ''})
      setRerender(true)
    })
    .catch(err => {
      alert('Please enter numbers only')
    })
  }

  const handleDeleteSubBudget = id => {
    axios.delete(`/api/budget/${id}`)
    .then(() => {
      setRerender(true)
    })
  }

  const handleNewSubBudget = () => {
    if(newSub.category && newSub.amount){
      axios.post('/api/budget', {category: newSub.category, amount: newSub.amount})
      .then(() => {
        setNewSub({category: '', amount: ''})
        setRerender(true)
      })
      .catch(err => {
        alert('Please enter numbers only')
      })
    } else {
      alert("Please add a category and an amount")
    }
  }

  const handleUpdateMain = () => {
    axios.put(`/api/budget`)
    .then(() => {
      props.updateOverall(updatedBudget.amount)
      setUpdatedBudget({budget_id: '', amount: ''})
      setRerender(true)
    })
    .catch(err => {
      alert('Please enter numbers only')
    })
  }

  const viewSubs = budget.map((budget, i) => {
    const {category, amount, budget_id} = budget

    return (
      <section key={i}>
        {updatedBudget.budget_id === budget_id ? (
          <section className='sub-budget'>
            <p>{category}:</p>
            <input
              placeholder={`$${amount}`}
              onChange={event => {
                setUpdatedBudget({...updatedBudget, amount: event.target.value})
              }}
            ></input>
            <section className='sub-budget-buttons'>
              <button
                onClick={() => {
                  handleUpdateBudget()
                }}
              >Save</button>
              <button
                onClick={() => {
                  handleDeleteSubBudget(budget_id)
                }}
              >Delete</button>
              <button
                onClick={() => {
                  setUpdatedBudget({budget_id: '', amount: ''})
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
                style={{
                  width: `${spent(category)/amount*100}%`,
                  maxWidth: '100%',
                  backgroundColor: (spent(category)/amount < .8 ? 'green' : spent(category)/amount > 1 ? 'red' : 'yellow')
                }}
              >
              </div>
            </div>
            <button
              onClick={() => {
                setUpdatedBudget({budget_id: budget_id, amount: ''})
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
          {updatedBudget.budget_id == 1 ? (
            <div className='budget-overall'>
              <div className='monthly-budget'>
                Monthly Budget: {spent("Overall")} / 
                <input
                  className='monthly-budget-input'
                  placeholder={overall} 
                  onChange={event => {
                    setUpdatedBudget({...updatedBudget, amount: event.target.value})
                  }}
                />
              </div>
              <div className='amount-bar'>
                <div className='spent-bar'
                  style={{
                    width: `${spent('Overall')/overall*100}%`,
                    maxWidth: '100%',
                    backgroundColor: (spent('Overall')/overall < .8 ? 'green' : spent('Overall')/overall > 1 ? 'red' : 'yellow')
                  }}
                >
                </div>
              </div>
              {/* <div className='monthly-budget'>Spent: </div> */}
              <div className='budget-overall-edit-buttons'>
                <button
                  className='budget-overall-edit-button'
                  onClick={() => {
                    handleUpdateBudget()
                  }}
                >Save</button>
                <button
                  className='budget-overall-edit-button'
                  onClick={() => {
                    setUpdatedBudget({budget_id: '', amount: ''})
                  }}
                >Cancel</button>
              </div>
            </div>
          ) : (
            <div className='budget-overall'>
              <div className='monthly-budget'>Monthly Budget: {spent("Overall")} / {overall}</div>
              {/* <div className='monthly-budget'>Spent: </div> */}
              <div className='amount-bar'>
                <div className='spent-bar'
                  style={{
                    width: `${spent('Overall')/overall*100}%`,
                    maxWidth: '100%',
                    backgroundColor: (spent('Overall')/overall < .8 ? 'green' : spent('Overall')/overall > 1 ? 'red' : 'yellow')
                  }}
                >
                </div>
              </div>
              <button
                onClick={() => {
                  setUpdatedBudget({budget_id: 1, amount: ''})
                }}
              >Edit</button>
            </div>
          )}
            {budget.length === 0 ? (
              <div className='breakdown-chart no-viewing'>
                <p>No data to show</p>
              </div>
            ) : (
              <div className='breakdown-chart'>
                {/* <BreakdownChart data={chartData} size={{width: 600, height: 450, margin: 25}}/> */}
                {/* <BreakdownChart data={chartData} size={{width: 300, height: 225, margin: 25}}/> */}
                {/* <BarChart budget={chartData.budget} current={chartData.spent} /> */}
              </div>
            )}
          </div>
          <section className='sub-budgets-section'>
            <div className='new-sub-budget-section'>
              {newSub.adding ? (
                <section className={newSub.adding ? 'sub-budget new-sub-budget' : 'null'}>
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
                  <div className='new-sub-budget-buttons'>
                    <button
                      onClick={() => {
                        handleNewSubBudget()
                      }}
                    >Add</button>
                    <button
                      onClick={() => {
                        setNewSub({...newSub, adding: false})
                      }}
                    >Cancel</button>
                  </div>
                </section>
              ) : (
                <button
                  className={newSub.adding ? 'null' : null}
                  onClick={() => {
                    setNewSub({...newSub, adding: true})
                  }}
                >New</button>
              )}
            </div>
            {budget.length === 0 ? (
              <div style={{margin: '15px auto'}} className='sub-budget no-viewing'>
                <p>No budgets to show</p>
                <p>Add some above</p>
              </div>
            ) : (
              <div className='sub-budget-display'>
                {viewSubs}
              </div>
            )}
          </section>
        </section>
      )}
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {updateOverall})(Budget)