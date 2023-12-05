"use client"
import Authinication from '@/hooks';
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("")
    const {URL}=useContext(Authinication)


    const handleSignUp=async()=>{
        try{
            let res=await fetch(`${URL}/api/register`,{
              method:"POST",
              'headers':{
                "Content-Type": "application/json"
              },
              body:JSON.stringify({
                username:username,
                password:password,
                email:email
              })
            })
            const status=res.status;
            res=await res.json()
            if(status==200){
              toast.success(res.message)
            }else{
              toast.error(res.message)
            }
            
        }catch(e){
          console.log(e)
        }
    }

    const isDisabled=!username || !password || !email;

  return (
    <div className='bg-[#023047] h-[100vh] items-center justify-center flex flex-col'>
      <div className='text-center text-red-500 shadow-2xl bg-slate-200 p-5 rounded-lg'>
      <ToastContainer />
        <h2 className='text-3xl font-bold'>Register an account!</h2>
        <p className='text-base'>Please create an account to continue</p>
        <div className='mt-2'>
          <input onChange={(e)=>setUsername(e.target.value)} className='p-2 w-[100%] bg-slate-500 text-white rounded-lg mb-2' type='text' placeholder='Username' />
         
          <br />
          <input onChange={(e)=>setEmail(e.target.value)} className='p-2 w-[100%] bg-slate-500 text-white rounded-lg mb-2' type='email' placeholder='Email' />
          <br />
          <input onChange={(e)=>setPassword(e.target.value)} className='p-2 w-[100%] bg-slate-500 text-white rounded-lg mb-2' type='password' placeholder='Password' />
          <br />
          
          <button disabled={isDisabled} onClick={handleSignUp} className={`p-2 ${isDisabled?"bg-gray-500":"bg-green-600"} text-white rounded-lg mb-2 w-full text-xl font-semibold`}>Sign up</button>
          <p className='text-left mb-2 cursor-pointer font-bold transition text-gray-600 '>Already have an account? <Link className='hover:text-[#470211] text-gray-900' href={"/"}>Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp