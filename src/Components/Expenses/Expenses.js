import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import Loading from '../Loading/Loading'
import './Expenses.css'
import ExpenseDisplay from './ExpenseDisplay'

function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({display: false, name: '', category: '', amount: 0})
  const [editting, setEditting] = useState(false)
  const [updatedExpenses, setUpdatedExpenses] = useState({})
  const [deletedExpenses, setDeletedExpenses] = useState([])
  const [recurring, setRecurring] = useState([])
  const [editRecuring, setEditRecurring] = useState({})
  const [filters, setFilters] = useState({filtered : false, name: '', category: '', start: '', end: '', max: '', min: ''})
  const [displayDelete, setDisplayDelete] = useState(false)
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
  }, [rerender, filters])

  const addNewExpense = expense => {
    axios.post('api/expenses', expense)
    .then(() => {
      setNewExpense({display: false, name: '', category: '', amount: 0})
    })
    .catch(err => console.log(err))
  }

  const updateExpenses = () => {
    let updatedArray = []

    for(let key in updatedExpenses){
      updatedArray.push(updatedExpenses[key])
    }

    axios.put('api/expenses', updatedArray)
    .then (() => {
      setUpdatedExpenses({})
      setEditting(false)
      setRerender(true)
    })
  }

  const deleteExpenses = () => {
    axios.post('/api/expenses/remove', deletedExpenses)
    .then(() => {
      setDeletedExpenses([])
    })
  }

  const viewRecurring = recurring.map((purchase, i) => {
    const {name, category, date, amount} = purchase

    return (
      <div key={i} className='recure'>
        {purchase.recurring_id === editRecuring.recurring_id ? (
          <section>
            <input className='recure-name'/>
            <input className='recure-category'/>
            <input className='recure-date'/>
            <input className='recure-amount'/>
            <button>Save</button>
            <button
              onClick={() => {
                setEditRecurring({})
              }}
            >Cancel</button>
            <button
              onClick={() => {
                setDisplayDelete(true)
              }}
            >Delete</button>
          </section>
        ) : (
          <section>
            <h2 className='recure-name'>{name}</h2>
            <h2 className='recure-category'>{category}</h2>
            <h2 className='recure-date'>{moment(date).format('MM/DD/YY')}</h2>
            <h2 className='recure-amount'>$ {amount}</h2>
            <button
              onClick={() => {
                addNewExpense(purchase)
              }}
            >Pay now</button>
            <button
              onClick={() => {
                setEditRecurring(purchase)
              }}
            >Edit</button>
          </section>
        )}
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
                  if(filters.filtered){
                    setFilters({filtered: false, name: '', category: '', start: '', end: '', max: '', min: ''})
                  } else {                    
                    setFilters({...filters, filtered: true})
                  }
                }}
              >Filter
                <img
                  className={filters.filtered ? 'down-arrow' : 'arrow'}
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
                    deleteExpenses()
                  }}
                >Delete</button>
              </div>
            </section>
            <section className={filters.filtered ? 'expense-filter' : ' expense-filter null'}>
              <input
                placeholder='Name'
                value={filters.name}
                onChange={event => {
                  setFilters({...filters, name: event.target.value})
                }}
              />
              <input 
                placeholder='Category'
                value={filters.category}
                onChange={event => {
                  setFilters({...filters, category: event.target.value})
                }}
              />
              <input
                placeholder='Start Date'
                value={filters.start}
                onChange={event => {
                  setFilters({...filters, start: event.target.value})
                }}
              />
              <input
                placeholder='End Date'
                value={filters.end}
                onChange={event => {
                  setFilters({...filters, end: event.target.value})
                }}
              />
              <input
                placeholder='Minimum'
                value={filters.max}
                onChange={event => {
                  setFilters({...filters, max: event.target.value})
                }}
              />
              <input
                placeholder='Maximum'
                value={filters.min}
                onChange={event => {
                  setFilters({...filters, min: event.target.value})
                }}
              />
            </section>
            <div className='expenses-view'>
              <ExpenseDisplay data={{expenses, deletedExpenses, updatedExpenses, setDeletedExpenses, setUpdatedExpenses, editting, filters}}/>
            </div>
          </section>
          <section className={displayDelete ? 'delete-message' : 'null'}>
            <p>Are you sure you want to delete {editRecuring.name} recurring purchase?</p>
            <button>Delete</button>
            <button
              onClick={() => {
                setDisplayDelete(false)
              }}
            >Cancel</button>
          </section>
        </section>
      )}
    </section>
  )
}

export default Expenses