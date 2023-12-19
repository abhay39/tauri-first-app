import Authinication from '@/hooks'
import React, { useContext, useState } from 'react'
import greetingTime from 'greeting-time';
import Boxes from './Boxes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { Pie,Line } from "react-chartjs-2";
import { datasss } from '@/app/dummy/boxesVals';


ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title);


export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
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

const HomeDetails = () => {
    
    const {token,userData}=useContext(Authinication);

    const [time,setTime]=useState();
    setInterval(()=>{
      const d=new Date().toLocaleTimeString();
      setTime(d);
    },1000)

    let totalIncome=0,totalExpense=0,totalRemaining=0;

    userData?.income?.forEach(element => {
      totalIncome+=element.amount;
    });

    userData?.expense?.forEach(element => {
      totalExpense+=element.amount;
    });

    totalRemaining=totalIncome-totalExpense;

    const data = {
      labels: ['Income', 'Expense', 'Remaining'],
      datasets: [
        {
          
          data: [totalIncome,totalExpense,totalRemaining],
          backgroundColor: [
            'green',
            'red',
            'orange',
            
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 2,
          cursor: 'pointer',

        },
      ],
      
    };


   



  return (
    <div className='text-white md:w-[100%]'>
        <div className='flex  items-center justify-between'>
          <h1 className='text-2xl font-bold'>{greetingTime(new Date())}, {userData?.username}</h1>
          {
            totalRemaining<500?(<div id="gloww">
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
          <p> {new Date().toLocaleDateString()}</p>
          
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
          <div className='md:w-[550px]  sm:w-[100%] md:h-[400px] sm:h-[100%] cursor-pointer flex items-center justify-center mt-5'>
            <Pie  data={data} />
          </div>
        </div>
        
    </div>
  )
}

export default HomeDetails