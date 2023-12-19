import Authinication from '@/hooks';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';

const AddIncome = () => {
    const route=useRouter();

    const [addIncome,setAddIncome]=useState('');
    const [addIncomeAmount,setAddIncomeAmount]=useState()

    const isDisabeed=!addIncome || !addIncomeAmount;

    const {URL,userData}=useContext(Authinication)

    const handleAddIncome=async()=>{
        let res=await fetch(`${URL}/api/addIncome`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                incomeName:addIncome,
                incomeAmount:addIncomeAmount,
                userId:userData._id
            })
        })
        const status=res.status;
        res = await res.json();

        if(status===202){
            toast.success(res.message);
            setAddIncome('');
            setAddIncomeAmount('');
            window.location.reload();
        }else{
            toast.error(res.message);
        }
    }

  return (
    <div className='flex flex-col md:h-[96vh] h-[89vh] max-h-full items-center text-white justify-center'>
        <div className='bg-slate-950 shadow-lg rounded-lg p-4 items-center mb-3'>
            <h1 className='text-2xl font-bold text-center'>Add Income</h1>
            <hr />
            <div className='mt-3'>
                <label htmlFor="">Income Name</label>
                <br />
                <input value={addIncome} onChange={(e)=>setAddIncome(e.target.value)} type="text" placeholder='Enter income name' className='p-2 rounded-md text-black' />
            </div>
            <div className='mt-2'>
                <label htmlFor="">Income Amount</label>
                <br />
                <input value={addIncomeAmount} onChange={(e)=>setAddIncomeAmount(e.target.value)} type="number" placeholder='Enter income amount' className='p-2 rounded-md text-black' />
            </div>
            <div className='mt-2'>
                <button onClick={handleAddIncome} disabled={isDisabeed}  className={`w-[100%] ${isDisabeed?"bg-gray-400 text-black":"bg-green-800 cursor-pointer "} p-2 rounded-md shadow-2xl text-lg font-bold`}>Add Income</button>
            </div>
        </div>
    </div>
  )
}

export default AddIncome