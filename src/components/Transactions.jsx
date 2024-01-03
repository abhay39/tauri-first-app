import Authinication from '@/hooks'
import React,{useContext} from 'react'

const Transactions = () => {
    const {userData,setUserData}=useContext(Authinication)
  return (
    <div className="text-white w-full min-h-screen flex items-center  flex-col">
        <h1 className='text-3xl font-bold'>Transactions</h1>

        <hr />
        <div className='flex flex-col w-full items-center justify-center mt-6 ' >
        <h1 className="text-xl w-full font-bold text-center">Income Transactions</h1>
            {userData.income.length>0?
            (
                <table className=''>
                <tr>
                <th>S.No</th>
                <th>Income Name</th>
                <th>Income Amount</th>
                <th>Income Date & Time</th>
            </tr>
                {userData.income.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.nameOfIncome}</td>
                            <td>&#8377;. {item.amount}/-</td>
                            <td>{item.dateAdded} & {item.TimeAdded}</td>
                        </tr>
                    )
                })}
                </table>
                ):
            (
                <h1 className='text-xl text-red-400 font-semibold text-center'>No income added yet😢😢😢</h1>
            )}
        </div>


        <div className='flex flex-col w-full items-center justify-center mt-6'>
            <h1 className="text-xl font-bold">Expense Transactions</h1>
            {userData.expense.length>0?
            (<table>
                <tr>
                <th>S.No</th>
                <th>Expense Name</th>
                <th>Expense Amount</th>
                <th>Expense Date & Time</th>
            </tr>
                {userData.expense.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.nameOfExpense}</td>
                            <td>&#8377;. {item.amount}/-</td>
                            <td>{item.dateAdded} & {item.TimeAdded}</td>
                        </tr>
                    )
                })}
                </table>
                ):
            (
                <h1 className='text-xl text-red-400 font-semibold text-center'>No expenses added yet😢😢😢</h1>
            )}
        </div>
    </div>
  )
}

export default Transactions