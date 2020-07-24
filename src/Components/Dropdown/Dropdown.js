import React from 'react'

function Dropdown(){
  // const [displayed, setDisplayed] = useState({expense: '', upcoming: ''})

  return (
    <section style={{position: 'absolute', bottom: '35px'}} >
      Stuff
      {/* <button
        style={{width: '100%', position: 'absolute', bottom: 0}}
        className={display.expense ? `cat-expanded select-cat` : `select-cat`}
        onClick={() => setDisplay({...display, expense: !display.expense})}
      >
        {displayed.expense ? displayed.expense : '--Select Category--'}
        <span
          className='selector'
          id='personal'
          onClick={event => {
            handleClick(event.target.id)
            setDisplayed({...displayed, expense: 'Personal'})
          }}
        >Personal</span>
        <span
          className='selector'
          id='groceries'
          onClick={event => {
            handleClick(event.target.id)
            setDisplayed({...displayed, expense: 'Groceries'})
          }}
        >Groceries</span>
        <span
          className='selector'
          id='travel'
          onClick={event => {
            handleClick(event.target.id)
            setDisplayed({...displayed, expense: 'Travel'})
          }}
        >Travel</span>
        <span
          className='selector'
          id='other'
          onClick={event => {
            handleClick(event.target.id)
            setDisplayed({...displayed, expense: 'Other'})
          }}
        >Other</span>
      </button> */}
    </section>
  )
}

export default Dropdown