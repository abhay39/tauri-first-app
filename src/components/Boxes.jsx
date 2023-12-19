import Authinication from '@/hooks'
import Image from 'next/image'
import React, { useContext } from 'react'

const Boxes = ({color,name,amount,totalTransa}) => {

  const {userData}=useContext(Authinication)

  

  return (
    <div className={`${color} p-3 mb-3 justify-center text-center  w-auto h-auto items-center rounded-md cursor-pointer select-none`}>

        <div className='flex items-center justify-center'>
          <div className='mr-2'>
            <Image src={require("./rupee.png")} alt='rupee' height={100} width={100}/>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h2 className='text-md'>{name}</h2>
            <h2 className='text-xl font-bold'>&#8377;. {amount}/-</h2>
            
            {
              name=='Remaining'?(null):(
                <>
                  <h3>Total Transaction</h3>
                  <p className='font-bold'>{totalTransa}</p>
                </>
              )
            }
          </div>
        </div>
        
        {
          name==='Income'?(<div className='mt-2 bg-green-500 p-2 rounded-md shadow-md'>
            {userData?(<div>
              <h1>Last Transaction Date: {userData?.income[totalTransa-1]?.dateAdded}</h1>
          <h1>Last Transaction Time: {userData?.income[totalTransa-1]?.TimeAdded}</h1>
            </div>):(null)}
          </div>):(name==='Expense'?(<div className='mt-2 bg-red-500 p-2 rounded-md shadow-md'>
           {userData?(<div>
            <h1>Last Transaction Date: {userData?.expense[totalTransa-1]?.dateAdded}</h1>
          <h1>Last Transaction Time: {userData?.expense[totalTransa-1]?.TimeAdded}</h1>
           </div>):(null)}
          </div>):(null))
        }
    </div>
  )
}

export default Boxes