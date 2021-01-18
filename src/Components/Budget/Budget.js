import React from 'react'
// import axios from 'axios'
import './Budget.css'

function Budget(){
  return (
    <section className='budget-page'>
      <div className='budget-left'>
        <div className='budget-overall'>
          <div>Monthly Budget</div>
          <div>amounts</div>
        </div>
        <div className='budget-pie-chart'>Pie Chart</div>
      </div>
      <div className='sub-budgets'>Sub Budgets</div>
    </section>
  )
}

export default(Budget)