"use client"
import Authinication from '@/hooks';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { FaPlus,FaReg } from "react-icons/fa";
import {Poppins} from 'next/font/google'
import { IoReorderThree } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { MdUpdateDisabled } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import HomeDetails from '@/components/HomeDetails';
import AddIncome from '@/components/AddIncome';
import AddExpense from '@/components/AddExpense';
import { AiOutlineHome } from "react-icons/ai";
import Transactions from '@/components/Transactions';
import UpdateIncome from '@/components/UpdateIncome';
import UpdateExpense from '@/components/UpdateExpense';
import { SlLogout } from "react-icons/sl";
import toast from 'react-hot-toast';




const poppins = Poppins({
    weight: '600',
    subsets: ['latin'],
})

const data=[
    {
        id:0,
        val:"home",
        title:"Home",
        icon:<AiOutlineHome  size={20} color='white'/>
    },
    {
        id:1,
        val:"addIncome",
        title:"Add Income",
        icon:<FaPlus size={20} color='white'/>
    },
    {
        id:2,
        val:"addExpense",
        title:"Add Expense",
        icon:<IoIosRemoveCircleOutline size={20} color='white'/>
    },
    {
        id:3,
        title:"Update Income",
        val:"updateIncome",
        icon:<RxUpdate size={20} color='white'/>
    },
    {
        id:4,
        val:"updateExpense",
        title:"Update Expense",
        icon:<MdUpdateDisabled size={20} color='white'/>
    },
    {
        id:5,
        val:"showTransaction",
        title:"Show Transactions",
        icon:<GrTransaction size={20} color='white'/>
    },
    {
        id:6,
        val:"logout",
        title:"Logout",
        icon:<SlLogout size={20} color='white'/>
    }
]

const page = () => {
    const {token,setToken,URL,setUserData,userData}=useContext(Authinication);
    const route=useRouter();
    const [isClicked,setIsClicked]=useState(false)
    const [isSelected,setIsSelected]=useState('home')

    useLayoutEffect(()=>{
        const userToken = Cookies.get('token');
        setToken(userToken);
        if(token){
            getDetailsOfUser()
        }
    },[token])




    const getDetailsOfUser=async()=>{
        let res=await fetch(`${URL}/api/getUserDetails/${token}`);
        res= await res.json();
        setUserData(res.userData);
    }



  return (
    <div className='bg-[#023047]   md:flex min-h-screen'>
        
        {/* links here */}
        <div className={` p-2 md:p-6 shadow-2xl ${isClicked?"md:w-1/4 min-h-screen":""} text-white select-none `}>
        {isClicked?(<RxCross2 size={40} color='white' className=' cursor-pointer flex justify-center items-center hover:bg-slate-400  rounded-full p-1' onClick={()=>setIsClicked(!isClicked)}/>):(<IoReorderThree size={40} color='white' className=' cursor-pointer transition ease-in-out duration-700 flex justify-center items-center hover:bg-slate-400 rounded-full p-1' onClick={()=>setIsClicked(!isClicked)}/>)}

            <div className={`${isClicked?"flex mt-3 flex-col transition ease-in-out duration-700":"hidden transition ease-in-out duration-700"} `}>
                <h1  className={`text-4xl ${poppins.className} font-bold`}>Dashboard</h1>

                {data.map((item,index)=>{
                    return (
                        
                            item.val==='logout'?(null):(<div onClick={()=>{
                                setIsSelected(item.val)
                                setIsClicked(!isClicked)
                        }}  key={index} className={`${isSelected==item.val?('bg-[#f51d5e]'):('bg-[#001d3d]')} flex items-center p-3 cursor-pointer shadow-xl rounded-md mt-6`}>
                            {item.icon}
                            <p className='ml-2'>{item.title}</p>
                        </div>)
                        
                    )
                })}
                <div onClick={()=>{
                    toast.success("Logged out successfully!!!")
                    Cookies.remove('token');
                    setToken(null);
                    setUserData(userData)
                    route.replace("/")
                }}  className={`bg-red-600 flex items-center p-3 cursor-pointer shadow-xl rounded-md mt-6`}>
                    {data[6].icon}
                    <p className='ml-2'>{data[6].title}</p>
                </div>
            </div>
            
            
        </div>

        {/* components here */}
        <div className='p-2 md:p-6 w-full'>
            {isSelected==='home'?<HomeDetails />:null}
            {isSelected==='addIncome'?<AddIncome />:null}
            {isSelected==='addExpense'?<AddExpense />:null}
            {isSelected==='updateIncome'?<UpdateIncome />:null}
            {isSelected==='updateExpense'?<UpdateExpense />:null}
            {isSelected==='showTransaction'?<Transactions />:null}
        </div>
    </div>
  )
}

export default page