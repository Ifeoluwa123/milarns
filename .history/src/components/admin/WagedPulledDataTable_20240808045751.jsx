import React, { useEffect, useState } from 'react'
import Checkbox from '../shared/Checkbox'

import {BiDotsVerticalRounded} from 'react-icons/bi'
import {GoDotFill} from 'react-icons/go'
import Pagination from '../shared/Pagination'
import OutlineButton from '../shared/OutlineButton'
import Button from '../shared/Button'
import { IoMdArrowDropdown } from 'react-icons/io'
import { RiDeleteBin6Line, RiErrorWarningLine } from 'react-icons/ri' 
import TableMenuList from '../shared/TableMenuList'
import { LiaTrashAlt, LiaUserAltSlashSolid } from 'react-icons/lia'
import { Link, useParams } from 'react-router-dom'
import arrayToObject from '../../utilities/arrayToObject'
import { FiEdit2 } from 'react-icons/fi'

import { CiUser } from 'react-icons/ci'
// import { deactivateSingleUser, deleteSingleUser } from '../../services/staffListPages'
import { TbFileExport } from 'react-icons/tb'
import { IoAdd } from 'react-icons/io5' 
import InnerButton from '../shared/InnerButton'

import { IoTrashOutline } from "react-icons/io5";
import { IoCardOutline } from "react-icons/io5";
import {TbCurrencyNaira} from 'react-icons/tb'

import { Datepicker } from "flowbite-react";
import getCurrentMonthAndYear from '../../utilities/getCurrentMonthAndYear'
import getRandomBackroundColor from '../../utilities/getRandomBackroundColor'
import formatDate2 from '../../utilities/formatDate2'
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter'
import Modals from '../shared/Modals'
import { useComputeStaffWagePulled } from '../../services/admin/mutation'
import NoRecordFound from '../shared/NoRecordFound'


  

