import React, {useState, useEffect} from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import Loading from '../Loading/Loading.js'
import Dropdown from '../Dropdown/Dropdown.js'
import './Expenses.css'
import ExpenseDisplay from './ExpenseDisplay.js'
import Calendar from '../Calendar/Calendar.js'

function Expenses() {
  const [loading, setLoading] = useState(true)
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({display: false, name: '', category: '', amount: 0})
  const [filters, setFilters] = useState({limit: 15, offset: 0, name: '', category: '', start: '', end: '', max: '', min: ''})
  const [viewDropdown, setViewDropdown] = useState({newExpense: false, filter: false, updatedRecurring: false, newRecurring: false})
  const [viewCalendar, setViewCalendar] = useState({newExpense: false, start: false, end: false, updatedRecurring: false, newRecurring: false})
  const [editting, setEditting] = useState(false)
  const [updatedExpenses, setUpdatedExpenses] = useState({})
  const [deletedExpenses, setDeletedExpenses] = useState([])
  // const [recurring, setRecurring] = useState([])
  // const [newRecurring, setNewRecurring] = useState({display: false, name: '', category:'', amount: '', date: ''})
  // const [updatedRecurring, setUpdatedRecurring] = useState({recurring_id: '', name: '', category: '', date: '', amount: ''})
  // const [displayDelete, setDisplayDelete] = useState({display: false, id: ''})
  const [rerender, setRerender] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    // axios.get('/api/recurring/0')
    // .then(res => {
    //   setRecurring(res.data)
    // })
    // .catch(err => console.log(err))

    axios.get(`/api/expenses?limit=15&offset=0`)
    .then(res => {
      setExpenses(res.data.expenses)
      setFilters(res.data.filters)
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
    .catch(err => {
      alert('Please enter numbers only')
    })
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
    .catch(err => {
      alert('Please enter numbers only')
    })
  }
  
  const deleteExpenses = () => {
    axios.delete('/api/expenses', {data: deletedExpenses})
    .then(() => {
      setDeletedExpenses([])
      setRerender(true)
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  // const updateRecurring = () => {
  //   axios.put('/api/recurring', updatedRecurring)
  //   .then(() => {
  //     setUpdatedRecurring({recurring_id: '', name: '', category: '', date: '', amount: ''})
  //     setRerender(true)
  //   })
  //   .catch(err => {
  //     alert('Please enter numbers only')
  //   })
  // }

  // const handleRecurringPay = (name, category, date, amount, recurring_id) => {
  //   let newExpense = {name, category, amount, date}
  //   let updated = {recurring_id, date}
    
  //   axios.post('/api/expenses', newExpense)
  //   .then(()=> {
  //     axios.put('/api/recurring/date', updated)
  //     .then(() => {
  //       setRerender(true)
  //     })
  //   })
  //   .catch(err => console.log(err))
  // }

  // const handleNewRecurring = () => {
  //   axios.post('/api/recurring', newRecurring)
  //   .then(() => {
  //     setNewRecurring({display: false, name: '', category:'', amount: '', date: ''})
  //     setRerender(true)
  //   })
  //   .catch(err => {
  //     alert('Please enter numbers only')
  //   })
  // }

  // const handleRecurringDelete = (recurring_id) => {
  //   axios.post(`/api/recurring/${recurring_id}`)
  //   .then(() => {
  //     setRerender(true)
  //     setDisplayDelete({display: false, id: ''})
  //   })
  // }

  // const handleLimitExpenses = (type) => {
  //   if(type === 'plus'){
  //     axios.get(`/api/expenses?limit=${filters.limit + 15}&offset=${filters.offset}`)
  //     .then(res =>  {
  //       setExpenses(res.data.expenses)
  //       setFilters({...filters, limit: res.data.filters.limit})
  //     })
  //   } else if(type === 'minus'){
  //     axios.get(`/api/expenses/${filters.limit - 15}`)
  //     .then(res =>  {
  //       setExpenses(res.data.expenses)
  //       setFilters({...filters, limit: res.data.filters.limit})
  //     })
  //   }
  // }
  
  // const viewRecurring = recurring.map((recurring, i) => {
  //   const {name, category, date, amount, recurring_id} = recurring

  //   return (
  //     <div key={i} className='recurring-displays'>
  //       {recurring.recurring_id === updatedRecurring.recurring_id ? (
  //         <section className='recure'>
  //           <input
  //             className='recure-name'
  //             placeholder={name}
  //             onChange={event => {
  //               setUpdatedRecurring({...updatedRecurring, name: event.target.value})
  //             }}
  //           />
  //           <section className='expense-category-dropdown'>
  //             <button
  //               onClick={() => {
  //                 viewDropdown.updatedRecurring ? (
  //                   setViewDropdown({...viewDropdown, updatedRecurring: false}) 
  //                 ) : (
  //                   setViewDropdown({...viewDropdown, updatedRecurring: true})
  //                 )
  //               }}
  //             >{updatedRecurring.category ? updatedRecurring.category : 'Select Category'}
  //               <img
  //                 className={viewDropdown.updatedRecurring ? 'down-arrow' : 'arrow'}
  //                 src='https://image.flaticon.com/icons/png/512/16/16038.png'
  //                 alt='arrow'
  //               />
  //             </button>
  //             <section className={viewDropdown.updatedRecurring ? null : 'null'}>
  //               <Dropdown rerender data={updatedRecurring} setDropdownCategory={setUpdatedRecurring} view={viewDropdown} setView={setViewDropdown} dropdownSelection='updatedRecurring'/>
  //             </section>
  //           </section>
            // <input
            //   className='recure-date'
            //   placeholder={dayjs(date).format('MM/DD/YY')}
            //   onChange={event => {
            //     setUpdatedRecurring({...updatedRecurring, date: event.target.value})
            //   }}
            // />
  //           <section className={viewCalendar.updatedRecurring ? 'calendar-view-date' : null}>
  //             <div className='calendar-date-buttons'>
  //               <button
  //                 onClick={() => {
  //                   setViewCalendar({...viewCalendar, updatedRecurring: true})
  //                 }}
  //               >{updatedRecurring.date ? dayjs(updatedRecurring.date).format('MM/DD/YY') : dayjs(date).format('MM/DD/YY')}</button>
  //               <button
  //                 className={date ? null : 'null'}
  //                 onClick={() => {
  //                   setUpdatedRecurring({...updatedRecurring, date: ''})
  //                 }}
  //               >Clear</button>
  //             </div>
  //             <div className={viewCalendar.updatedRecurring ? null : 'null'}>
  //               <Calendar setSelectedDate={setUpdatedRecurring} selectedDate={updatedRecurring} view={viewCalendar} setView={setViewCalendar} data={{setValue: 'date', displayValue: 'updatedRecurring'}}/>
  //             </div>
  //           </section>
  //           <input
  //             className='recure-amount'
  //             placeholder={amount}
  //             onChange={event => {
  //               setUpdatedRecurring({...updatedRecurring, amount: event.target.value})
  //             }}
  //           />
  //           <div className='recurring-button-div'>
  //             <button
  //               onClick={() => {
  //                 updateRecurring()
  //               }}
  //             >Save</button>
  //             <button
  //               onClick={() => {
  //                 setUpdatedRecurring({})
  //                 setViewDropdown({newExpense: false, filter: false, updatedRecurring: false, newRecurring: false})
  //               }}
  //             >Cancel</button>
  //           </div>
  //           <button
  //             onClick={() => {
  //               handleRecurringDelete(recurring_id)
  //             }}
  //           >Delete</button>
  //         </section>
  //       ) : (
  //         <section className='recure'>
  //           <h2 className='recure-name'>{name}</h2>
  //           <h2 className='recure-category'>{category}</h2>
  //           <h2 className='recure-date'>{dayjs(date).format('MM/DD/YY')}</h2>
  //           <h2 className='recure-amount'>$ {amount}</h2>
  //           <div className='recurring-button-div'>              
  //             <button
  //               onClick={() => {
  //                 handleRecurringPay(name, category, date, amount, recurring_id)
  //               }}
  //             >Pay</button>
  //             <button
  //               onClick={() => {
  //                 setUpdatedRecurring(recurring)
  //               }}
  //             >Edit</button>
  //           </div>
  //         </section>
  //       )}
  //     </div>
  //   )
  // })

  return (
    <section>
      {loading ? (
        <div className='loading'>
          <Loading/>
        </div>
      ) : (
        <section className='expense-section'>
          <section className='expense-left'>
            {/* {newRecurring.display ? (
              <section className='new-recure'>
                <input
                  // className='recure-name'/
                //   placeholder='Name'
                //   value={newRecurring.name}
                //   onChange={event => {
                //     setNewRecurring({...newRecurring, name: event.target.value})
                //   }}
                // />
                {/* <input
                  className='recure-category'
                  placeholder='Category'
                  value={newRecurring.category}
                  onChange={event => {
                    setNewRecurring({...newRecurring, category: event.target.value})
                  }}
                /> */}
                {/* <section className='expense-category-dropdown'>
                  <button
                    onClick={() => {
                      viewDropdown.newRecurring ? (
                        setViewDropdown({...viewDropdown, newRecurring: false})
                      ) : (
                        setViewDropdown({...viewDropdown, newRecurring: true})
                      )
                    }}
                  >{newRecurring.category ? newRecurring.category : 'Select Category'}
                    <img
                      className={viewDropdown.newRecurring ? 'down-arrow' : 'arrow'}
                      src='https://image.flaticon.com/icons/png/512/16/16038.png'
                      alt='arrow'
                    />
                  </button>
                  <section className={viewDropdown.newRecurring ? null : 'null'}>
                    <Dropdown rerender data={newRecurring} setDropdownCategory={setNewRecurring} view={viewDropdown} setView={setViewDropdown} dropdownSelection='newRecurring'/>
                  </section>
                </section> */}
                {/* <input
                  className='recure-date'
                  placeholder='Date'
                  value={newRecurring.date}
                  onChange={event => {
                    setNewRecurring({...newRecurring, date: event.target.value})
                  }}
                />
                <section className={viewCalendar.newRecurring ? 'calendar-view-date' : null}>
                  <div className='calendar-date-buttons'>
                    <button
                      onClick={() => {
                        setViewCalendar({...viewCalendar, newRecurring: true})
                      }}
                    >{newRecurring.date ? dayjs(newRecurring.date).format('MM/DD/YY') : 'Select Date'}</button>
                    <button
                      className={newRecurring.date ? null : 'null'}
                      onClick={() => {
                        setNewRecurring({...newRecurring, date: ''})
                      }}
                    >Clear</button>
                  </div>
                  <div className={viewCalendar.newRecurring ? null : 'null'}>
                    <Calendar setSelectedDate={setNewRecurring} selectedDate={newRecurring} view={viewCalendar} setView={setViewCalendar}data={{setValue: 'date', displayValue: 'newRecurring'}}/>
                  </div>
                </section>
                <input
                  className='recure-amount'
                  placeholder='Amount'
                  value={newRecurring.amount}
                  onChange={event => {
                    setNewRecurring({...newRecurring, amount: event.target.value})
                  }}
                />
                  <div className='new-recurring-button-div'>
                  <button
                    onClick={() => {
                      handleNewRecurring()
                    }}
                  >Save</button>
                  <button
                    onClick={() => {
                      setNewRecurring({display: false, name: '', category:'', amount: '', date: ''})
                      setViewDropdown({...viewDropdown , newRecurring: false})
                    }}
                  >Cancel</button>
                </div>
              </section>
            ) : (
              <button
                onClick={() => {
                  setNewRecurring({display: true, name: '', category:'', amount: '', date: ''})
                }}
              >New Recurring Purchase</button>
            )}
            {recurring.length === 0 ? (
              <div style={{margin: '15px auto'}} className='sub-budget no-viewing'>
                <p>No recurring purchase to show</p>
                <p>Add some above</p>
              </div>
            ) : (
              <section className='recurring'>
                {viewRecurring}
              </section>
            )}*/}   
          </section>

          <section className='expense-right'>
            {newExpense.display ? (
              <div className='new-expense-background'>
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
                        viewDropdown.newExpense ? (
                          setViewDropdown({...viewDropdown, newExpense: false})
                        ) : (
                          setViewDropdown({...viewDropdown, newExpense: true})
                        )
                      }}
                    >{newExpense.category ? newExpense.category : 'Select Category'}
                      <img
                        className={viewDropdown.newExpense ? 'down-arrow' : 'arrow'}
                        src='https://image.flaticon.com/icons/png/512/16/16038.png'
                        alt='arrow'
                      />
                    </button>
                    <section className={viewDropdown.newExpense ? null : 'null'}>
                      <Dropdown rerender data={newExpense} setDropdownCategory={setNewExpense} view={viewDropdown} setView={setViewDropdown} dropdownSelection='newExpense'/>
                    </section>
                  </section>
                  <input
                    placeholder='Amount'
                    value={newExpense.amount}
                    onChange={event => {
                      setNewExpense({...newExpense, amount: event.target.value})
                    }}
                  />
                  <section className={viewCalendar.newExpense ? 'calendar-view-date' : null}>
                    <div className='calendar-date-buttons'>
                      <button
                        onClick={() => {
                          setViewCalendar({...viewCalendar, newExpense: true})
                        }}
                      >{newExpense.date ? newExpense.date : 'Select Date'}</button>
                      <button
                        // className={newExpense.date === dayjs(newExpense.date).format('MM/DD/YY') ? null : 'null'}
                        onClick={() => {
                          setNewExpense({...newExpense, date: dayjs().format('MM/DD/YY')})
                        }}
                      >Today</button>
                    </div>
                    <div className={viewCalendar.newExpense ? null : 'null'}>
                      <Calendar setSelectedDate={setNewExpense} selectedDate={newExpense} view={viewCalendar} setView={setViewCalendar} data={{setValue: 'date', displayValue: 'newExpense'}}/>
                    </div>
                  </section>
                  <button
                    onClick={() => {
                      addNewExpense(newExpense)
                    }}
                    >Submit</button>
                    <button
                    onClick={() => {
                      setNewExpense({display: false, name: '', category: '', amount: 0})
                      setViewDropdown({...viewDropdown, newExpense: false})
                      setViewCalendar({...viewCalendar, newExpense: false})
                    }}
                  >Cancel</button>
                </div>
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
                      setViewDropdown({...viewDropdown, filter: false})
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
                  <div className='modify-expense-buttons'>
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
                  </div>
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
                          viewDropdown.filter ? (
                            setViewDropdown({...viewDropdown, filter: false})
                          ) : (
                            setViewDropdown({...viewDropdown, filter: true})
                          )
                        }}
                      >{filters.category ? filters.category : 'Select Category'}
                        <img
                          className={viewDropdown.filter ? 'down-arrow' : 'arrow'}
                          src='https://image.flaticon.com/icons/png/512/16/16038.png'
                          alt='arrow'
                        />
                      </button>
                      <section className={viewDropdown.filter ? null : 'null'}>
                        <Dropdown rerender={rerender} data={filters} setDropdownCategory={setFilters} view={viewDropdown} setView={setViewDropdown} dropdownSelection='filter'/>
                      </section>
                    </section>
                    {/* <input
                      placeholder='Start Date'
                      value={filters.start}
                      onChange={event => {
                        setFilters({...filters, start: event.target.value})
                      }}
                    /> */}
                    <section className={filters.start ? 'calendar-view-date' : null}>
                      <div className='calendar-date-buttons'>
                        <button
                          onClick={() => {
                            setViewCalendar({...viewCalendar, start: true})
                          }}
                        >{filters.start ? filters.start : 'Select Start Date'}</button>
                        <button
                          className={filters.start ? null : 'null'}
                          onClick={() => {
                            setFilters({...filters, start: ''})
                          }}
                        >Clear</button>
                      </div>
                      <div className={viewCalendar.start ? null : 'null'}>
                        <Calendar setSelectedDate={setFilters} selectedDate={filters} view={viewCalendar} setView={setViewCalendar} data={{setValue: 'start', displayValue: 'start'}}/>
                      </div>
                    </section>
                    {/* <input
                      placeholder='End Date'
                      value={filters.end}
                      onChange={event => {
                        setFilters({...filters, end: event.target.value})
                      }}
                    /> */}
                    {/* <section className='calendar-view-date'>
                      {viewCalendar.end ? (
                        <Calendar setSelectedDate={setFilters} selectedDate={filters} view={viewCalendar} setView={setViewCalendar} data={{setValue: 'end', displayValue: 'end'}}/>
                      ) : (
                        <div>
                          <button
                            onClick={() => {
                              setViewCalendar({...viewCalendar, end: true})
                            }}
                          >{filters.end ? filters.end : 'Select End Date'}</button>
                          <button
                            className={filters.end ? null : 'null'}
                            onClick={() => {
                              setFilters({...filters, end: ''})
                            }}
                          >Clear</button>
                        </div>
                      )}
                    </section> */}
                    <section className={filters.end ? 'calendar-view-date' : null}>
                      <div className='calendar-date-buttons'>
                        <button
                          onClick={() => {
                            setViewCalendar({...viewCalendar, end: true})
                          }}
                        >{filters.end ? filters.end : 'Select End Date'}</button>
                        <button
                          className={filters.end ? null : 'null'}
                          onClick={() => {
                            setFilters({...filters, end: ''})
                          }}
                        >Clear</button>
                      </div>
                      <div className={viewCalendar.end ? null : 'null'}>
                        <Calendar setSelectedDate={setFilters} selectedDate={filters} view={viewCalendar} setView={setViewCalendar} data={{setValue: 'end', displayValue: 'end'}}/>
                      </div>
                    </section>
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
                data={{expenses, deletedExpenses, updatedExpenses, setDeletedExpenses, setUpdatedExpenses, editting, filters, rerender}}
              />
              <button
                className={expenses.length === 0 ? 'null' : expenses.length % 15 === 0? 'load-more-button' : 'null'}
                onClick={() => {
                  // handleLimitExpenses('plus')
                }}
              >Load more</button>
              <button
                className={filters.limit > 15 && filters.offset === 0 ? 'load-more-button' : 'null'}
                onClick={() => {
                  // handleLimitExpenses('minus')
                }}
              >Load less</button>
            </div>
          </section>
          {/* <section className={displayDelete.display ? 'delete-message' : 'null'}>
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
          </section> */}
        </section>
      )}
    </section>
  )
}

export default Expenses