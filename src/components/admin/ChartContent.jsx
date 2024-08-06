import React, { useEffect, useState } from 'react'
import ChartHeader from './ChartHeader'
import Chartjs from './Chartjs'
import arrayToObject from '../../utilities/arrayToObject'

export default function ChartContent({weekdata, monthdata, yeardata}) {
  

    let [selectPull, setSelectPull] = useState('W')
    let [chartdata, setChartData] = useState(weekdata.graph)
   
    useEffect(()=>{
        if(selectPull == 'W')setChartData(weekdata.graph || null)
        if(selectPull == 'M')setChartData(monthdata.graph.length >0 && monthdata.graph)
        if(selectPull == 'Y')setChartData(yeardata.graph.length >0 && yeardata.graph)
    },[selectPull])

    // console.log(chartdata)

  return (
    <div className="">
        <div className="p-[1rem] border-[1px] rounded-[4px]">
            <ChartHeader selectPull={selectPull} setSelectPull={setSelectPull} value={{weekly_amt:weekdata.total? weekdata.total : 0, monthly_amt:monthdata.total? monthdata.total: 0, yearly_amt:yeardata.total?yeardata.total:0}} />
            {
              selectPull === "W" || selectPull === "M"? 
              <Chartjs  index="date" selectPull={selectPull} chartdata={chartdata} />
              :
              
              <Chartjs index="month" selectPull={selectPull} chartdata={chartdata} />
            }
              
        </div>
    </div>
  )
}













  
  const monthdata = [
    // {
    //   date: "Week 1",
    //   value: 10,
      
    // },
    // {
    //   date: "Week 2",
    //   value: 1500,
      
    // },
    // {
    //   date: "Week 3",
    //   value: 5000,
      
    // },
    // {
    //   date: "Week 4",
    //   value: 8300,
      
    // },
    
  ];
  
  const yeardata = [
    {
      date: "Jan 01",
      value: 10,
      
    },
    {
      date: "Mar 10",
      value: 1500,
      
    },
    {
      date: "Apr 25",
      value: 5000,
      
    },
    {
      date: "Apr 27",
      value: 8300,
      
    },
    {
      date: "May 22",
      value: 2080,
      
    },
    {
      date: "June 10",
      value: 4090,
      
    },
    {
      date: "Dec 20",
      value: 4090,
      
    },
    {
      date: "Dec 25",
      value: 4090,
      
    },
  ];
  
  
  
  
  
  
  
  
  
  
  // const chartdata = [
  //   {
  //     date: "Jan 22",
  //     SemiAnalysis: 2890,
  //     "The Pragmatic Engineer": 2338,
  //   },
  //   {
  //     date: "Feb 22",
  //     SemiAnalysis: 2756,
  //     "The Pragmatic Engineer": 2103,
  //   },
  //   {
  //     date: "Mar 22",
  //     SemiAnalysis: 3322,
  //     "The Pragmatic Engineer": 2194,
  //   },
  //   {
  //     date: "Apr 22",
  //     SemiAnalysis: 3470,
  //     "The Pragmatic Engineer": 2108,
  //   },
  //   {
  //     date: "May 22",
  //     SemiAnalysis: 3475,
  //     "The Pragmatic Engineer": 1812,
  //   },
  //   {
  //     date: "Jun 22",
  //     SemiAnalysis: 3129,
  //     "The Pragmatic Engineer": 1726,
  //   },
  // ];
  
 