import HeroSection from '@/components/HeroSection';
import Remainder from '@/components/Remainder';
import React,{useLayoutEffect, useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { LuMessagesSquare } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import { FaArrowUp } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';



const HomeScreen = () => {
  const route=useRouter();
    
    const [showNav,setShowNav]=useState(false);
    const [tokensss,setTokennnns]=useState(false);
    
    const handleHamBurg=()=>{
        setShowNav(!showNav);
    }
    useLayoutEffect(()=>{
      const t=Cookies.get('token');
      setTokennnns(t)
    },[tokensss])

  return (
    <div className=''>
        <header id='top' className='flex px-6 py-3 items-center justify-between'>
      <h1 className='font-bold text-3xl cursor-pointer'>
        Ex<span className='font-thin'>Tracker</span>
      </h1>
      <nav id='navBars' className='select-none'>
        <ul className={`${showNav ? ' absolute top-16 left-0  flex flex-col items-start justify-start  bg-slate-200 rounded-md p-2 w-[100%]' : 'hidden'} md:flex md:items-center items-start `}>
            <li className='cursor-pointer' onClick={()=>route.push("/")}>Home</li>
            {tokensss && <li className='cursor-pointer md:ml-10' onClick={()=>route.replace("/dashboard")}>Dashboard</li>}
            <li onClick={()=>route.push("/about")}  className='cursor-pointer md:ml-10'>About Us</li>
            <li onClick={()=>route.push("/contact")} className='cursor-pointer md:ml-10'>Contact Us</li>
            <li>
                <button onClick={()=>route.replace("/login")}  className='md:ml-10 bg-green-500 p-2 w-24 border border-black hover:bg-green-700 hover:text-white rounded-full'>
                    Login
                </button>
                <button onClick={()=>route.replace("/signup")} className='md:ml-10 ml-3 sm:mt-2 p-2 w-24 border border-black rounded-full'>
                Register
                </button>
            </li>
            
        </ul>
      </nav>
      {showNav ? (
        <ImCross onClick={handleHamBurg} className='md:hidden flex cursor-pointer' size={20} color='black' />
      ) : (
        <GiHamburgerMenu onClick={handleHamBurg} className='md:hidden flex cursor-pointer' size={20} color='black' />
      )}
    </header>
        <hr style={{borderWidth:1,borderColor:'gray'}}/>
        <HeroSection />

        <div className='md:flex  justify-between p-6 bg-[#F2FDFF] rounded-lg'>

            <div className='flex flex-col   rounded-md hover:bg-slate-200 cursor-pointer p-2 '>
                <FaRegClock size={40} color='green'/>
                <h1 className='text-3xl font-bold'>Remainder</h1>
                <p className='text-justify'>EXTracker's intelligent reminder function is a standout feature that assists users in staying on top of their financial commitments. Users can set reminders for upcoming bills, subscription renewals, or any other recurring expenses, ensuring they are promptly notified before due dates.</p>
            </div>

            <div className='flex flex-col hover:bg-slate-200 cursor-pointer p-2  rounded-md'>
                <IoAnalyticsSharp size={40} color='green'/>
                <h1 className='text-3xl font-bold'>Analytics</h1>
                <p className='text-justify'>EXTracker's intelligent Web analytics involves the collection, measurement, and analysis of data related to website or web application usage.
                Purpose: It helps organizations understand user behavior, track website performance, and make data-driven decisions to improve user experience and achieve business goals.</p>
            </div>

            <div className='flex  flex-col hover:bg-slate-200 cursor-pointer p-2 rounded-md'>
                <LuMessagesSquare size={40} color='green'/>
                <h1 className='text-3xl font-bold'>Auto Suggest</h1>
                <p className='text-justify'>EXTracker's intelligent Auto-suggest provides real-time suggestions based on the characters entered by the user. As the user types, the system dynamically generates and displays a list of potential matches or completions.
                Contextual Recommendations: The suggestions offered by auto-suggest are often contextually relevant to the specific </p>
            </div>
        </div>

      
        <footer className='bg-[#011E2C] text-white p-3 flex justify-between items-center '>
            <h1>EXTracker</h1>
            <p>2023 EXTracker &copy; All right reserved</p>
            <a href="#top"><FaArrowUp size={20} color='black' className='bg-slate-200 rounded-full cursor-pointer'/></a>
        </footer>
    </div>
  )
}

export default HomeScreen