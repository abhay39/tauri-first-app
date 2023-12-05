"use client"
import Login from '@/components/Login'
import Authinication from '@/hooks'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useContext, useLayoutEffect } from 'react'

const page = () => {
  const {token,setToken}=useContext(Authinication);
  const route=useRouter();

  useLayoutEffect(()=>{
    const userToken = Cookies.get('token');
    setToken(userToken);
  },[token])

  return (
    <>
      {token?(route.replace("/dashboard")):(<Login />)}
    </>
  )
}

export default page