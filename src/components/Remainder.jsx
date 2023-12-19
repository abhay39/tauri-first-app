import React from 'react'
import { FaRegClock } from "react-icons/fa6";


const Remainder = () => {
  return (
    <div className='flex items-center justify-center flex-col w-1/4 p-3 bg-slate-200 rounded-md'>
        <FaRegClock size={40} color='green'/>
        <h1 className='text-3xl font-bold'>Remainder</h1>
        <p className='text-justify'>EXTracker's intelligent reminder function is a standout feature that assists users in staying on top of their financial commitments. Users can set reminders for upcoming bills, subscription renewals, or any other recurring expenses, ensuring they are promptly notified before due dates.</p>
    </div>
  )
}

export default Remainder