export default function WagedPulledDataTable({data,setMonthAndYear,handleDateChange,monthAndYear, itemsPerPage,addNewstaffHandler }) {
  const [selectedUser, setSelectedUser] = useState(null);
    let [currentPage, setCurrentPage] = useState(1);
    let [selectedRows, setSelectedRows] = useState([]);
    const [deleteRecord, setDeleteRecord] = useState(false)
    const [deactivateRecord, setDeactivateRecord] = useState(false)
    const [selectAll, setSelectAll] = useState(false); //For checbox
    const [bulkDelete, setBulkDelete] = useState(false)


    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    let paginatedData = data.slice(startIndex, endIndex)
    const totalPages = Math.ceil(data.length / itemsPerPage)

    const [isOpen, setIsOpen] = useState(false)

    // let {staffId} = useParams()

    let handleProceed = ()=>{
      // console.log(selectedRows)
      console.log(data.filter(item=>item.isChecked === true))
    }
    const handlePageChange = (page)=>{
        setCurrentPage(page)
    }

    let {mutate:computeMutation, isPending:isComputationLoading} = useComputeStaffWagePulled()
   // MENU LIST CONFIGURATION
   const handleRowClick = (userId) => {
    setIsOpen(true)
              console.log(data)
          monthAndYear.codes = [userId.code]
          monthAndYear.staff_codes = [userId.staff.code]
          // console.log(monthAndYear)

          computeMutation(monthAndYear,{
              onSuccess:(success)=>{
                  console.log(success)
              },
              onError:(error)=>{
                console.log(error)
              }
          })
          // if (selectedUser?.id === userId) {

            
          //   setSelectedUser(null);
          // } else {
          //   setSelectedUser(arrayToObject(data.filter((item)=>item.id === userId)));
          
          // }
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
 


 

// let [monthAndYear, setMonthAndYear] = useState(getCurrentMonthAndYear())



// console.log(monthAndYear)





    return (


      <>
              
        {/* MODAL START */} 
     <Modals setIsopens={setIsOpen} isOpens={isOpen} title="Repay Wage">


      {
        isComputationLoading? "Loading...":
        <>

 
<div className="p-[1rem] border-[1px] rounded-[4px] my-[2rem] overflow-hidden">
        {/* <NoRecordFound
      title="You don't have enough money to perform this transaction"
      label="Fund your account"
      // component={<InnerButton text="Add new staff"  icon={<IoAdd />} onClick={addNewstaffHandler} />}
      // component={<InnerButton text="Add new staff"  icon={<IoAdd />} onClick={addNewstaffHandler} />}
    
    /> */}

      </div>
          <div className=" bg-[var(--primary-color)] text-white rounded-[4px] flex flex-col items-center py-[1rem]">
            <h2 className='font-[700]  flex items-center justify-center text-[1.8rem]'><span className="text-[2.2rem]"><TbCurrencyNaira /></span>700,000.00</h2>
            <p className="text-[0.88rem]">Wages pulled from 01 Sep to 18 Sep</p>
      </div>

      <div className="py-[1rem] px-[1rem] bg-[#F5F5F5] text-black rounded-[4px] ">
          <p className='flex items-start justify-between gap-x-[0.7rem]'>
            <span className="text-[var(--secondary-color)] block text-[1.2rem] justify-between"><RiErrorWarningLine /></span>
            <span className=' block text-[0.85rem]'>
            Note! Total wage pulled include salaries taken in-advance by 24 staffs from 01 Sep to 18 Sep, 2023.
            </span>
          </p>

          <h5 className='mt-[1.6rem]'>
            <p className='flex text-[0.85rem] mb-[1rem]'><span className="max-w-[180px] block w-full text-[#6B7280]">Total wages pulled:</span> <span className="flex items-center font-[600]"><TbCurrencyNaira /> 700,000</span> <span className="font-[600]">.00</span></p>

          </h5>
      </div>

      <div className="py-[1rem] px-[1rem] bg-[#FDEAEA] text-black rounded-[4px]">
        <p className='font-[600] text-[0.85rem]'>Not enough fund in your wallet</p>
        <p className=" text-[0.85rem] mt-[0.6rem]">
        Topup current balance of <span className='font-[600]'>₦40,000.00</span>   in your wallet before you make payment. &nbsp;
        <a href="#"  className="text-[var(--secondary-color)] underline">Topup wallet fund</a> 
        </p>
      </div>


      <div className="">
        <InnerButton text="Make payment now" width="flex justify-center w-full" />
      </div>
        </>

      }
    

      

    </Modals>
    {/* MODAL ENDS */}



      


    <div className="pb-[5rem] ">
  
    
  {/* HEADER SECTION */}
  <div className="flex flex-wrap  items-center justify-between mb-[2rem] ">

                 <div className="flex items-center">
                 <p className='font-[600] mr-[1rem]'>Wage pulled history</p>

                 <div className="">
                   <Datepicker onSelectedDateChanged={handleDateChange}    />
                 </div>
                 </div>
               
                 {/* <div className="flex gap-x-[1rem] mt-[0.6rem] sm:mt-0">

                     <OutlineButton type="external_link" path="https://wagepull.com" text="Export All" style="text-[0.85rem]" icon={<TbFileExport size={20} />} />
                 </div> */}
     </div>
 
  {/* TABLEDATA */}
 
  <div className='data_table   no-scrollbar    overflow-x-auto scrollbar-hidden-x'>
             
             
             
             
             
             <table  className='rounded-md   text-left text-[0.85rem] border-[0.4px]' >
           <thead   >
              <tr  >
                 
                  <th className='z-[20]'>Staff</th>
                  <th className='hidden md:table-cell z-[20]'>Wage pulled</th>
                  <th className='hidden md:table-cell z-[20]'>Fee</th>
                  <th className='hidden md:table-cell z-[20]'>Amount received</th>
                  <th className=' z-[20]'>Account recieved</th>
                  <th className='hidden md:table-cell z-[20]'>Status</th>
                  <th className='z-[20]'></th>
              </tr>
          </thead>
          <tbody>
               {
                 paginatedData.map((item, index)=>
               <tr key={index} className='relative z-[10]  hover:bg-[--grey-color] rounded-md hover:shadow-[2px_2px_1px_2px_rgba(0,0,0,1)] '>
           <td className='flex  pl-[1rem] ml-0 items-center gap-x-0 md:gap-x-[1rem] sm:min-w-[200px] min-w-fit'>
    
 
                       {
                               item.staff.avatar == ''?
                       
                               <div className="">
                                     <p style={{backgroundColor:getRandomBackroundColor()}} className={` w-[40px] mr-[0.7rem] md:mr-0 h-[34px] flex justify-center items-center rounded-full text-white`}>
                                           
                                           {item.staff.last_name.toUpperCase().charAt(0)}
                                               
                                           
                                           
                                           </p>
                               </div>
                               :
                               <div className="hidden sm:inline">
                                 
                                 <img src={item.staff.avatar} alt="" />
                       
                               </div>
                       
                               } 
                       
                           <div >
                                 <h3 className='font-[700]'>{item.staff.first_name + ' '+ item.staff.last_name }</h3>
                                 <p className='text-gray-400'>{item.staff.email}</p>
                           </div>
                       
                               {/* <div className="">
                                     <p className={` w-[40px] mr-[0.7rem] md:mr-0 h-[34px] flex justify-center items-center rounded-full text-white`}>
                                           
                                       Name
                                               
                                         
                                           
                                           </p>
                               </div>
                             
                               <div >
                               <h3 className='font-[700]'>Name3</h3>
                               <p className='text-gray-400'>EMail</p>
                               </div> */}
                           
                       </td>




                       <td className='hidden md:table-cell font-[600]'>

                         <p className='flex items-center font-[600]'>
                           <span className='text-[1.3rem]'><TbCurrencyNaira /></span>
                           {item.amount}.00
                           {/* {item?.salary_amount? item?.salary_amount : 0}
                           .00 */}

                           
                           </p>
                         
                         </td>

                         <td  className='hidden md:table-cell '><p className="flex items-center font-[600]"><span className='text-[1.3rem]'><TbCurrencyNaira /></span>{item.fee?item.fee:0}.00</p></td>

                         <td  className='hidden md:table-cell '><p className="flex items-center font-[600]"><span className='text-[1.3rem]'><TbCurrencyNaira /></span>{item.amount_received?item.amount_received:0}.00</p></td>
              
                         <td  className='hidden md:table-cell'>
                           <div >
                           {
                           item.status === "pending" && <span  className=' text-red-600 flex  items-center'><span><GoDotFill size={10} /></span>{capitalizeFirstLetter( item.status)}</span>
                         }
                         {
                           item.status === "success" &&  <span className='  text-green-600 flex  items-center'><span><GoDotFill size={10} /></span> {capitalizeFirstLetter( item.status)}</span>
                         }
                                 <p className='text-gray-400'>{formatDate2(item.created_at)} </p>
                           </div>
                         </td>
                         {/* <td  className='hidden md:table-cell'>{formatDate2(item.created_at) }</td> */}
                         <td  className='hidden md:table-cell'>{item.is_repaid? <div className='flex items-center'><span className='text-[#A259FF]'><GoDotFill size={10} /></span>Repaid</div>: <div className='flex items-center'><span className='text-[#A259FF]'><GoDotFill size={10} /></span>Unrepaid</div>}</td>
                        
              
  <td className='relative ' >
      <span onClick={()=>handleRowClick(item)}  className='cursor-pointer table_row hidden md:block'><BiDotsVerticalRounded /></span>
      <span onClick={()=>handleRowClick(item)}   className='block md:hidden text-gray-600'><IoMdArrowDropdown /></span>
  
 
  </td>
              
               </tr>
               )
               }

          </tbody>
              
          
      </table>

     
  </div>
  {/* <div className="px-[0.8rem] relative sm:px-[3rem] lg:px-[2rem]   flex  flex-col gap-y-[1rem] sm:flex-row sm:items-center sm:justify-between mt-[4rem] pr-[1.8rem] " > */}



      
      <div className="px-[0.8rem] sm:px-[3rem] lg:px-[2rem] mt-[2rem]">
       <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
              />
      </div>
             
      
  </div>

      </>
    
   )
}
