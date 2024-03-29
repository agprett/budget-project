import React, {useEffect, useState} from 'react'
import dayjs from 'dayjs'
import './Expenses.css'
import Dropdown from '../Dropdown/Dropdown.js'
import Calendar from '../Calendar/Calendar.js'
const x = require('../img.json')

function ExpenseDisplay(props) {
  const {expenses, deletedExpenses, setDeletedExpenses, updatedExpenses, setUpdatedExpenses, editting, filters, rerender} = props.data
  const [viewDropdown, setViewDropdown] = useState(false)
  const [viewCalendar, setViewCalendar] = useState('')
  const [rerenderDisplay, setRerenderDisplay] = useState(false)

  useEffect(() => {
    setViewDropdown('')
    setViewCalendar('')
    setRerenderDisplay(false)
  }, [filters, rerenderDisplay, expenses, rerender])


  const viewExpenses = (data) => data.map((expense, i) => {
      const {name, category, date, amount, expense_id} = expense
      let view = 'normal'
      let remove = false
  
      for(let i = 0; i < deletedExpenses.length; i++){
        if(deletedExpenses[i] === expense_id){
          remove = true
        }
      }
  
      for(let key in updatedExpenses){
        if(+key === expense_id){
          view = 'editting'
        }
      }
  
      if(view === 'editting'){
        return (
          <section
            key={expense_id}
            className='expenses'
            style={{backgroundColor: i % 2 === 1 ? '#F5F5F5' : '#987DC1', zIndex: 11 + expenses.length - i}}
          >
            <input
              className='expense-name'
              placeholder={name}
              onChange={event => {
                setUpdatedExpenses({...updatedExpenses, [expense_id]: {...updatedExpenses[expense_id], name: event.target.value}})
              }}
              />
            {/* <input
              className='expense-category'
              placeholder={category}
              onChange={event => {
                setUpdatedExpenses({...updatedExpenses, [expense_id]: {...updatedExpenses[expense_id], category: event.target.value}})
              }}
            /> */}
            <section style={{margin: 'auto 0px'}} className='expense-category-dropdown'>
              <button
                onClick={() => {
                  viewDropdown === expense_id ? setViewDropdown('') : setViewDropdown(expense_id)
                }}
              >{updatedExpenses[expense_id].category ? updatedExpenses[expense_id].category : 'Select Category'}
                <img
                  className={viewDropdown === expense_id ? 'down-arrow' : 'arrow'}
                  src='https://image.flaticon.com/icons/png/512/16/16038.png'
                  alt='arrow'
                />
              </button>
              <section className={viewDropdown === expense_id ? null : 'null'}>
                <Dropdown rerender data={updatedExpenses} setDropdownCategory={setUpdatedExpenses} view={viewDropdown} setView={setViewDropdown} dropdownId={expense_id}/>
              </section>
            </section>
            {/* <input
              className='expense-date'
              placeholder={dayjs(date).format('MM/DD/YY')}
              onChange={event => {
                setUpdatedExpenses({...updatedExpenses, [expense_id]: {...updatedExpenses[expense_id], date: event.target.value}})
              }}
            /> */}
            <section 
              className={viewCalendar === expense_id ? 'calendar-view-date' : 'expense-date'}
              style={{marginTop: '10px'}}
            >
              <div>
                <button
                  onClick={() => {
                    setViewCalendar(expense_id)
                  }}
                >{updatedExpenses[expense_id].date ? dayjs(updatedExpenses[expense_id].date).format('MM/DD/YY') : dayjs(date).format('MM/DD/YY')}</button>
                <button
                  className={updatedExpenses[expense_id].date !== date ? null : 'null'}
                  style={{margin: '0px 5px'}}
                  onClick={() => {
                    setUpdatedExpenses({...updatedExpenses, [expense_id]: {...updatedExpenses[expense_id], date: date}})
                  }}
                >Reset</button>
              </div>
              <div className={viewCalendar === expense_id ? null : 'null'}>
                <Calendar setSelectedDate={setUpdatedExpenses} selectedDate={updatedExpenses} view={viewCalendar} setView={setViewCalendar} data={{setValue: 'date', displayValue: expense_id}}/>
              </div>
            </section>
            <input
              className='expense-amount'
              placeholder={amount}
              onChange={event => {
                setUpdatedExpenses({...updatedExpenses, [expense_id]: {...updatedExpenses[expense_id], amount: event.target.value}})
              }}
            />
            <input
              style={{margin: 'auto 0px'}}
              type='checkbox'
              onClick={() => {
                remove = !remove
                if(remove){
                  setDeletedExpenses([...deletedExpenses, expense_id])
                  setRerenderDisplay(true)
                } else {
                  for(let i = 0; i < deletedExpenses.length; i++){
                    if(deletedExpenses[i] === expense_id){
                      let array = deletedExpenses
                      array.splice(i, 1)
                      setDeletedExpenses(array)
                      setRerenderDisplay(true)
                    }
                  }
                }
              }}
            />
            <img
              className='close'
              style={{margin: 'auto 0px'}}
              src={x}
              alt='x'
              onClick={() => {
                let removalObject = updatedExpenses
                delete removalObject[expense_id]
                setUpdatedExpenses(removalObject)
                setRerenderDisplay(true)
  
                for(let i = 0; i < deletedExpenses.length; i++){
                  if(deletedExpenses[i] === expense_id){
                    let array = deletedExpenses
                    array.splice(i, 1)
                    setDeletedExpenses(array)
                  }
                }
              }}
            />
          </section>
        )
      } else {
        return (
          <section
            key={expense_id} className='expenses' style={{backgroundColor: i % 2 === 1 ? '#F5F5F5' : '#987DC1'}}
            onClick={() => {
              if(editting){
                setUpdatedExpenses({...updatedExpenses, [expense_id]: expense})
                // setViewCalendar({...viewCalendar, [expense_id]: false})
              }
            }}
          >
            <h2 className='expense-name'>{name}</h2>
            <p className='expense-category'>{category}</p>
            <h4 className='expense-date'>{dayjs(date).format('MM/DD/YY')}</h4>
            <h2 className='expense-amount'>$ {amount}</h2>
          </section>
        )
      }
  })

  // const dateSpacer = (data) => data.map(expenses)

  return (
    <section>
      {expenses[0] ? (
        viewExpenses(expenses)
      ) : (
        <div style={{textAlign: 'center', color: 'white', fontSize: 'larger'}}>No Expenses to Show</div>
      )}
    </section>
  )
}

export default ExpenseDisplay