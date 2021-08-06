import React, {useState, useEffect} from 'react'
import dayjs from 'dayjs'
import './Calendar.css'
import {x} from '../img.json'

function Calendar(props){
  const {setView, view, selectedDate, setSelectedDate, data} = props
  const [currentDate, setCurrentDate] = useState('')
  const [startDisplayMonth, setStartDisplayMonth] = useState('')
  const [datesArray, setDatesArray] = useState([])

  useEffect(() => {
    setCurrentDate(dayjs().format('MM/DD/YY'))
    setStartDisplayMonth(dayjs().startOf('month').format('MM/DD/YY'))
  }, [])
  
  useEffect(() => {
    let month = dayjs(startDisplayMonth).month()
    let year = dayjs(startDisplayMonth).year()
    setDatesArray([])
    for(let i = 1; i <= +dayjs(dayjs(startDisplayMonth)).endOf('month').format('DD'); i++){
      setDatesArray(datesArray => [...datesArray, dayjs().date(i).month(month).year(year).format('MM/DD/YY')])
    }
  }, [startDisplayMonth])

  const handleUpdateDisplayMonth = (direction) => {
    let date = startDisplayMonth
    if(direction === 'back'){
      date = dayjs(date).subtract(1, 'month')
    } else if(direction === 'forward'){
      date = dayjs(date).add(1, 'month')
    }

    setCurrentDate(dayjs().format('MM/DD/YY'))
    setStartDisplayMonth(dayjs(date).startOf('month').format('MM/DD/YY'))
  }

  const designCalendar = datesArray.map((date, i) => {
    let space = 0
    if(+dayjs(date).format('D') === 1){
      space = dayjs(startDisplayMonth).get('d')
    }
    
    return (
      <div
        className={(
          typeof(data.displayValue) === 'number' ? (
            date === dayjs(selectedDate[data.displayValue].date).format('MM/DD/YY') ? 'calendar-days selected' : date === currentDate ? 'calendar-days today' : 'calendar-days'
          ) : (
            date === selectedDate[data.setValue] ? 'calendar-days selected' : date === currentDate ? 'calendar-days today' : 'calendar-days'
          )
        )}
        key={i}
        style={{marginLeft: `${space * 25}px`}}
        onClick={() => {
          if(typeof(data.displayValue) === 'number'){
            setSelectedDate({...selectedDate, [data.displayValue]: {...selectedDate[data.displayValue], date: date}})
          } else {
            setSelectedDate({...selectedDate, [data.setValue]: date})
          }
          if(typeof(data.displayValue) === 'number'){
            setView('')
          } else {
            setView({...view, [data.displayValue]: false})
          }
        }}
      >
        {dayjs(date).format('D')}
      </div>
    )
  })

  return (
    <section className='calendar'>
      <div className='calendar-buttons'>
        <button
          onClick={() => {
            handleUpdateDisplayMonth('back')
          }}
        >{'<'}</button>
        <p className='calendar-date-display'>{dayjs(startDisplayMonth).format('MMMM YY')}</p>
        <button
          onClick={() => {
            handleUpdateDisplayMonth('forward')
          }}
        >{'>'}</button>
      </div>
      <div className='calendar-buttons'>
        <button
          onClick={() => {
            setStartDisplayMonth(dayjs().startOf('month').format('MM/DD/YY'))
          }}
        >Today</button>
        <button
          onClick={() => {
            if(typeof(data.displayValue) === 'number'){
              setView('')
            } else {
              setView({...view, [data.displayValue]: false})
            }
          }}
        >Cancel</button>
        {/* <img
          className='close'
          src={x}
          alt='x'
        /> */}
      </div>
      <section className='calendar-month'>
        {designCalendar}
      </section>
    </section>
  )
}

export default Calendar