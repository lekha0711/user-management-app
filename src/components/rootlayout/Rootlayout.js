import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'

function Rootlayout() {
  return (
    <div>
     <Navbar />
     <div className='container mt-3'>
     
      <Outlet />
     
        
     </div>
     <Footer />
    </div>
  )
}

export default Rootlayout