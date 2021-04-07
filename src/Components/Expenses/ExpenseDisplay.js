import React, {useEffect, useState} from 'react'
import moment from 'moment'
import './Expenses.css'
import {x} from '../img.json'

function ExpenseDisplay(props) {
  const {expenses, deletedExpenses, updatedExpenses, setDeletedExpenses, setUpdatedExpenses, editting, filters} = props.data
  const [displayedExpenses, setDisplayedExpenses] = useState([])

  useEffect(() => {
    console.log(filters)

    if(filters.filtered && (filters.name || filters.category || filters.start || filters.end || filters.max || filters.min)){
      const filteredExpenses = displayedExpenses.filter(e => {

      if(filters.name){
        return e.name.toLowerCase().includes(filters.name.toLowerCase())
      }
      if(filters.category){
        return e.category.toLowerCase().includes(filters.category.toLowerCase())
      }
        // filters.start || 
        // filters.end || 
        // filters.max || 
        // filters.min
      })
      // const filteredExpenses = displayedExpenses.filter(expense => {
      //   const {name, category, start, end, max, min} = expense
        
      //   if(filters.name){
      //     console.log(`True, ${filters.name}`)
      //   } else if(!filters.name){
      //     console.log(`False, ${filters.name}`)
        // }
        // if(filters.name){
        //   return name === filters.name + '*'
        // }
        // if(filters.category){
        //   return category === filters.category + '*'
        // }
        // if(filters.start){
        //   console.log(filters.start)
        //   return moment(start).format('MM/DD/YY') >= moment(filters.start).format('MM/DD/YY')
        // }
        // if(filters.end){
        //   console.log(filters.end)
        //   return moment(end).format('MM/DD/YY') <= moment(filters.end).formant('MM/DD/YY')
        // }
        // if(filters.max){
        //   return max >= filters.max + '*'
        // }
        // if(filters.min){
        //   return min <= filters.min + '*'
        // }
      // })
      
      // console.log(filteredExpenses)
      setDisplayedExpenses(filteredExpenses)

    } else {
      setDisplayedExpenses(expenses)
    }
  }, [filters.filtered, filters.name, filters.category])


  const viewExpenses = displayedExpenses.map((expense, i) => {
      const {name, category, date, amount, expense_id} = expense
      let view = 'normal'
      let remove = false
  
      for( let i = 0; i < deletedExpenses.length; i++){
        if(deletedExpenses[i] === expense_id){
          remove = true
        }
      }
  
      for(let key in updatedExpenses){
        console.log(updatedExpenses[key])
        if(+key === expense_id){
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
                  for(let i = 0; i < deletedExpenses.length; i++){
                    if(deletedExpenses[i] === expense_id){
                      let array = deletedExpenses
                      array.splice(i, 1)
                      setDeletedExpenses(array)
                    }
                  }
                }
              }}
            />
            <img
              className='close'
              src={x}
              alt='x'
              onClick={() => {
                let removalObject = updatedExpenses
                delete removalObject[expense_id]
                setUpdatedExpenses(removalObject)
  
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
            key={i} className='expenses' style={{backgroundColor: i % 2 === 1 ? '#F5F5F5' : '#987DC1'}}
            onClick={() => {
              if(editting){
                setUpdatedExpenses({...updatedExpenses, [expense_id]: expenses})
              }
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

  return (
    <section>
      {displayedExpenses[0] ? viewExpenses : <div style={{textAlign: 'center'}}>No Expenses to Show</div>}
    </section>
  )
}

export default ExpenseDisplay