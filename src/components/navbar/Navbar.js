import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import "bootstrap/js/src/collapse.js";
import { loginContext } from '../../contexts/loginContext';
function Navbar() {
  let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext) 
    const activeLink={
        color:"orange",
        fonstSize:"10px",
        fontWeight:"bold",
    }
    const inactiveLink={
        color:"black",
        fontSize:"15px",
    }
  return (
    <div>
        <nav className="navbar navbar-expand-sm bg-light shadow justify-content-around ">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/"><img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/users5.png" alt="Bootstrap" width="50" height="50" /></NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-8">
        <li className="nav-item mx-auto">
          <NavLink className="nav-link" to="/" style={({isActive})=>{
            return isActive ? activeLink : inactiveLink;
          }}>Home</NavLink>
        </li>
        <li className="nav-item  mx-auto">
          <NavLink className="nav-link" to="/register" style={({isActive})=>{
            return isActive ? activeLink :inactiveLink
          }}>Register</NavLink>
        </li>
        {userLoginStatus? (<li className="nav-item  mx-auto">
          <NavLink className="nav-link" to="/login" style={({isActive})=>{
            return isActive ? activeLink :inactiveLink
          }} onClick={logoutUser}>Logout</NavLink>
        </li>):(<li className="nav-item  mx-auto">
          <NavLink className="nav-link" to="/login" style={({isActive})=>{
            return isActive ? activeLink :inactiveLink
          }}>Login</NavLink>
        </li>
        )}
        
        <li className="nav-item  mx-auto">
          <NavLink className="nav-link" to="/aboutus" style={({isActive})=>{
            return isActive ? activeLink :inactiveLink
          }}>About us</NavLink>
        </li>

      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar