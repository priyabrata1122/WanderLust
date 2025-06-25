import React from 'react'
import '../styles/Style_header.css'

function Header() {
  return (
    <div className="header">
        <h1 className='logoname'>wANDERLUST</h1>
        <div className="navbar">
            <h1>Out Tours</h1>
            <h1>About</h1>
            <h1>FAQs</h1>
        </div>
        <button className='signinbtn'>Sign In</button>
    </div>
  )
}

export default Header
