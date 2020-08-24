import React, {useState, useEffect} from 'react'
import './Savings.css'
import {connect} from 'react-redux'

function Savings(props) {
  const {overall} = props.userReducer

  return (
    <div className='savings-route'>
      <h2>{overall}</h2>
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(Savings)