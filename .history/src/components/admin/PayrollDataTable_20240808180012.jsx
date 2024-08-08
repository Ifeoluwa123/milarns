import React, { useEffect, useState } from 'react'
import Checkbox from '../shared/Checkbox'

import {BiDotsVerticalRounded} from 'react-icons/bi'
import {GoDotFill} from 'react-icons/go'
import Pagination from '../shared/Pagination'
import OutlineButton from '../shared/OutlineButton'
import Button from '../shared/Button'
import { IoMdArrowDropdown } from 'react-icons/io'
import { RiDeleteBin6Line } from 'react-icons/ri'
import TableMenuList from '../shared/TableMenuList'
import { LiaTrashAlt, LiaUserAltSlashSolid } from 'react-icons/lia'
import { Link, useParams } from 'react-router-dom'
import arrayToObject from '../../utilities/arrayToObject'
import { FiEdit2 } from 'react-icons/fi'
import Modals from '../shared/Modals'
import { CiUser } from 'react-icons/ci'
import { TbFileExport } from 'react-icons/tb'
import { IoAdd } from 'react-icons/io5'
import InnerButton from '../shared/InnerButton'
 
import { IoTrashOutline } from "react-icons/io5";
import { IoCardOutline } from "react-icons/io5";
import {TbCurrencyNaira} from 'react-icons/tb'
import { useComputeEmployeeSalary, useGeneratePayroll } from '../../services/admin/mutation'
import { Datepicker } from "flowbite-react";
import AlertMessages from '../shared/AlertMessages'
import formatDate from '../../utilities/formatDate'
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter'
import ModalPayrollSalary from '../shared/ModalPayrollSalary'
import ModalPayrollAddBonus from '../shared/ModalPayrollAddBonus'
import Spinner from '../shared/Spinner'
import ModalPayrollAddDeduction from '../shared/ModalPayrollAddDeduction' 
import { handleSelectAll } from '../../utilities/checkedBoxDataTableHandler'


