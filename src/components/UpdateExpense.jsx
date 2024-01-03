import Authinication from '@/hooks'
import React,{useContext, useState} from 'react'
import toast from 'react-hot-toast'
import { RxCrossCircled } from "react-icons/rx";
import { FaPlus,FaRegEdit  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const UpdateExpense = () => {
    const {userData,URL}=useContext(Authinication)
    const [isModelOpen,setIsModelOpen] =useState(false);
    const [selectedOne,setSelectedOne] = useState();
    const [incomeName,setIncomeName] = useState();
    const [incomeAmount,setIncomeAmount] = useState();

    const handleOpenModel=(item)=>{
      setIsModelOpen(!isModelOpen);
      setSelectedOne(item)
      setIncomeAmount(item.amount)
      setIncomeName(item.nameOfExpense)
    }

    const handleUpdateExpense=async()=>{
      let res=await fetch(`${URL}/api/updateExpense`,{
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
        setIncomeAmount('')
        setIncomeName('')
        setIsModelOpen(false)
      }else{
        toast.error(res.message)
      }
    }

    const deleteExpense=async(item)=>{
      let res=await fetch(`${URL}/api/deleteExpense`,{
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
    <div className="text-white  h-[89vh]  w-[100%]">
        <h1 className='text-3xl font-bold'>Expense Transactions</h1>

        <hr />
        <div className='flex flex-col items-center justify-center mt-6'>
            {userData.expense.length>0?
            (<table>
                <h1 className="text-xl font-bold">Expenses Transactions</h1>
                <tr>
                <th>S.No</th>
                <th >Expense Name</th>
                <th>Expense Amount</th>
                <th>Expense Date & Time</th>
                <th>Action</th>
            </tr>
                {userData.expense.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.nameOfExpense}</td>
                            <td>&#8377;. {item.amount}/-</td>
                            <td>{item.dateAdded} & {item.TimeAdded}</td>
                            <td>
                                <button className='bg-orange-600 mr-1 p-1 rounded-md' onClick={()=>handleOpenModel(item)}>
                                  <FaRegEdit  size={20}/>
                                </button>
                               
                                <button onClick={()=>deleteExpense(item)} className='bg-red-800 rounded-md p-1 mt-1'><MdDelete  size={20}/></button>
                            </td>
                        </tr>
                    )
                })}
                </table>
                ):
            (
                <h1 className='text-xl text-red-400 font-semibold text-center'>No Expenses added yet😢😢😢</h1>
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
                  <h1 className='text-red-400 text-center text-2xl font-bold'>Update Expense</h1>
                  <hr />
                  <div className='w-[100%] mt-2'>
                    <label htmlFor="">Expense Name</label>
                    <br />
                    <input onChange={(e)=>setIncomeName(e.target.value)} value={incomeName} type="text" placeholder='Enter Expense name' className='p-2 rounded-md bg-slate-300' />
                  </div>
                  <div className='w-[100%] mt-3'>
                    <label htmlFor="">Expense Amount</label>
                    <br />
                    <input onChange={(e)=>setIncomeAmount(e.target.value)} value={incomeAmount} type="number" placeholder='Enter Expense amount' className='p-2 rounded-md bg-slate-300' />
                  </div>
                  <div className='mt-2 '>
                    <button onClick={handleUpdateExpense} className='bg-green-800 rounded-md text-xl text-white p-3 w-full'>Update Expense</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        
    </div>
  )
}

export default UpdateExpense