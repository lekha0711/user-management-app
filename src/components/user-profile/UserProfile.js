import React,{useContext} from 'react'
import { Outlet } from 'react-router-dom'
import { loginContext } from '../../contexts/loginContext'
import { NavLink } from 'react-router-dom'
function UserProfile() {
  let [currentUser]=useContext(loginContext)
  const activeLink={
    color:"blue",
    fonstSize:"10px",
    fontWeight:"bold",
}
const inactiveLink={
    color:"black",
    fontSize:"15px",
}
  return (
    <div>
      <h4 className='text-end'>Welcome, {currentUser.username}</h4>
      <h5 className='text-end text-info'><small>{currentUser.email}</small></h5>
      <img src={currentUser.image} width="50px" alt="" className='float-end' />
      <ul className='nav justify-space-around'>
      <li className="nav-item ">
          <NavLink className="nav-link" to="products" style={({isActive})=>{
            return isActive ? activeLink :inactiveLink
          }}>Products</NavLink>
        </li>
        <li className="nav-item  ">
          <NavLink className="nav-link" to="cart" style={({isActive})=>{
            return isActive ? activeLink :inactiveLink
          }}>cart</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}

export default UserProfile