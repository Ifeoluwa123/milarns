import React, { useEffect } from 'react'
import WelcomeBoard from '../../components/admin/WelcomeBoard'
import AdminCustomLayout from '../../layouts/AdminCustomLayout'
import ComponentLeft from '../../components/admin/ComponentLeft'
import ComponentRight from '../../components/admin/ComponentRight'
import ChartContent from '../../components/admin/ChartContent'
import PinkAlert from '../../components/admin/PinkCard'
import WhiteCard from '../../components/admin/WhiteCard'
import NoRecordFound from '../../components/shared/NoRecordFound'
import RecentWagePulledList from '../../components/admin/RecentWagePulledList'
 


import { useQuery } from '@tanstack/react-query'
import arrayToObject from '../../utilities/arrayToObject'
import { useDashboardDataDataQuery, useGetRecentOrgWagePulled } from '../../services/admin/queries'
import Error404 from '../Error404'
// import logoutUser from '../../utilities/logoutUser'


export default function AdminDashboard() {
  let {data:recentWage, isLoading:isRecentWageloading} = useGetRecentOrgWagePulled()



  const adminInfo = localStorage.getItem('adminInfo')

  
  // const tokenKey = localStorage.getItem('adminToken')

  // if( adminInfo){
  

  // }else{
  //     <Error404 />
  // }

  let {data:response, isLoading, isError, error} = useDashboardDataDataQuery()

        if(isLoading){
          return <h1>Loading...</h1>
        } 

        // if(error.response.data.detail === "Given token not valid for any token type"){
          
        //         return logoutUser()
        // }
        if(isError){
          return <Error404 status={error.response.status} message={error.response.data.message} desc ={error.message} />
        }

    
 
         const analytics = response[0]?.data
      // const wagepull = response[1]?.data
      const overview = response[1]?.data
      const wGraph = response[2]?.data 
      const mGraph = response[3]?.data 
      const yGraph = response[4]?.data 
    
    

  return (
    // <div className='border- border-red-600  z-[-1000]'>
    <div className='border- border-red-600  h-[200vh] '>
    
   
    
    
   <AdminCustomLayout>
    {/* DashBoard */}
  
            <ComponentLeft>
               <WelcomeBoard currentWagePulled = {overview.current_wage_pulled} />
               <div className="grid grid-cols-2 gap-x-3 mt-[2.5rem] oveflow-hidden">
                    <PinkAlert label="Unpaid overdue Wages pulled" value={overview.unpaid_overdue_wage_pulled} type='wallet' />
                    <PinkAlert label="Upcoming salary to be paid to staff" value={overview.upcoming_salary} type='cash' />
               </div>
               <div className="grid grid-cols-2 gap-x-3 mt-[1rem] oveflow-hidden mb-[2rem] md:mb-[5rem]">
                    <WhiteCard label="Total staff onboard" value={overview.total_staff} />
                    <WhiteCard label="Staff on advance" value={overview.total_staff_on_advance} />
               </div>
            </ComponentLeft> 

            <ComponentRight>

              <ChartContent  
               
              weekdata={wGraph}
              monthdata={mGraph}
              yeardata={yGraph}
              // weekly_amt="120,000"
              // monthly_amt="0"
              // yearly_amt="8,000"
              /> 
              
              
                 {


        isRecentWageloading? <h1 className='flex h-full justify-center items-center  p-[1rem] border-[1px] rounded-[4px] my-[2rem] overflow-hidden'>Loading</h1> : 

        <>

          {
             recentWage.length > 0? <RecentWagePulledList data={recentWage} /> : <div className="p-[1rem] border-[1px] rounded-[4px] my-[2rem] overflow-hidden">
             <NoRecordFound
                  title="No recent wages pulled yet"
                  label="Oblige your employees to download WagePull app to access their salary in-advance"
         
         />

           </div>
          }
        
        </>
                
                 } 
                 
            </ComponentRight>

  </AdminCustomLayout>

         
    </div>
  )
}

