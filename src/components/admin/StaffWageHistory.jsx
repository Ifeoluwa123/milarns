
import React, { useState } from 'react'
import ChartContent from './ChartContent';
import FinancialTransactionDataTable from './FinancialTransactionDataTable';
import { payrolldata } from '../../utilities/admin/Data';
import StaffWageHistoryDatatable from './StaffWageHistoryDatatable';

import { useParams } from 'react-router-dom';
import { useGetSingleEmployeeWageChartData } from '../../services/admin/queries';
export default function StaffWageHistory() {

    let [data, setData] = useState(payrolldata)

    let {staffId} = useParams()


 

  let {data:res, isLoading, isError, error} = useGetSingleEmployeeWageChartData(staffId)

 
      if(isLoading){
        return <h1>Loading...</h1>
      }

      if(isError){
        console.log(error)
      }


  let weekly_data ={graph:[]}
  let monthly_data ={graph:[]}
  let yearly_data ={graph:[]}
  if(res){
    weekly_data = res[0]?.data
    monthly_data = res[1]?.data
    yearly_data = res[2]?.data

    

  }
  

    
  return (
      <div className=''>
          {/*CHART SECTION */}
          <div className="">
          <ChartContent 
              
              weekdata={weekly_data}
              monthdata={monthly_data}
              yeardata={yearly_data}
           
              />  
          </div>


        {/* ALL TRANSACTION DATATABLE */}
          <div className="mt-[2rem]">
                <StaffWageHistoryDatatable  /> 
          </div>
    </div>
  )
}


