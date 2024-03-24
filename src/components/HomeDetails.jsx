import Authinication from '@/hooks'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import greetingTime from 'greeting-time';
import Boxes from './Boxes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Cookies from 'js-cookie';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const HomeDetails = () => {
    
    const {token,userData,URL}=useContext(Authinication);
    const [datas,setDatas]=useState([])

    const [time,setTime]=useState();
    setInterval(()=>{
      const d=new Date().toLocaleTimeString();
      setTime(d);
    },1000)


    const getDetailsOfUser=async()=>{
      const userToken = Cookies.get('token');
        let res=await fetch(`${URL}/api/getUserDetails/${userToken}`);
        res= await res.json();
        // console.log(res)
        setDatas(res.financialData);
    }

    useEffect(()=>{
      const userToken = Cookies.get('token');
      if(userToken){
          getDetailsOfUser()
      }
  })

  // console.log(datas)




  

    let totalIncome=0,totalExpense=0,totalRemaining=0;

    userData?.income?.forEach(element => {
      totalIncome+=element.amount;
    });

    userData?.expense?.forEach(element => {
      totalExpense+=element.amount;
    });

    totalRemaining=totalIncome-totalExpense;

    const data = {
      // labels: result?.ordersWithGrowth?.map((data) => data.month),
      labels: datas.map((item)=>item.month),
      datasets: [
        {
          label: 'Income',
          data: datas.map((item)=>item.income),
          borderColor: 'rgb(2, 255, 95)',
          backgroundColor: 'rgba(2, 255, 95)',
          yAxisID: 'y',
        },
        {
          label: 'Expenses',
          data:datas.map((item)=>item.expenses),
          borderColor: 'rgb(205, 22, 22)',
          backgroundColor: 'rgba(235, 53, 53, 0.5)',
          yAxisID: 'y1',
        },
      ],
    };
    
    const config = {
      responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  animations: {
    tension: {
      duration: 4000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
    };


   



  return (
    <div className='text-white md:w-[100%]'>
        <div className='flex flex-col md:flex-row  items-center justify-between'>
          <h1 className='text-2xl font-bold'>{greetingTime(new Date())}, {userData?.username}</h1>
          {
            totalRemaining<500?(<div className=' md:flex mt-2 mb-2' id="gloww">
            {(() => {
              if (totalRemaining < 500 && totalRemaining > 1) {
                return <p>{totalRemaining} money is only remaining now... Time to add now!!</p>;
              } else if (totalRemaining < 0) {
                return <p>No money left in wallet. Your balance is in negative</p>;
              } else {
                return null;
              }
            })()}
          </div>):(null)
          }
          <p className='hidden md:flex'> {new Date().toLocaleDateString()}</p>
          
        </div>
        <hr className='border-gray-200 mt-1'/>
        
        <div className='mt-5 md:flex justify-between '>
          
          {/* <Chart /> */}
          <Boxes color={"bg-green-600"}   totalTransa={userData?.income?.length} name={"Income"}  amount={totalIncome}/>

          <Boxes  totalTransa={userData?.expense?.length} color={"bg-red-600"} name={"Expense"} amount={totalExpense}/>
          
          <Boxes color={"bg-orange-600"}  name={"Remaining"} amount={totalRemaining}/>
        </div>

        {/* adding charts here */}
        <div className='flex items-center justify-center'>
          <div className='w-full  md:h-[500px] cursor-pointer flex items-center justify-center mt-5'>
            <Line
              data={data} 
              options={config}
            />  
          </div>
        </div>
        
    </div>
  )
}

export default HomeDetails