import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {x} from '../img.json'
import './Dropdown.css'
import { geoNaturalEarth1Raw } from 'd3-geo'

function Dropdown(props){
  const {data, setDropdownCategory, view, setView, rerender} = props
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState(false)

  useEffect(() => {
    axios.get('/api/user/categories')
      .then(res => {
        setCategories(res.data)
      })
    
    console.log('hit dropdown')
  }, [rerender])

  const viewCategories = categories.map((category, i) => {
    return (
      <button
        key={i}
        onClick={() => {
          setDropdownCategory({...data, category: category})
          if(setView){
            view ? setView(false) : setView(true)
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
        <section>
          <input
            placeholder='Category'
            value={data.category}
            onChange={event => {
              setDropdownCategory({...data, category: event.target.value})
            }}
          />
          <img
            className='close'
            src={x}
            alt='x'
            onClick={() => {
              setNewCategory(false)
            }}
          />
        </section>
      ) : (
        <menu className='dropdown-selections'>
          {viewCategories}
          <button
            className={data.category ? null : 'null'}
            onClick={() => {
              setDropdownCategory({...data, category: ''})
              if(setView){
                view ? setView(false) : setView(true)
              }
            }}
          >Clear</button>
          <button
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