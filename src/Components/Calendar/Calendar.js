import React, {useState, useEffect} from 'react'
import dayjs from 'dayjs'
import './Calendar.css'

function Calendar(){
  const [startDisplayMonth, setStartDisplayMonth] = useState('')

  useEffect(() => {
    setStartDisplayMonth(dayjs().startOf('month').format('MM/DD/YY'))
  }, [])

  const handleUpdateDisplayMonth = (direction) => {
    let date = startDisplayMonth
    if(direction === 'back'){
      date = dayjs(date).subtract(1, 'month')
    } else if(direction === 'forward'){
      date = dayjs(date).add(1, 'month')
    }

    setStartDisplayMonth(dayjs(date).startOf('month').format('MM/DD/YY'))
  }

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
      <div>{startDisplayMonth}</div>
    </section>
  )
}

export default Calendar