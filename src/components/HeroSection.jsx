import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <div className='h-[100vh] px-6 py-6 md:flex items-center justify-center '>
        {/* left side */}
        <div className='md:w-2/5'>
            <h1 className='md:text-5xl text-2xl font-bold'>Track Your Expenses Easily With</h1>
            <h2 className='text-green-400  font-bold md:text-5xl text-2xl mt-3'>EXTracker</h2>
            <p className='text-justify font-thin mt-3'>EXTracker is a user-friendly expense tracker application designed to help individuals efficiently manage their finances. With a sleek and intuitive interface, the app offers a seamless experience for users to keep a close eye on their expenses, thereby fostering better financial awareness and budgeting.</p>
        </div>

        {/* right side */}
        <div className='md:ml-10'>
            <div>
                <Image src={require("./lg.jpg")} alt='lg' height={300} width={300} className='h-[450px] w-[100%] object-cover'/>
            </div>
        </div>
    </div>
  )
}

export default HeroSection