import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import Loading from '../Loading/Loading'
import './Expenses.css'

function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({display: false, name: '', category: '', amount: 0})
  const [editting, setEditting] = useState(false)
  const [updatedExpenses, setUpdatedExpenses] = useState({})
  const [deletedExpenses, setDeletedExpenses] = useState([])
  const [recurring, setRecurring] = useState([])
  const [filterDropdown, setFilterDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const [rerender, setRerender] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    axios.get('/api/recurring')
    .then(res => {
      setRecurring(res.data)
    })
    .catch(err => console.log(err))

    axios.get('/api/expenses')
    .then(res => {
      setExpenses(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    })
    .catch(err => console.log(err))

    setRerender(false)
  }, [rerender])

  const addNewExpense = expense => {
    axios.post('api/expenses', expense)
    .then(() => {
      setNewExpense({display: false, name: '', category: '', amount: 0})
    })
    .catch(err => console.log(err))
  }

  const updateExpenses = () => {
    axios.put('api/expenses', updatedExpenses)
    .then (() => {
      setUpdatedExpenses({})
      setEditting(false)
      setRerender(true)
    })
  }
  
  const viewExpenses = expenses.map((expense, i) => { 
    const {name, category, date, amount, expense_id} = expense
    let view = 'normal'
    let remove = false

    for( let i = 0; i < deletedExpenses.length; i++){
      if(deletedExpenses[i] == expense_id){
        remove = true
      }
    }

    for(let key in updatedExpenses){
      if(key == expense_id){
        view = 'editting'
      }
    }

    if(view === 'editting'){
      return (
        <section key={i} className='expenses' style={{backgroundColor: i % 2 === 1 ? '#F5F5F5' : '#987DC1'}}>
          <input
            className='expense-name'
            placeholder={name}
            onChange={event => {
              setUpdatedExpenses({...updatedExpenses, [expense_id]: {...updatedExpenses[expense_id], name: event.target.value}})
            }}
            />
          <input
            className='expense-category'
            placeholder={category}
            onChange={event => {
              setUpdatedExpenses({...updatedExpenses, [expense_id]: {...updatedExpenses[expense_id], category: event.target.value}})
            }}
            />
          <input
            className='expense-date'
            placeholder={moment(date).format('MM/DD/YY')}
            onChange={event => {
              setUpdatedExpenses({...updatedExpenses, [expense_id]: {...updatedExpenses[expense_id], date: event.target.value}})
            }}
            />
          <input
            className='expense-amount'
            placeholder={amount}
            onChange={event => {
              setUpdatedExpenses({...updatedExpenses, [expense_id]: {...updatedExpenses[expense_id], amount: event.target.value}})
            }}
            />
          <input
            type='checkbox'
            onClick={() => {
              remove = !remove
              if(remove){
                setDeletedExpenses([...deletedExpenses, expense_id])
              } else {
                console.log('hit')
                for(let i = 0; i < deletedExpenses.length; i++){
                  if(deletedExpenses[i] == expense_id){
                    let array = deletedExpenses
                    array.splice(i, 1)
                    setDeletedExpenses(array)
                  }
                }
              }
            }}
          />
        </section>
      )
    } else {
      return (
        <section
          key={i} className='expenses' style={{backgroundColor: i % 2 === 1 ? '#F5F5F5' : '#987DC1'}}
          onClick={() => {
            if(editting){
              setUpdatedExpenses({...updatedExpenses, [expense_id]: expense})
            }
            console.log(typeof(expense_id))
          }}
        >
          <h2 className='expense-name'>{name}</h2>
          <p className='expense-category'>{category}</p>
          <h4 className='expense-date'>{moment(date).format('MM/DD/YY')}</h4>
          <h2 className='expense-amount'>$ {amount}</h2>
        </section>
      )
    }
  })

  const viewRecurring = recurring.map((purchase, i) => {
    const {name, category, date, amount} = purchase

    return (
      <div key={i} className='recure'>
        <h2 className='recure-name'>{name}</h2>
        <h2 className='recure-category'>{category}</h2>
        <h2 className='recure-date'>{moment(date).format('MM/DD/YY')}</h2>
        <h2 className='recure-amount'>$ {amount}</h2>
        <button
          onClick={() => {
            addNewExpense(purchase)
          }}
        >Pay now</button>
      </div>
    )
  })

  return (
    <section>
      {loading ? (
        <div className='loading'>
          <Loading/>
        </div>
      ) : (
        <section className='expense-section'>
          <section className='recurring'>
              {viewRecurring}
          </section>
          <section className='expense-right'>
            {newExpense.display ? (
              <div className='new-expense'>
                <input
                  placeholder='Name'
                  value={newExpense.name}
                  onChange={event => {
                    setNewExpense({...newExpense, name: event.target.value})
                  }}
                />
                <input
                  placeholder='Category'
                  value={newExpense.category}
                  onChange={event => {
                    setNewExpense({...newExpense, category: event.target.value})
                  }}
                />
                <input
                  placeholder='Amount'
                  value={newExpense.amount}
                  onChange={event => {
                    setNewExpense({...newExpense, amount: +event.target.value})
                  }}
                />
                <button
                  onClick={() => {
                    addNewExpense(newExpense)
                  }}
                  >Submit</button>
                  <button
                  onClick={() => {
                    setNewExpense({display: false, name: '', category: '', amount: 0})
                  }}
                  >Cancel</button>
                </div>
              ) : null
            }
            <section className='modify-expenses'>
              <button
                onClick={() => {
                  setNewExpense({...newExpense, display: true})
                }}
              >New</button>
              <button
                onClick={() => {
                  setEditting(true)
                }}
              >Edit</button>
              <button
                onClick={() => {
                  if(filterDropdown){
                    setFilterDropdown(false)
                  } else {                    
                    setFilterDropdown(true)
                  }
                }}
              >Filter
                <img
                  className={filterDropdown ? 'down-arrow' : 'arrow'}
                  src='https://image.flaticon.com/icons/png/512/16/16038.png'
                  alt='arrow'
                />
              </button>
              <div className={editting ? 'editting-buttons' : 'null'}>
                <p>Click on expense to edit</p>
                <button
                  onClick={() => {
                    updateExpenses()
                  }}
                >Save</button>
                <button
                  onClick={() => {
                    setEditting(false)
                    setUpdatedExpenses({})
                    setDeletedExpenses([])
                  }}
                >Cancel</button>
                <button
                  className={deletedExpenses[0] ? null : 'null'}
                  onClick={() => {

                  }}
                >Delete</button>
              </div>
            </section>
            <section className={filterDropdown ? 'expense-filter' : ' expense-filter null'}>
              <input
                placeholder='Name'
              />
              <input 
                placeholder='Category'
              />
              <input
                placeholder='Start Date'
              />
              <input
                placeholder='End Date'
              />
              <input
                placeholder='Minimum'
              />
              <input
                placeholder='Maximum'
              />
            </section>
            <div className='expenses-view'>
              {expenses[0] ? viewExpenses : <div style={{textAlign: 'center'}}>No Expenses to Show</div>}
            </div>
          </section>
        </section>
      )}
    </section>
  )
}

export default Expenses