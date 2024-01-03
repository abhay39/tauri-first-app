import Authinication from '@/hooks';
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';

const AddExpense = () => {

    const [addExpense,setAddExpense]=useState('');
    const [addExpenseAmount,setAddExpenseAmount]=useState()
    

    const isDisabeed=!addExpense || !addExpenseAmount;
    const {URL,userData}=useContext(Authinication)


    const handleAddExpense=async()=>{
        let res=await fetch(`${URL}/api/addExpense`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                expenseName:addExpense,
                expenseAmount:addExpenseAmount,
                userId:userData._id,
                dateAdded:new Date().toLocaleDateString(),
                TimeAdded:new Date().toLocaleTimeString()
            })
        })
        const status=res.status;
        res = await res.json();
        if(status===202){
            toast.success(res.message);
            setAddExpense('');
            setAddExpenseAmount('');
            window.location.reload();
        }else{
            toast.error(res.message)
        }
    }

  return (
    <div className='flex flex-col md:h-[96vh] h-[89vh] max-h-full items-center text-white justify-center'>
        <div className='bg-slate-950 shadow-lg rounded-lg p-4 items-center mb-3'>
            <h1 className='text-2xl font-bold text-center'>Add Expense</h1>
            <hr />
            <div className='mt-3'>
                <label htmlFor="">Expense Name</label>
                <br />
                <input value={addExpense} onChange={(e)=>setAddExpense(e.target.value)} type="text" placeholder='Enter Expense name' className='p-2 rounded-md text-black' />
            </div>
            <div className='mt-2'>
                <label htmlFor="">Expense Amount</label>
                <br />
                <input value={addExpenseAmount} onChange={(e)=>setAddExpenseAmount(e.target.value)} type="number" placeholder='Enter Expense amount' className='p-2 rounded-md text-black' />
            </div>
            <div className='mt-2'>
                <button onClick={handleAddExpense} disabled={isDisabeed}  className={`w-[100%] ${isDisabeed?"bg-gray-400 text-black":"bg-green-800 cursor-pointer "} p-2 rounded-md shadow-2xl text-lg font-bold`}>Add Expense</button>
            </div>
        </div>
    </div>
  )
}

export default AddExpense