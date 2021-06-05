import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import Loading from '../Loading/Loading'
import Dropdown from '../Dropdown/Dropdown'
import './Expenses.css'
import ExpenseDisplay from './ExpenseDisplay'

function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [expenseLimit, setExpenseLimit] = useState(15)
  const [newExpense, setNewExpense] = useState({display: false, name: '', category: '', amount: 0})
  const [viewDropdown, setViewDropdown] = useState(false)
  const [rerenderDisplay, setRerenderDisplay] = useState(false)
  const [editting, setEditting] = useState(false)
  const [updatedExpenses, setUpdatedExpenses] = useState({})
  const [deletedExpenses, setDeletedExpenses] = useState([])
  const [recurring, setRecurring] = useState([])
  const [newRecurring, setNewRecurring] = useState({display: false, name: '', category:'', amount: '', date: ''})
  const [updatedRecurring, setUpdatedRecurring] = useState({recurring_id: '', name: '', category: '', date: '', amount: ''})
  const [filters, setFilters] = useState({filtered : false, name: '', category: '', start: '', end: '', max: '', min: ''})
  const [displayDelete, setDisplayDelete] = useState({display: false, id: ''})
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

    axios.get(`/api/expenses/${expenseLimit}`)
    .then(res => {
      setExpenses(res.data.expenses)
      setExpenseLimit(res.data.limit)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    })
    .catch(err => console.log(err))

    setRerender(false)
  }, [rerender])

  const addNewExpense = expense => {
    axios.post('/api/expenses', expense)
    .then(() => {
      setNewExpense({display: false, name: '', category: '', amount: 0})
      setRerender(true)
    })
    .catch(err => console.log(err))
  }

  const handleUpdateExpenses = () => {
    let updatedArray = []

    for(let key in updatedExpenses){
      updatedArray.push(updatedExpenses[key])
    }

    axios.put('/api/expenses', updatedArray)
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
      axios.get(`/api/expenses/${expenseLimit}`)
        .then(res => {
          setExpenses(res.data.expenses)
          setExpenseLimit(res.data.limit)
        })
    })
  }
  
  const updateRecurring = () => {
    axios.put('/api/recurring', updatedRecurring)
    .then(() => {
      setUpdatedRecurring({recurring_id: '', name: '', category: '', date: '', amount: ''})
      setRerender(true)
    })
  }

  const handleRecurringPay = (name, category, date, amount, recurring_id) => {
    let newExpense = {name, category, amount, date}
    let updated = {recurring_id, date}
    
    axios.post('/api/expenses', newExpense)
    .then(()=> {
      axios.put('/api/recurring/date', updated)
      .then(() => {
        setRerender(true)
      })
    })
    .catch(err => console.log(err))
  }

  const handleNewRecurring = () => {
    axios.post('/api/recurring', newRecurring)
    .then(() => {
      setNewRecurring({display: false, name: '', category:'', amount: '', date: ''})
      setRerender(true)
    })
  }

  const handleRecurringDelete = () => {
    axios.post(`/api/recurring/${displayDelete.id}`)
    .then(() => {
      setRerender(true)
      setDisplayDelete({display: false, id: ''})
    })
  }

  const handleLoadMoreExpenses = () => {
    axios.get(`/api/expenses/${expenseLimit + 15}`)
    .then(res =>  {
      setExpenses(res.data.expenses)
      setExpenseLimit(res.data.limit)
    })
  }

  const handleLoadLessExpenses = () => {
    axios.get(`/api/expenses/${expenseLimit - 15}`)
    .then(res =>  {
      setExpenses(res.data.expenses)
      setExpenseLimit(res.data.limit)
    })
  }
  
  const viewRecurring = recurring.map((recurring, i) => {
    const {name, category, date, amount, recurring_id} = recurring

    return (
      <div key={i} className='recure'>
        {recurring.recurring_id === updatedRecurring.recurring_id ? (
          <section>
            <input
              className='recure-name'
              placeholder={name}
              onChange={event => {
                setUpdatedRecurring({...updatedRecurring, name: event.target.value})
              }}
            />
            {/* <input
              className='recure-category'
              placeholder={category}
              onChange={event => {
                setUpdatedRecurring({...updatedRecurring, category: event.target.value})
              }}
            /> */}
            <section className='expense-category-dropdown'>
                  <button
                    onClick={() => {
                      viewDropdown ? setViewDropdown(false) : setViewDropdown(true)
                    }}
                  >{updatedRecurring.category ? updatedRecurring.category : 'Select Category'}
                    <img
                      className={viewDropdown ? 'down-arrow' : 'arrow'}
                      src='https://image.flaticon.com/icons/png/512/16/16038.png'
                      alt='arrow'
                    />
                  </button>
                  <section className={viewDropdown ? null : 'null'}>
                    <Dropdown rerender data={updatedRecurring} setDropdownCategory={setUpdatedRecurring} view={viewDropdown} setView={setViewDropdown}/>
                  </section>
                </section>
            <input
              className='recure-date'
              placeholder={moment(date).format('MM/DD/YY')}
              onChange={event => {
                setUpdatedRecurring({...updatedRecurring, date: event.target.value})
              }}
            />
            <input
              className='recure-amount'
              placeholder={amount}
              onChange={event => {
                setUpdatedRecurring({...updatedRecurring, amount: +event.target.value})
              }}
            />
            <button
              onClick={() => {
                updateRecurring()
              }}
            >Save</button>
            <button
              onClick={() => {
                setUpdatedRecurring({})
                setViewDropdown(false)
              }}
            >Cancel</button>
            <button
              onClick={() => {
                setDisplayDelete({display: true, id: recurring.recurring_id})
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
                handleRecurringPay(name, category, date, amount, recurring_id)
              }}
            >Pay now</button>
            <button
              onClick={() => {
                setUpdatedRecurring(recurring)
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
            <button
              onClick={() => {
                setNewRecurring({display: true, name: '', category:'', amount: '', date: ''})
              }}
            >Add New Recurring</button>
            <section className={newRecurring.display ? 'recure' : 'null'}>
              <input
                // className='recure-name'
                placeholder='Name'
                value={newRecurring.name}
                onChange={event => {
                  setNewRecurring({...newRecurring, name: event.target.value})
                }}
              />
              {/* <input
                className='recure-category'
                placeholder='Category'
                value={newRecurring.category}
                onChange={event => {
                  setNewRecurring({...newRecurring, category: event.target.value})
                }}
              /> */}
              <section className='expense-category-dropdown'>
                  <button
                    onClick={() => {
                      viewDropdown ? setViewDropdown(false) : setViewDropdown(true)
                    }}
                  >{newRecurring.category ? newRecurring.category : 'Select Category'}
                    <img
                      className={viewDropdown ? 'down-arrow' : 'arrow'}
                      src='https://image.flaticon.com/icons/png/512/16/16038.png'
                      alt='arrow'
                    />
                  </button>
                  <section className={viewDropdown ? null : 'null'}>
                    <Dropdown rerender data={newRecurring} setDropdownCategory={setNewRecurring} view={viewDropdown} setView={setViewDropdown}/>
                  </section>
                </section>
              <input
                className='recure-amount'
                placeholder='Amount'
                value={newRecurring.amount}
                onChange={event => {
                  setNewRecurring({...newRecurring, amount: event.target.value})
                }}
              />
              <input
                className='recure-date'
                placeholder='Date'
                value={newRecurring.date}
                onChange={event => {
                  setNewRecurring({...newRecurring, date: event.target.value})
                }}
              />
              <button
                onClick={() => {
                  handleNewRecurring()
                }}
              >Save</button>
              <button
                onClick={() => {
                  setNewRecurring({display: false, name: '', category:'', amount: '', date: ''})
                  setViewDropdown(false)
                }}
              >Cancel</button>
            </section>
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
                <section className='expense-category-dropdown'>
                  <button
                    onClick={() => {
                      viewDropdown ? setViewDropdown(false) : setViewDropdown(true)
                    }}
                  >{newExpense.category ? newExpense.category : 'Select Category'}
                    <img
                      className={viewDropdown ? 'down-arrow' : 'arrow'}
                      src='https://image.flaticon.com/icons/png/512/16/16038.png'
                      alt='arrow'
                    />
                  </button>
                  <section className={viewDropdown ? null : 'null'}>
                    <Dropdown rerender data={newExpense} setDropdownCategory={setNewExpense} view={viewDropdown} setView={setViewDropdown}/>
                  </section>
                </section>
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
                    setViewDropdown(false)
                  }}
                  >Cancel</button>
                </div>
              ) : null
            }
            <section className='modify-expenses'>
              {editting ? (
                <div className={editting ? 'editting-buttons' : 'null'}>
                  <p>Click on expense to edit, then click the checkbox to delete</p>
                  <button
                    onClick={() => {
                      handleUpdateExpenses()
                    }}
                  >Save</button>
                  <button
                    onClick={() => {
                      setEditting(false)
                      setUpdatedExpenses({})
                      setDeletedExpenses([])
                      setViewDropdown(false)
                    }}
                  >Cancel</button>
                  <button
                    className={deletedExpenses[0] ? null : 'null'}
                    onClick={() => {
                      deleteExpenses()
                    }}
                  >Delete</button>
                </div>
              ) : (
                <section>
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
                  <section className={filters.filtered ? 'expense-filter' : 'expense-filter null'}>
                    <input
                      placeholder='Name'
                      value={filters.name}
                      onChange={event => {
                        setFilters({...filters, name: event.target.value})
                      }}
                    />
                    <section className='expense-category-dropdown'>
                      <button
                        onClick={() => {
                          viewDropdown ? setViewDropdown(false) : setViewDropdown(true)
                        }}
                      >{filters.category ? filters.category : 'Select Category'}
                        <img
                          className={viewDropdown ? 'down-arrow' : 'arrow'}
                          src='https://image.flaticon.com/icons/png/512/16/16038.png'
                          alt='arrow'
                        />
                      </button>
                      <section className={viewDropdown ? null : 'null'}>
                        <Dropdown rerender={rerender} data={filters} setDropdownCategory={setFilters} view={viewDropdown} setView={setViewDropdown}/>
                      </section>
                    </section>
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
                      value={filters.min}
                      onChange={event => {
                        setFilters({...filters, min: event.target.value})
                      }}
                    />
                    <input
                      placeholder='Maximum'
                      value={filters.max}
                      onChange={event => {
                        setFilters({...filters, max: event.target.value})
                      }}
                    />
                  </section>
                </section>
              )}
            </section>
            <div className='expenses-view'>
              <ExpenseDisplay
                data={{expenses, deletedExpenses, updatedExpenses, setDeletedExpenses, setUpdatedExpenses, editting, filters, setRerenderDisplay, rerenderDisplay, viewDropdown, setViewDropdown}}
              />
              <button
                className='load-more-button'
                onClick={() => {
                  handleLoadMoreExpenses()
                }}
              >Load more</button>
              <button
                className={expenseLimit > 15 ? 'load-more-button' : 'null'}
                onClick={() => {
                  handleLoadLessExpenses()
                }}
              >Load less</button>
            </div>
          </section>
          <section className={displayDelete.display ? 'delete-message' : 'null'}>
            <p>Are you sure you want to delete {updatedRecurring.name} recurring purchase?</p>
            <button
              onClick={() => {
                handleRecurringDelete(displayDelete.id)
              }}
            >Delete</button>
            <button
              onClick={() => {
                setDisplayDelete({display: false, id: ''})
              }}
            >Cancel</button>
          </section>
        </section>
      )}
    </section>
  )
}

export default Expenses