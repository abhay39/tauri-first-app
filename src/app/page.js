"use client"
import Authinication from '@/hooks'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useLayoutEffect } from 'react'
import HomeScreen from './screens/HomeScreen';

const page = () => {
  const {token,setToken}=useContext(Authinication);
  const route=useRouter();

  useEffect(()=>{
    const userToken = Cookies.get('token');
    setToken(userToken);
  })

  return (
    <>
      {token?(route.replace("/dashboard")):(<HomeScreen />)}
    </>
  )
}

export default page