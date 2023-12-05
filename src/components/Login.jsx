"use client"
import Authinication from '@/hooks'
import Link from 'next/link'
import React, { useState,useContext } from 'react'

const Login = () => {

  const {URL}=useContext(Authinication)

  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("")


    const handleLoginUp=async()=>{
        try{
            let res=await fetch(`${URL}/api/login`,{
              method:"POST",
              'headers':{
                "Content-Type": "application/json"
              },
              body:JSON.stringify({
                password:password,
                email:email
              })
            })
            res=await res.json()
            if(res.status==200){
              toast.success(res.message)
            }else{
              toast.error(res.message)
            }
            
        }catch(e){
          console.log(e)
        }
    }

    const isDisabled= !password || !email;

  return (
    <div className='bg-[#023047] h-[100vh] items-center justify-center flex flex-col'>
      <div className='text-center text-red-500 shadow-2xl bg-slate-200 p-5 rounded-lg'>
        <h2 className='text-3xl font-bold select-none'>Welcome back!</h2>
        <p className='text-base select-none'>Please login to continue</p>
        <div className='mt-2'>
          <input onChange={(e)=>setEmail(e.target.value)} className='p-2 bg-slate-500 text-white rounded-lg mb-2' type='email' placeholder='Email' />
          <br />
          <input onChange={(e)=>setPassword(e.target.value)} className='p-2 bg-slate-500 text-white rounded-lg mb-2' type='password' placeholder='Password' />
          <br />
          <p className='text-left mb-2 cursor-pointer font-bold transition hover:text-[#023047]'>Forgot password?</p>
          <button disabled={isDisabled} onClick={handleLoginUp} className='p-2 bg-green-600 text-white rounded-lg mb-2 w-full text-xl font-semibold'>Login</button>
          <p className='text-left mb-2 cursor-pointer font-bold transition text-gray-600 '>Don't have an account? <Link className='hover:text-[#470211] text-gray-900' href={"/signup"}>Signup</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login