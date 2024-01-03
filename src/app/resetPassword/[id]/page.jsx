"use client"
import Authinication from '@/hooks';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';

const page = (props) => {
    const route=useRouter();
    let id= props.params.id;
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState()

    const isDisabeed=!password || !confirmPassword;

    const {URL}=useContext(Authinication);

    const updatePassword=async()=>{
        let res=await fetch(`${URL}/api/updatePassword`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                password:password,
                token:id
            })
        })
        const status=res.status;
        res = await res.json();
        
        if(status===202){
            toast.success(res.message);
            route.replace("/login")
        }else{
            toast.error(res.message);
            window.location.reload();
        }
    }

  return (
    <div className='flex flex-col md:h-[96vh] h-[89vh] max-h-full items-center text-white justify-center'>
        <div className='bg-slate-950 shadow-lg rounded-lg p-4 items-center mb-3'>
            <h1 className='text-2xl font-bold text-center'>Add New Password</h1>
            <hr />
            <div className='mt-3'>
                <label htmlFor="">New Password</label>
                <br />
                <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter new password' className='p-2 rounded-md w-full text-black' />
            </div>
            <div className='mt-2'>
                <label htmlFor="">Confirm New Password</label>
                <br />
                <input  onChange={(e)=>setConfirmPassword(e.target.value)} type="password" placeholder='Enter confirm password' className='p-2 w-full rounded-md text-black' />
            </div>

            
            <div className='mt-2 w-full flex items-center justify-center flex-col'>
                {
                    password === confirmPassword && password.length>6 ?(<button  disabled={isDisabeed} onClick={updatePassword}  className={`w-[100%] ${isDisabeed?"bg-gray-400 text-black":"bg-green-800 cursor-pointer "} p-2 rounded-md shadow-2xl text-lg font-bold`}>Update Password</button>):(<h1 className={`text-red-500  w-2/3 text-center`}>Password and confirm password should be same and length should be more then 6</h1>)
                }
            </div>
        </div>
    </div>
  )
}

export default page