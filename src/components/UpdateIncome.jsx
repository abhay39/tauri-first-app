import Authinication from '@/hooks'
import React,{useContext, useState} from 'react'
import toast from 'react-hot-toast'
import { RxCrossCircled } from "react-icons/rx";


const UpdateIncome = () => {
    const {userData,URL}=useContext(Authinication)
    const [isModelOpen,setIsModelOpen] =useState(false);
    const [selectedOne,setSelectedOne] = useState();
    const [incomeName,setIncomeName] = useState();
    const [incomeAmount,setIncomeAmount] = useState();

    const handleOpenModel=(item)=>{
      setIsModelOpen(!isModelOpen);
      setSelectedOne(item)
      setIncomeAmount(item.amount)
      setIncomeName(item.nameOfIncome)
    }

    const handleUpdateIncome=async()=>{
      let res=await fetch(`${URL}/api/updateIncome`,{
        method:"POST",
        headers:{
          'content-type':"application/json"
        },
        body:JSON.stringify({
          incomeAmount:incomeAmount,
          incomeName:incomeName,
          userId:userData._id,
          reference:selectedOne.referenceId
        })
      })
      let status=res.status
      res=await res.json()
      if(status===202){
        toast.success(res.message)
        setIncomeAmount()
        setIncomeName('')
        setIsModelOpen(false)
      }else{
        toast.error(res.message)
      }
    }

    const deleteIncome=async(item)=>{
      let res=await fetch(`${URL}/api/deleteIncome`,{
        method:"delete",
        headers:{
          'content-type':"application/json"
        },
        body:JSON.stringify({
          userId:userData._id,
          reference:item.referenceId
        })
      })
      let status=res.status
      res=await res.json()
      if(status===202){
        toast.success(res.message)
      }else{
        toast.error(res.message)
      }
    }

  return (
    <div className="text-white h-[89vh] w-[100%]">
        <h1 className='text-3xl font-bold'>Income Transactions</h1>

        <hr />
        <div className='flex flex-col items-center justify-center mt-6'>
            {userData.income.length>0?
            (<table>
                <h1 className="text-xl font-bold">Income Transactions</h1>
                <tr>
                <th>S.No</th>
                <th>Ref.No.</th>
                <th>Income Name</th>
                <th>Income Amount</th>
                <th>Income Date & Time</th>
                <th>Action</th>
            </tr>
                {userData.income.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.referenceId}</td>
                            <td>{item.nameOfIncome}</td>
                            <td>&#8377;. {item.amount}/-</td>
                            <td>{item.dateAdded} & {item.TimeAdded}</td>
                            <td>
                                <button className='bg-orange-400 p-1 rounded-md' onClick={()=>handleOpenModel(item)}>Update</button>
                                <br />
                                <button onClick={()=>deleteIncome(item)} className='bg-red-400 rounded-md p-1 mt-1'>Delete</button>
                            </td>
                        </tr>
                    )
                })}
                </table>
                ):
            (
                <h1 className='text-xl text-red-400 font-semibold text-center'>No income added yet😢😢😢</h1>
            )}
        </div>


      {/* if is model open or not */}
        {
          isModelOpen && (
            <div className='bg-slate-400 opacity-100 text-black  absolute inset-0 z-50'>
              <div className='flex items-center h-[100vh] justify-center'>
                <div className='bg-white p-3 rounded-md'>
                  <div className='flex'>
                    <RxCrossCircled
                      size={20}
                      className='cursor-pointer ml-auto'
                      color='red'
                      onClick={()=>setIsModelOpen(!isModelOpen)}
                    />
                  </div>
                  <h1 className='text-red-400 text-center text-2xl font-bold'>Update Income</h1>
                  <hr />
                  <div className='w-[100%] mt-2'>
                    <label htmlFor="">Income Name</label>
                    <br />
                    <input onChange={(e)=>setIncomeName(e.target.value)} value={incomeName} type="text" placeholder='Enter income name' className='p-2 rounded-md bg-slate-300' />
                  </div>
                  <div className='w-[100%] mt-3'>
                    <label htmlFor="">Income Amount</label>
                    <br />
                    <input onChange={(e)=>setIncomeAmount(e.target.value)} value={incomeAmount} type="number" placeholder='Enter income amount' className='p-2 rounded-md bg-slate-300' />
                  </div>
                  <div className='mt-2 '>
                    <button onClick={handleUpdateIncome} className='bg-green-800 rounded-md text-xl text-white p-3 w-full'>Update Amount</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        
    </div>
  )
}

export default UpdateIncome