export default function PayRollDataTable({data:datas,handleDateChange, monthYear,itemsPerPage,addNewstaffHandler }) {
  
  
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [selectedRows, setSelectedRows] = useState([]);
    const [deleteRecord, setDeleteRecord] = useState(false)
    const [deactivateRecord, setDeactivateRecord] = useState(false)
    const [selectAll, setSelectAll] = useState(false); //For checbox
    const [bulkDelete, setBulkDelete] = useState(false)
    let [data, setData]= useState(datas)

    useEffect(()=>{
      const updatedItems = data.map(item => ({ ...item, checked: false }));
      setData(updatedItems)
    },[datas])
   



    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    let paginatedData = data.slice(startIndex, endIndex)
    const totalPages = Math.ceil(data.length / itemsPerPage)

    console.log(data)

    // let {staffId} = useParams()

    let handleProceed = ()=>{
      // console.log(selectedRows)
      console.log(data.filter(item=>item.isChecked === true))
    }
    const handlePageChange = (page)=>{
        setCurrentPage(page)
    }


   // MENU LIST CONFIGURATION
   const handleRowClick = (userId) => {
    // console.log(userId)
    if (selectedUser?.code === userId) {
      setSelectedUser(null); // Hide details if the same row is clicked again
    } else {
      setSelectedUser(arrayToObject(data.filter((item)=>item.code === userId)));
    
    }
  };



  
  let handleActionType = (actionType, id) =>{
    if(actionType === 'delete'){
      setDeleteRecord(true)
      setSelectedUser(id)
      setBulkDelete(false)
      console.log("delete", id)
    }
    if(actionType === 'deactivate'){
      setDeactivateRecord(true)
      setSelectedUser(id)
    }
  }

 
//  const deactivateSingleRecord = ()=>{
  
//  }

let {error, data:res,mutate, isSuccess } = useGeneratePayroll()




  const handleGenratePayroll = ()=>{
    mutate(monthYear,{
      onSuccess:(res)=>{
        // console.log(res)
        return AlertMessages("Payroll Generated Successfully",res.message, "success")
      },
      onError:(err)=>{
        console.log(err)
      }
    })
  }



// console.log(arrayToObject(data))
// console.log(data)
   
let [isModalSalaryOpen, setIsModalSalaryOpen] = useState(false)
let [modalSalaryValues, setModalSalaryValues] = useState({})
// let [modalSalaryValues, setModalSalaryValues] = useState({
//   total_wage_pulled:null,
//   total_net_salary:null,
//   total_payment:null,
//   current_balance:null,
//   month:null,
//   year:null,
//   codes:[],
//   record_type:null
// })


let [isModalBonusOpen, setIsModalBonusOpen] = useState(false)
let [staffCodes, setStaffCode] = useState(null)






// HANDLE SALARY COMPUTATION
let computeMutation = useComputeEmployeeSalary()
const handlePaySalary = (staffId)=>{
        monthYear.codes = [staffId]
        const data = {...monthYear}
        setSelectedUser(null);
    computeMutation.mutate(data, {
        onSuccess:(success)=>{
              // console.log(success)
              // 
              setIsModalSalaryOpen(true)
              setModalSalaryValues(success)
        },
        onError:(error)=>{
          console.log(error)
        }
  })
}
// HANDLE SALARY COMPUTATION //


// HANDLE PAYOUT SALARY 

// HANDLE PAYOUT SALARY 



// HANDLE ADD-BONUS 
let handleModalBonus = (staffCode)=>{
 
  setStaffCode(staffCode)
  setIsModalBonusOpen(true)
  setSelectedUser(null);
}
// HANDLE ADD-BONUS


// HANDLE ADD-DEDUCTION 
let [isModalDeductionOpen, setIsModalDeductionOpen] = useState(false)

let handleModalDeduction = (staffCode)=>{

  setStaffCode(staffCode)
  setIsModalDeductionOpen(true)
  setSelectedUser(null);
}
// HANDLE ADD-DEDUCTION

    return (
      <div className="pb-[5rem] "> 

        {/* FOR GENERATE PAYROLL NOTIFICATION */}
     
         {/* DELETE MODAL */}
         <Modals isOpens={deleteRecord} setIsopens={setDeleteRecord} title="Delete Payroll">
                        <div className="">
                          <h6 className='font-[600] '>Are you sure you want to delete this staff's payroll?</h6>
                            <p className='text-[0.8rem]'>Once you delete this payroll, you will not be able to retrieve it.</p>
                          </div>

                          <div className="flex items-center gap-x-[2rem] mt-[1rem]">
                          <Button onClick={()=>deleteSingleUser(selectedUser)} text="Yes Proceed" width="w-fit" padding="py-[0.5rem] px-[1.7rem]" />
                          <OutlineButton onClick={()=>setDeleteRecord(false)} text="Cancel"  />
                          </div>
        </Modals>
         {/* DEACTIVATE MODAL */}
        <Modals isOpens={deactivateRecord} setIsopens={setDeactivateRecord} title="Deactivate Staff">
                 <div className="">
                          <h6 className='font-[600] '>Are you sure you want to deactivate this staffs?</h6>
                            <p className='text-[0.8rem]'>Once you deactivate this staffs, you can still reactivate staff.</p>
                          </div>

                          <div className="flex items-center gap-x-[2rem] mt-[1rem]">
                          <Button onClick={()=>deactivateSingleUser(selectedUser)} text="Yes Proceed" width="w-fit" padding="py-[0.5rem] px-[1.7rem]" />
                          <OutlineButton onClick={()=>setDeactivateRecord(false)}  text="Cancel"  />
                          </div>
        </Modals>


        {/* MODAL TO PAY SALARY */}
        {
          computeMutation.isPending? <Spinner /> :  <ModalPayrollSalary  mutation= {computeMutation} value={modalSalaryValues} isOpen={isModalSalaryOpen} setIsOpen={setIsModalSalaryOpen} />
        }
       
    {/* MODAL TO ADD BONUS */}
    <ModalPayrollAddBonus staffCode={staffCodes} isOpen={isModalBonusOpen} setIsOpen={setIsModalBonusOpen} />
   
    {/* MODAL TO ADD BONUS */}
    <ModalPayrollAddDeduction staffCode={staffCodes} isOpen={isModalDeductionOpen} setIsOpen={setIsModalDeductionOpen} />


     {/* HEADER SECTION */}
     <div className="flex flex-wrap  items-center justify-between mb-[3rem]">
                  <div className="flex items-center">
                    <p className='font-[600] mr-[1rem]'>Staff Payroll</p>
                    <div className="">
                    
                    {/* <input type="month" id="start" name="start" className='rounded-[2re]'  /> */}
                      <Datepicker onSelectedDateChanged={(date)=>handleDateChange(date)}    />
                    </div>
                  </div>
                    <div className="flex gap-x-[1rem] mt-[0.6rem] sm:mt-0">
                        <InnerButton onClick={addNewstaffHandler} text="Payroll Action" width="w-fit text-[0.85rem]"  icon={<IoAdd />}  />
                        <OutlineButton type="button" onClick={handleGenratePayroll} text="Generate payroll" style="text-[0.85rem]" />
                    </div>
        </div>
    
     {/* TABLEDATA */}
    
     <div className='data_table   no-scrollbar    overflow-x-auto scrollbar-hidden-x'>
                
                
                
                
                
                <table  className='rounded-md   text-left text-[0.85rem] border-[0.4px]' >
              <thead   >
                 <tr  >
                     <th className='z-[20]'><Checkbox name="selectAll" onChange={()=>handleSelectAll(selectAll, setSelectAll, data, setData,  setSelectedUsers)} /></th>
                     <th className='z-[20] '>Name</th>
                     <th className='hidden md:table-cell z-[20]'>Earned wages</th>
                     <th className='hidden md:table-cell z-[20]'>Deduction</th>
                     <th className='hidden md:table-cell z-[20]'>Wage pulled</th>
                     <th className='hidden md:table-cell z-[20]'>Net payroll</th>
                     <th className='hidden md:table-cell z-[20]'>Bonus earned</th>
                     <th className=' z-[20]'>Net salary</th>
                     <th className='hidden md:table-cell z-[20]'>Status</th>
                     <th className='z-[20]'></th>
               
                 </tr>
             </thead>
             <tbody>
                 {
                paginatedData.map((item,i)=>{
                         return(
                      <React.Fragment key={i}>
                 <tr    className='relative z-[10]  hover:bg-[--grey-color] rounded-md hover:shadow-[2px_2px_1px_2px_rgba(0,0,0,1)] '>
                         <td ><Checkbox id={item.id} checked={item.isChecked} onChange={(e)=>handleRowChange(item.code, data, setData, setSelectAll, setSelectedUsers)} /></td>
                         <td className='flex  pl-0 ml-[1rem] items-center gap-x-0 md:gap-x-[1rem] sm:min-w-[200px] min-w-fit'>
                         
                             <div >
                             <h3 className='font-[700]'>{item.staff.first_name + " " + item.staff.last_name}</h3>
                             <p className='text-gray-400'>{formatDate(item.earn_date) }</p>
                             </div>
                         
                         </td>
                        
                         <td  className='hidden md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.earn_wages? item.earn_wages : 0}.00</p></td>
                         <td className='hidden md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.total_deductions? item.total_deductions : 0}.00</p></td>
                         <td className='hidden md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.wage_pulled? item.wage_pulled : 0}.00</p></td>
                         <td  className='hidden md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.net_wages? item.net_wages : 0}.00</p></td>
                         <td  className='hidden md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.total_bonus? item.total_bonus : 0}.00</p></td>
                         <td  className='hidden md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.payable_net_wages? item.payable_net_wages : 0}.00</p></td>
                    
                        
                        {/* FOR MOBILE  VIEW */}
                         <td className='table-cell md:hidden'>

                         

                                  <div className="md:hidden ">
                                  <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.payable_net_wages? item.payable_net_wages : 0}.00</p>

                                    <p className='flex justify-end w-fit '>
                                    {
                                      item.status === "unpaid" && <span  className=' text-red-600 flex  items-center'><span><GoDotFill size={10} /></span>{capitalizeFirstLetter( item.status)}</span>
                                    }
                                    {
                                      item.status === "paid" &&  <span className='  text-green-600 flex  items-center'><span><GoDotFill size={10} /></span> {capitalizeFirstLetter( item.status)}</span>
                                    }
                                    </p>
                                  </div>

                                </td>

                                {/* FOR DESKTOP VIEW */}
                         <td className='hidden md:table-cell'>

                          {
                             item.status === "unpaid" && <span  className=' text-red-600 md:flex  items-center'><span><GoDotFill size={10} /></span>{capitalizeFirstLetter( item.status)}</span>
                          }
                          {
                             item.status === "paid" &&  <span className='  text-green-600 md:flex  items-center'><span><GoDotFill size={10} /></span> {capitalizeFirstLetter( item.status)}</span>
                          }
                             {/* {
                                 item.status? 
                                 <span className='  text-green-600 md:flex  items-center'><span><GoDotFill size={10} /></span> {item.status}</span>:
                                 <span  className=' text-red-600 md:flex  items-center'><span><GoDotFill size={10} /></span>Unpaid</span>
                             } */}
                             
                             
                            </td>
                            <td className='relative ' >
                             <span onClick={() => handleRowClick(item.code)} className='cursor-pointer table_row hidden md:block'><BiDotsVerticalRounded /></span>
                             <span onClick={() => handleRowClick(item.code)} className='block md:hidden text-gray-600'><IoMdArrowDropdown /></span>
                         
                            
                         </td>
                 </tr>
{selectedUser?.code === item.code && (
                    
  <tr  className='bg-[var(--grey-color)]   hover:bg-[var(--grey-color)]   '>
   
    {/* DESKTOP VIEW */}
    <div className="bg-[var(--grey-color)] hidden md:block absolute  md:right-[2%]   hover:bg-[var(--grey-color)] z-[200]">
                           <div className="  border-2  mt-[-15px]    p-0 z-[50]   rounded-md overflow-hidden  bg-[var(--grey-color)]  w-fit  shadow-[2px_2px_1px_2px_rgba(0,0,0,1)]">
                           <TableMenuList id={item.code} items={[
      
                            {icon:<TbFileExport />,  text: "Pay salary", onClick:()=>handlePaySalary(item.staff.code)},      
                            {icon:<TbFileExport />,  text: "Add bonus pay", onClick:()=>(handleModalBonus(item.staff.code))},     
                            {icon:<TbFileExport />,  text: "Add deduction", onClick:()=>handleModalDeduction(item.staff.code) },     
                      
                      ]} 
                        style=" px-0 w-[300]"  />
                            </div>
                        </div>
    
    {/* MOBILE VIEW */}
    <td colSpan="4"  className='pt-[2rem] px-[2rem] md:hidden'>

      <div className="flex justify-between  flex-wrap  gap-y-[1rem]">
        <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Earned wages:</h5>
      <p className="flex flex-[0_0_50%] font-[600]  items-center"><span ><TbCurrencyNaira /></span>{selectedUser.earn_wages? selectedUser.earn_wages : 0}.00</p>

        <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Bonus earned:</h5>
        <p className="flex flex-[0_0_50%] font-[600]  items-center"><span ><TbCurrencyNaira /></span>{selectedUser.total_bonus? selectedUser.total_bonus : 0}.00</p>

        <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Deduction:</h5>
        <p className="flex flex-[0_0_50%] font-[600]  items-center"><span ><TbCurrencyNaira /></span>{selectedUser.total_deductions? selectedUser.total_deductions : 0}.00</p>
        <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Wages pulled:</h5>
        <p className="flex flex-[0_0_50%] font-[600]  items-center"><span ><TbCurrencyNaira /></span>{selectedUser.wage_pulled? selectedUser.wage_pulled : 0}.00</p>
   
      </div>
      <div className=" mt-[2rem] flex  flex-wrap gap-[1rem]">
          {/* <OutlineButton onClick={()=>handleActionType('delete', item.id)} text="Delete" icon={<RiDeleteBin6Line />} style="bg-[#FDEAEA] text-[#FE5E55] border-[#FE5E55] border-[1px]" /> */}
          <OutlineButton onClick={()=>handlePaySalary(item.staff.code)} text="Pay salary" icon={<TbFileExport />} />
          <OutlineButton onClick={()=>handleModalBonus(item.staff.code)} text="Add bonus pay" icon={<TbFileExport />}  />
          <OutlineButton onClick={()=>handleModalDeduction(item.staff.code)} text="Add deduction" icon={<TbFileExport />}  />
         
          {/* <OutlineButton type="external_link"  path='https://wagepull.com' text="Export as CSV" icon={<TbFileExport />} /> */}
          {/* <OutlineButton onClick={()=>handleActionType('deactivate', item.id)} text="Deactivate account" icon={<LiaUserAltSlashSolid />} /> */}
      </div>
      {/* <p>{selectedUser.name}</p>
      <p>{selectedUser.email}</p> */}
    
    </td>
  </tr>
  )}

</React.Fragment>
                 
                         )
                     })
                 }
                 </tbody>
             
         </table>
 
        
     </div>
     {/* <div className="px-[0.8rem] relative sm:px-[3rem] lg:px-[2rem]   flex  flex-col gap-y-[1rem] sm:flex-row sm:items-center sm:justify-between mt-[2rem] pr-[1.8rem] " > */}
     <div className=" relative     flex  flex-col gap-y-[1rem] sm:flex-row sm:items-center sm:justify-between mt-[2rem] " >
 
 
 
         <div className="flex  items-center w-full gap-x-[1rem]  sm:gap-x-[1rem]  sm:flex-row">
             <div className="rlative">
                <div className="">
                    <button onClick={()=>setBulkDelete(prev=>!prev)} className='flex border-[1px] rounded-[4px] py-[0.5rem] px-[0.8rem] w-fit items-center gap-x-[0.6rem] text-[0.85rem]'>
                    <span><TbFileExport /></span>
                            Pay Salary
                    <span><IoMdArrowDropdown /></span>                        
                    </button>
                </div>

               <div className={` ${bulkDelete? 'visible opacity-1': 'invisible opacity-0 '} z-[100] transition-opacity  duration-[0.5s] absolute bottom-[110%] rounded-[4px] left-[2.7%]    bg-[var(--grey-color)] w-fit  shadow-[2px_2px_1px_2px_rgba(0,0,0,1)]`}>
               <TableMenuList  items={[
                   {icon:<TbFileExport />, text: "Pay Salary", actionHandler:handleActionType , actionType:"delete"},   
                   {icon:<TbFileExport />, text: "Add Bonus", actionHandler:handleActionType , actionType:"delete"},   
                   {icon:<TbFileExport />, text: "Add Deduction", actionHandler:handleActionType , actionType:"delete"},   
                  // {icon:<TbFileExport />,  text: "Export as CSV", type:"external_link", path:`pay-salary` },       
    
                ]} 
                style=" px-[0.4rem] w-[250px] text-[0.85rem]"  />
               </div>

                
             </div>
             <div className="mb-[6px] sm:mt-[0px]">

             <InnerButton onClick={handleProceed}  text="Proceed" width="w-fit text-[0.85rem]"    />
             
             </div>
         </div>
         <div className="">
          <Pagination
                         currentPage={currentPage}
                         totalPages={totalPages}
                         onPageChange={handlePageChange}
                 />
         </div>
                
         </div>
     </div>
   
   )
}
