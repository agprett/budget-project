import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {x} from '../img.json'
import './Dropdown.css'

function Dropdown(props){
  const {data, setDropdownCategory, view, setView, rerender, dropdownId, dropdownSelection} = props
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState(false)

  useEffect(() => {
    axios.get('/api/user/categories')
      .then(res => {
        setCategories(res.data)
      })

  }, [rerender])

  const viewCategories = categories.map((category) => {
    return (
      <button
        key={category}
        className='dropdown-selection'
        onClick={() => {
          if(dropdownId){
            setDropdownCategory({...data, [dropdownId]: {...data[dropdownId], category: category}})
          } else {
            setDropdownCategory({...data, category: category})
          }
          if(setView){
            if(dropdownId){
              view === dropdownId ? setView('') : setView(dropdownId)
            } else {
              view[dropdownSelection] ? setView({...view, [dropdownSelection]: false}) : setView({...view, [dropdownSelection]: true})
            }
          }
        }}
      > 
        {category}
      </button>
    )
  })

  return (
    <section className='dropdown-menu'>
      {newCategory ? (
        <section className='custom-dropdown'>
          <input
            placeholder='Category'
            value={data.category}
            onChange={event => {
              if(dropdownId){
                setDropdownCategory({...data, [dropdownId]: {...data[dropdownId], category: event.target.value}})
              } else {
                setDropdownCategory({...data, category: event.target.value})
              }
            }}
          />
          <img
            className='done'
            src={x}
            alt='x'
            onClick={() => {
              setNewCategory(false)
              if(setView){
                if(dropdownId){
                  view === dropdownId ? setView('') : setView(dropdownId)
                } else {
                  view[dropdownSelection] ? setView({...view, [dropdownSelection]: false}) : setView({...view, [dropdownSelection]: true})
                }
              }
            }}
          />
        </section>
      ) : (
        <menu className='dropdown-selections'>
          {viewCategories}
          <button
            className={data.category ? 'dropdown-selection' : 'null'}
            onClick={() => {
              if(dropdownId){
                setDropdownCategory({...data, [dropdownId]: {...data[dropdownId], category: ''}})
              } else {
                setDropdownCategory({...data, category: ''})
              }
              if(setView){
                if(dropdownId){
                  view === dropdownId ? setView('') : setView(dropdownId)
                } else {
                  view[dropdownSelection] ? setView({...view, [dropdownSelection]: false}) : setView({...view, [dropdownSelection]: true})
                }
              }
            }}
          >Clear</button>
          <button
            className='dropdown-selection'
            style={{marginBottom: '5px'}}
            onClick={() => {
              setNewCategory(true)
            }}
          >Add New</button>
        </menu>
      )}
    </section>
  )
}

export default Dropdown