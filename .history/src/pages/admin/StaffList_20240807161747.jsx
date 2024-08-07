import React, { useState } from 'react'
import AdminCustomLayout from '../../layouts/AdminCustomLayout'
import ComponentLeft from '../../components/admin/ComponentLeft'
import ComponentRight from '../../components/admin/ComponentRight'
import WhiteCard from '../../components/admin/WhiteCard'
import PinkAlert from '../../components/admin/PinkCard'
import NoRecordFound from '../../components/shared/NoRecordFound'

import Modals from '../../components/shared/Modals'

import InnerButton from '../../components/shared/InnerButton'

 
import AddNewStaffModalBody from '../../components/admin/AddNewStaffModalBody'
import { IoAdd } from "react-icons/io5";

import StaffListDataTable from '../../components/admin/StaffListDataTable'

import arrayToObject from '../../utilities/arrayToObject'
import { useAllResgisteredEmployees, useDashboardDataDataQuery, useExportAllResgisteredEmployees } from '../../services/admin/queries'
// import exportToExcel from '../../utilities/exportToExcel'



export default function StaffList() {
  let [isModalOpen, setIsModalOpen] = useState(false)
 

  let {data:response, isLoading:isDataLoading, isError, error:errorMsg} = useDashboardDataDataQuery()

  // if(isDataLoading){
  //   return <h1>Loading...</h1>
  // }
  // if(isError){
  //   return <Error404 status={errorMsg.response.status} message={errorMsg.response.data.message} desc ={errorMsg.message} />
  // }


  // const adminInfo = localStorage.getItem('adminInfo')
  let {data, isLoading, error } = useAllResgisteredEmployees()

  let {data:excelLink }= useExportAllResgisteredEmployees()

  // console.log(excelLink)


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
 


  
  let addNewstaffHandler = ()=>{
    setIsModalOpen(true)
  }

  const handleExport = ()=>{
        console.log("Working")
        const blob = new Blob([excelLink], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
        const excelSheet = URL.createObjectURL(blob);
        // exportToExcel()
        return window.open(excelSheet, '_blank')
  }



  let overview = {graph:[]}

  if(response){
    overview = response[2]?.data
  }

  console.log(response)

  return (
    <div>
      <AdminCustomLayout>
          <Modals  isOpens={isModalOpen} setIsopens={setIsModalOpen} title="Add new staff">
                <AddNewStaffModalBody setIsModalOpen={setIsModalOpen} />
          </Modals>
        {/* LEFT CONTENT */}
            <ComponentLeft>
           
               <div className="grid grid-cols-2 gap-x-3 mt-[1rem] oveflow-hidden ">
                    <WhiteCard label="Total staff onboard" value={overview?.total_staff> 0? overview?.total_staff : 0} />
                    <WhiteCard label="Staff on advance" value={overview?.total_staff_on_advance> 0? overview?.total_staff_on_advance : 0} />
               </div>
               

               <div className="grid grid-cols-2 gap-x-3 mt-[1rem] oveflow-hidden">
                    <PinkAlert label="Wages pulled this month" value={overview?.current_wage_pulled> 0? overview?.current_wage_pulled : 0} type='wallet' />
                    <PinkAlert label="Upcoming salary to be paid to staff" value={overview?.upcoming_salary> 0? overview?.upcoming_salary : 0} type='cash' />
               </div>


            </ComponentLeft>


{/* RIGHT CONTENT */}
            

<ComponentRight> 

{
      data.results.length> 0 ? 
      // <AllStaffListTable addNewstaffHandler={addNewstaffHandler} /> : 
      <StaffListDataTable
      addNewstaffHandler={addNewstaffHandler}
        
        itemsPerPage={6}

        staffList={data.results}
        // setData={setData} 
        handleExport= {handleExport}
      /> 
  
      :
      
      <div className="p-[1rem] border-[1px] rounded-[4px] my-[2rem] overflow-hidden">
        <NoRecordFound
      title="No staff onboarded yet"
      label="Click the button to onboard your staffs."
      component={<InnerButton text="Add new staff"  icon={<IoAdd />} onClick={addNewstaffHandler} />}
      // component={<InnerButton text="Add new staff"  icon={<IoAdd />} onClick={addNewstaffHandler} />}
    
    />

      </div>
     } 
</ComponentRight>

          </AdminCustomLayout>
    </div>
  )
}


