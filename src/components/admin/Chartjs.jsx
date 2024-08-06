import { AreaChart, Card } from '@tremor/react'
import React, { useEffect, useState } from 'react'


export default function Chartjs({selectPull,chartdata,index}) {

  return (
    // <Card className='mt-[1rem] px-[0.4rem] md:px-[1rem] font-[600] '>
    <AreaChart
      className="h-[300px] mt-4 px-0 mx-0 "
      // monthdata
      data={chartdata.length > 0 ? chartdata : selectPull === "W" ? weekdata  : selectPull === "M" ? monthdata : selectPull === "Y"  ? yeardata: null}
      // data={selectPull === "W" ? weekdata  : selectPull === "M" ? monthdata : selectPull === "Y"  ? yeardata: chartdata}
      // data={selectPull === "W" && chartdata.length == 0 ? weekdata  : selectPull === "M" && chartdata.length == 0 ? monthdata : selectPull === "Y" && chartdata.length == 0 ? yeardata: chartdata}
      // data={chartdata}
      // noDataText="No Wage Pull Found"
      // index="date" //For x-axis 
      index={index} //For x-axis 
  
      //categories={["value"]} // for y-axis
      categories={["amount"]} // for y-axis
      colors={selectPull == 'W'? ["red"]: selectPull == 'M' ? ["green"] : selectPull == 'Y'? ['blue'] : null}
      valueFormatter={valueFormatter}
      startEndOnly={false}
      curveType="monotone"
      showLegend={false}
      animationDuration={1500}
      showAnimation={true}
      
      intervalType="preserveStartEnd"
      // connectNulls={true}
    />
//   </Card>
  )
}


const valueFormatter = function(number) {
    return "₦"+ new Intl.NumberFormat("Ng").format(number).toString();
  };




  const weekdata = [
    {
      date: "Sun",
      amount: 0,
      
    },
    {
      date: "Mon",
      amount: 0,
      
    },
    {
      date: "Tue",
      amount: 0,
      
    },
    {
      date: "Wed",
      amount: 0,
      
    },
    {
      date: "Thurs",
      amount: 0,
      
    },
    {
      date: "Fri",
      amount: 0,
      
    },
    {
      date: "Sat",
      amount: 0,
      
    }
   
   
  ];




  const monthdata = [
    {
      date: "Week 1",
      amount: 0,
      
    },
    {
      date: "Week 2",
      amount: 0,
      
    },
    {
      date: "Week 3",
      amount: 0,
      
    },
    {
      date: "Week 4",
      amount: 0,
      
    },
    
  ];

  const yeardata = [
    {
      month: "Jan",
      amount: 0,
      
    },
    {
      month: "Feb",
      amount: 0,
      
    },
    {
      month: "Mar",
      amount: 0,
      
    },
    {
      month: "Apr",
      amount: 0,
      
    },
    {
      month: "May",
      amount: 0,
      
    },
    {
      month: "June",
      value: 0,
      
    },
    {
      month: "July",
      value: 0,
      
    },
    {
      month: "Aug",
      value: 0,
      
    },
    {
      month: "Sept",
      value: 0,
      
    },
    {
      month: "Oct",
      value: 0,
      
    },
    {
      month: "Nov",
      value: 0,
      
    },
    {
      month: "Dec",
      value: 0,
      
    },
  ];