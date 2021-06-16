import React, {useState, useEffect} from 'react'
import dayjs from 'dayjs'
import './Calendar.css'

function Calendar(){
  const [currentDate, setCurrentDate] = useState('')
  const [startDisplayMonth, setStartDisplayMonth] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [datesArray, setDatesArray] = useState([])

  useEffect(() => {
    setCurrentDate(dayjs().format('MM/DD/YY'))
    setStartDisplayMonth(dayjs().startOf('month').format('MM/DD/YY'))
  }, [])
  
  useEffect(() => {
    setDatesArray([])
    for(let i = 1; i <= +dayjs(dayjs(startDisplayMonth)).endOf('month').format('DD'); i++){
      setDatesArray(datesArray => [...datesArray, i])
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
    if(date === 1){
      space = dayjs(startDisplayMonth).get('d')
    }
    
    return (
      <div
        className='calendar-days' 
        key={i}
        style={{marginLeft: `${space * 25}px`}}
        onClick={() => {
          console.log()
        }}
      >
        {date}
      </div>
    )
  })

  return (
    <section className='calendar'>
      <button
        onClick={() => {
          handleUpdateDisplayMonth('back')
        }}
      >{'<'}</button>
      <p>{dayjs(startDisplayMonth).format('MMMM YY')}</p>
      <button
        onClick={() => {
          handleUpdateDisplayMonth('forward')
        }}
      >{'>'}</button>
      <button
        onClick={() => {
          setStartDisplayMonth(dayjs().startOf('month').format('MM/DD/YY'))
        }}
      >Today</button>
      <section className='calendar-month'>
        {designCalendar}
      </section>
    </section>
  )
}

export default Calendar