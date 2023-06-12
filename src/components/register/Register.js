import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Register() {
  //navigate hook
  let navigate=useNavigate()    
  let {
       register,
       handleSubmit,
       formState:{errors}
      }=useForm()
       //http req err state
      let [err,setErr]=useState("")
      //file state
      let [selectFile,setSelectFile]=useState(null)
      let registration=(newUser)=>
      {
       console.log(newUser)
       let fd=new FormData()
       //append newUsdr to from data
       //append selected file to form data
       fd.append("user",JSON.stringify(newUser))//convert javascript obj to string
       fd.append("photo",selectFile)
       //make http post request
       axios.post("http://localhost:3500/user-api/user-signup",fd)
       .then((response)=>{
        if(response.status===201){
            //navigate to login
            navigate('/login')
        }
        if(response.status!=201){
            setErr(response.data.message)
        }
       })
       .catch((err)=>{
         if(err.response){
            setErr(err.message)
         }
         else if(err.request){
            setErr(err.message)
         }
         else{
            setErr(err.message)
         }
       })
       console.log(err)
      }  
      const onFileSelect=(e)=>{
          setSelectFile(e.target.files[0])
      }
  return (
    <div>
        <h1 className='display-3 text-danger text-center'>Register</h1>
        {/*http req err msg*/}
    {err.length!==0 && <p className='display-3 fw-bold text-center text-danger'>{err}</p>}
        <div className='row'>
       <div className='col-11 col-sm-8 col-lg-6 mx-auto'>
        <form onSubmit={handleSubmit(registration)}>
            <div className='mb-3'>
            <label htmlFor='username'>Username</label>
            <input type="text"  id="username" className='form-control' {...register("username",{required:true})}/>
            {errors.name?.type==="required" && <p className='text-danger'>*Username is required</p>}
            </div>
            <div className='mb-3'>
            <label htmlFor='password'>Password</label>
            <input type="password"  id="password" className='form-control' {...register("password",{required:true})}/>
            {errors.name?.type==="required" && <p className='text-danger'>*Password is required</p>}
            </div>
            <div className='mb-3'>
            <label htmlFor='email'>Email</label>
            <input type="text"  id="email" className='form-control' {...register("email",{required:true})}/>
            {errors.email?.type==="required" && <p className='text-danger'>*Email is required</p>}
            </div>
            <div className='mb-3'>
            <label htmlFor='dob'>Date Of Birth</label>
            <input type="date"  id="dob" className='form-control' {...register("dob",{required:true})}/>
            {errors.dob?.type==="required" && <p className='text-danger'>*DOB is required</p>}
            </div>
           <div className='mb-3'>
            <label htmlFor='image'>Upload Image</label>
            <input type="file"  id="image" className='form-control' {...register("image",{required:true})} onInput={onFileSelect}/>
            {errors.image?.type==="required" && <p className='text-danger'>*Image is required</p>}
          </div>  
          <button type="submit" className='p-2 btn btn-success float-right'>Register</button> 
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register