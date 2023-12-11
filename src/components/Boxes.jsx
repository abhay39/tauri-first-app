import React from 'react'

const Boxes = ({color,name,amount}) => {
  return (
    <div className={`${color} p-3 mb-3 justify-center flex flex-col md:w-[220px] h-24 items-center rounded-md`}>
        <h2 className='text-md'>{name}</h2>
        <h2 className='text-xl font-bold'>&#8377;. {amount}/-</h2>
    </div>
  )
}

export default Boxes