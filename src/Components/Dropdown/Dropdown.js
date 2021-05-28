import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Dropdown(props){
  // const {} = props.data
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get('/api/user/categories')
      .then(res => {
        setCategories(res.data)
      })
  }, [])


  return (
    <section>
      {categories}
    </section>
  )
}

export default Dropdown