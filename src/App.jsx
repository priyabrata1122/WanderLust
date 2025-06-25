import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
      <div className="app">
        {/* Top Div */}
        <div className="inside">
          <h1>Explore the sights</h1>
          <h1>of the Azeros</h1>
          <h3>A place where nature and adventure unite</h3>
          <Link to={'/createtrip'}>
            <button>Get started, it's free</button>
          </Link>
        </div>
      </div>

      <div className="bottom">
        <h2>Top values for you</h2>
        <h4>Try variety of benefits when using our service</h4>
        <div className="bottominside">
          <div>
            <h1>Airport Pickup</h1>
            <h3>We provide escort from the </h3><h3> airport to hotel</h3>
          </div>
          <div>
            <h1>Easy Booking</h1>
            <h3>Quick and easy booking of tours for </h3><h3> upcomming dates</h3>
          </div>
          <div>
            <h1>Best tour guide</h1>
            <h3>Our best tour guide is ready </h3><h3> to guide your trip</h3>
          </div>
          <div>
            <h1>Lots of promos</h1>
            <h3>Various promotions and </h3><h3> drawings of tours</h3>
          </div>
        </div>
      </div>

      <div className="footer">
        <h1>Copyright(c) 2025 WanderLust</h1>
        <h1>Made with &#x2764; by Priyabrata</h1>
      </div>
    </>
  )
}

export default App
