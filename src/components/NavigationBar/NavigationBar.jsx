import React from 'react'
import './NavigationBar.css'

const NavigationBar = () => {
  return (
    <div className='navigationBarContainer'>
     <div className="left">
        <div className="title">
          <label htmlFor="">Home</label>
          <span className="arrow"> { ">" } </span>

        </div>
        <div className="title">
          <label htmlFor="">Administrator</label>
          <span className="arrow"> { ">" } </span>
        </div>
        <div className="title">
          <label htmlFor="">Logger Search</label>
          </div>
     </div>
    </div>
  )
}

export default NavigationBar