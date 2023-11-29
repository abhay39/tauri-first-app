"use client"
import React, { useState,useContext } from 'react'

const Login = () => {

  const [mes,setMes]=useState('')
  const {URL}=useContext(Authinication)

  return (
    <div className='bg-[#DCE1F9] h-[100vh] items-center justify-center flex flex-col'>
      <div className='text-center text-red-500 shadow-2xl bg-slate-200 p-5 rounded-lg'>
        <h2 className='text-3xl font-bold'>Welcome back!</h2>
        <p className='text-base'>Please login to continue</p>
        <div className='mt-2'>
          <input className='p-2 bg-slate-500 text-white rounded-lg mb-2' type='text' placeholder='Username' />
          <br />
          <input className='p-2 bg-slate-500 text-white rounded-lg mb-2' type='password' placeholder='Password' />
          <br />
          <button onClick={()=>setMes("abhay")} className='p-2 bg-green-600 text-white rounded-lg mb-2 w-full text-xl font-semibold'>Login {URL}</button>
        </div>
      </div>
    </div>
  )
}

export default Login