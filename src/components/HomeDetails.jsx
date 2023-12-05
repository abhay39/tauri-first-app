import Authinication from '@/hooks'
import React, { useContext } from 'react'

const HomeDetails = () => {
    
    const {token}=useContext(Authinication);

  return (
    <div>
        {token?"Welcome back!":null} 
    </div>
  )
}

export default HomeDetails