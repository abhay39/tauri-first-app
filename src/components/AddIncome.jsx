import React, { useState } from 'react'

const AddIncome = () => {

    const [addIncome,setAddIncome]=useState('');
    const [addIncomeAmount,setAddIncomeAmount]=useState(0)

    const isDisabeed=!addIncome || !addIncomeAmount;

  return (
    <div className='flex flex-col md:h-[96vh] max-h-full items-center text-white justify-center'>
        <div className='bg-slate-950 shadow-lg rounded-lg p-4 items-center mb-3'>
            <h1 className='text-2xl font-bold text-center'>Add Income</h1>
            <hr />
            <div className='mt-3'>
                <label htmlFor="">Income Name</label>
                <br />
                <input onChange={(e)=>setAddIncome(e.target.value)} type="text" placeholder='Enter income name' className='p-2 rounded-md text-black' />
            </div>
            <div className='mt-2'>
                <label htmlFor="">Income Amount</label>
                <br />
                <input onChange={(e)=>setAddIncomeAmount(e.target.value)} type="number" placeholder='Enter income amount' className='p-2 rounded-md text-black' />
            </div>
            <div className='mt-2'>
                <button disabled={isDisabeed}  className={`w-[100%] ${isDisabeed?"bg-gray-400 text-black":"bg-green-800"} p-2 rounded-md shadow-2xl cursor-pointer text-lg font-bold`}>Add Income</button>
            </div>
        </div>
    </div>
  )
}

export default AddIncome