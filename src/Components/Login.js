import React from 'react'
import moment from 'moment'

function Login(){
  const date = moment().format('L')
  const today = new Date(date)
  let number = today.getDay()
  let sunday = moment(today).subtract(number, 'd').format('L')
  let monthNum = today.getDate()
  let month = moment(today).subtract(monthNum - 1, 'd').format('L')
  
  return (
    <div>
      {date}
      <br/>
      {sunday}
      <br/>
      {month}
    </div>
  )
}

export default Login