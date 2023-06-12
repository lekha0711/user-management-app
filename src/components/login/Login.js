import React,{useEffect} from 'react'
import './Login.css'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { loginContext } from '../../contexts/loginContext'
import { useNavigate } from 'react-router-dom'
function Login() {
  let [currentUser,loginErr,userLoginStatus,loginUser]=useContext(loginContext)
  const navigate=useNavigate()
      let {
        register,
        handleSubmit,
        formState:{errors}
       }=useForm()
    let login=(userCredentials)=>{
       //console.log(userCredentials)
       loginUser(userCredentials)
    } 
    useEffect(()=>{
      if(userLoginStatus===true){
        //navigate to user-profile
        navigate("/user-profile")
      }
    },[userLoginStatus])  
  return (
    <div>
        <p className='display-3 text-center text-danger'>{loginErr}</p>
        <div className='row'>
       <div className='col-11 col-sm-8 col-lg-6 mx-auto'>
        <form onSubmit={handleSubmit(login)}>
            <div className='mb-3'>
            <label htmlFor='name'>Username</label>
            <input type="text"  id="username" className='form-control' {...register("username",{required:true})}/>
            {errors.name?.type==="required" && <p className='text-danger'>*Username is required</p>}
            </div>
            <div className='mb-3'>
            <label htmlFor='password'>Password</label>
            <input type="password"  id="password" className='form-control' {...register("password",{required:true})}/>
            {errors.name?.type==="required" && <p className='text-danger'>*Password is required</p>}
            </div>
            <button type="submit" className='p-2 btn btn-success'>Login</button> 
            </form>
        </div>
      </div>    
    </div>
  )
}

export default Login