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
import { TbCurrencyNaira, TbFileExport } from 'react-icons/tb'
import { IoAdd } from 'react-icons/io5'
import InnerButton from '../shared/InnerButton'

import { IoTrashOutline } from "react-icons/io5";
import { IoCardOutline } from "react-icons/io5";
import getRandomBackroundColor from '../../utilities/getRandomBackroundColor'
import { useDeleteEmployee } from '../../services/admin/mutation'


import {useQueryClient} from"@tanstack/react-query"
import { useAllResgisteredEmployees } from '../../services/admin/queries'
import { handleRowChange, handleSelectAll } from '../../utilities/checkedBoxDataTableHandler'



export default function StaffListDataTable({ addNewstaffHandler,handleExport }) {
  const [selectedUser, setSelectedUser] = useState(null);
    let [currentPage, setCurrentPage] = useState(1);
    // let [selectedRows, setSelectedRows] = useState([]);
    const [deleteRecord, setDeleteRecord] = useState(false)
    const [deactivateRecord, setDeactivateRecord] = useState(false)
     //For checbox
    const [bulkDelete, setBulkDelete] = useState(false)
    let itemsPerPage = 6;
    let {data:staffList, isLoading, error, isError } = useAllResgisteredEmployees()

   

    // const [data, setData] = useState(staffList.results.map(row => ({ ...row, checked: false })))
    const [data, setData] = useState(staffList.results)

    useEffect(()=>{
      const updatedItems = staffList.results.map(item => ({ ...item, checked: false }));
      setData(updatedItems)
    },[staffList.results])

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    // let paginatedData = staffList.results.map(item => ({ ...item, checked: false })).slice(startIndex, endIndex)
    let paginatedData = data.slice(startIndex, endIndex)
    const totalPages = Math.ceil(data.length / itemsPerPage)

    // console.log(paginatedData)
    // console.log(selectAll)

    let {staffId} = useParams()

    let handleProceed = ()=>{
      // console.log(selectedRows)
      console.log(data.filter(item=>item.isChecked === true))
    }
    const handlePageChange = (page)=>{
        setCurrentPage(page)
    }


   // MENU LIST CONFIGURATION
   const handleRowClick = (userCode) => {
    if (selectedUser?.code === userCode) {
      setSelectedUser(null); // Hide details if the same row is clicked again
    } else {
      setSelectedUser(arrayToObject(data.filter((item)=>item.code === userCode)));
    
    }
  };


  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["employeesData"] });
  
 
  let handleActionType = (actionType, id) =>{
    if(actionType === 'delete'){
      setDeleteRecord(true)
      setSelectedUser(id)
      // setSelectedUser(id)
      // console.log("delete", id)
    }
    if(actionType === 'deactivate'){
      setDeactivateRecord(true)
      setSelectedUser(id)
    }
  }

 
//  const deactivateSingleRecord = ()=>{
  
//  }
let {mutate:deleteMutation} = useDeleteEmployee()
// const {mutate} = useDeleteEmployee()
let handleDeleteUser =  ()=>{

    // let formData = new FormData()
    // formData.append("codes", [selectedUser])
    // deleteMutation({codes:[selectedUser]}, {
    deleteMutation(selectedUser, {
      onSuccess:(success)=>{
          console.log(success);
      },
      onError:(error)=>{
          console.log(error);
      }
    })


    // mutate([staffCode.code],{
    //   onSuccess:(res)=>{
    //     console.log(res)
    //   },
    //   onError:(err)=>{
    //       console.log(err)
    //   }
    // })
}


let handleDeactivateUser =  ()=>{

}

const [selectAll, setSelectAll] = useState(false);  
let [selectedUsers, setSelectedUsers] = useState([])







    return (
      <div className="pb-[5rem] ">
         {/* DELETE MODAL */}
         <Modals isOpens={deleteRecord} setIsopens={setDeleteRecord} title="Delete Staff">
                        <div className="">
                          <h6 className='font-[600] '>Are you sure you want to delete this staffs?</h6>
                            <p className='text-[0.8rem]'>Once you delete this staffs, you will not be able to retrieve it.</p>
                          </div>

                          <div className="flex items-center gap-x-[2rem] mt-[1rem]">
                          <Button onClick={handleDeleteUser} text="Yes Proceed" width="w-fit" padding="py-[0.5rem] px-[1.7rem]" />
                          {/* <OutlineButton onClick={()=>setDeleteRecord(false)} text="Cancel"  /> */}
                          </div>
        </Modals>
         {/* DEACTIVATE MODAL */}
        <Modals isOpens={deactivateRecord} setIsopens={setDeactivateRecord} title="Deactivate Staff">
                 <div className="">
                          <h6 className='font-[600] '>Are you sure you want to deactivate this staffs?</h6>
                            <p className='text-[0.8rem]'>Once you deactivate this staffs, you can still reactivate staff.</p>
                          </div>

                          <div className="flex items-center gap-x-[2rem] mt-[1rem]">
                          <Button onClick={handleDeactivateUser} text="Yes Proceed" width="w-fit" padding="py-[0.5rem] px-[1.7rem]" />
                          <OutlineButton onClick={()=>setDeactivateRecord(false)}  text="Cancel"  />
                          </div>
        </Modals> 
    
     {/* HEADER SECTION */}
     <div className="flex flex-wrap  items-center justify-between mb-[3rem]">
                    <p className='font-[600] '>All Staffs</p>
                    <div className="flex gap-x-[1rem] mt-[0.6rem] sm:mt-0">
                        <InnerButton onClick={addNewstaffHandler} text="Add new staff" width="w-fit text-[0.85rem]"  icon={<IoAdd />}  />
                        {/* <OutlineButton type="external_link" path="https://wagepull.com" text="Export All" style="text-[0.85rem]" icon={<TbFileExport size={20} />} /> */}
                        {/* <OutlineButton onClick = {handleExport} text="Export All" style="text-[0.85rem]" icon={<TbFileExport size={20} />} /> */}
                    </div>
        </div>
    
     {/* TABLEDATA */}
    
     <div className='data_table   no-scrollbar    overflow-x-auto scrollbar-hidden-x'>
                
                
                
                
                
                <table  className='rounded-md   text-left text-[0.85rem] border-[0.4px]' >
              <thead   >
                 <tr  >
                     <th className='z-[20]'><Checkbox checked={selectAll} name="selectAll" onChange={()=>handleSelectAll(selectAll, setSelectAll, staffList.results, setData,  setSelectedUsers)}  /></th>
                     <th className='z-[20]'>Name</th>
                     <th className='hidden md:table-cell z-[20]'>Position</th>
                     <th className='hidden md:table-cell z-[20]'>Employee ID</th>
                     <th className='hidden md:table-cell z-[20]'>Work Days</th>
                     <th className='hidden md:table-cell z-[20]'>Basic Wage</th>
                     <th className='z-[20]'>Status</th>
                    <th className='z-[20]'></th> 
                 </tr>
             </thead>
             <tbody>
                 {
                paginatedData.map((item,i)=>{
                  
                         return(
                      <React.Fragment key={item.code}>
                 <tr    className='relative z-[10]  hover:bg-[--grey-color] rounded-md hover:shadow-[2px_2px_1px_2px_rgba(0,0,0,1)] '>

                         <td ><Checkbox    name={item.code} checked={item.checked} onChange={(e)=>handleRowChange(item.code, data, setData, setSelectAll, setSelectedUsers)}   /></td>
                         <td className='flex  pl-0 ml-0 items-center gap-x-0 md:gap-x-[1rem] sm:min-w-[200px] min-w-fit'>
                           
                           {
                            item.avatar == ''?

                            <div className="">
                                  <p style={{backgroundColor:getRandomBackroundColor()}} className={` w-[40px] mr-[0.7rem] md:mr-0 h-[34px] flex justify-center items-center rounded-full text-white`}>
                                        
                                        {item.last_name.toUpperCase().charAt(0)}
                                            
                                       
                                        
                                        </p>
                            </div>
                            :
                            <div className="">
                              
                              <img src={item.avatar} alt="" />

                            </div>

                           } 
                             <div >
                             <h3 className='font-[700]'>{item.first_name + ' '+ item.last_name }</h3>
                             <p className='text-gray-400'>{item.email}</p>
                             </div>
                         
                         </td>
                         {/* <td >
                             <h3 className='font-[700]'>{item.name}</h3>
                             <p>{item.email}</p>
                         </td> */}
                         <td  className='hidden md:table-cell'>{item?.position}</td>
                         <td  className='hidden md:table-cell'>{item?.code}</td>
                         <td className='hidden md:table-cell font-[600]'>{item?.work_days_in_month}</td>
                         <td className='hidden md:table-cell font-[600]'>
                       
                          <p className='flex items-center font-[600]'>
                            <span><TbCurrencyNaira /></span>
                            {item?.salary_amount? item?.salary_amount : 0}
                            .00
                            </p>
                          
                          </td>
                         
                         <td className=''>
                          
                             {
                                 item.status == 'active'? 
                                 <span className='text-green-600 flex  items-center'><span><GoDotFill size={10} /></span> { item.status.charAt(0).toUpperCase()+item.status.slice(1)}</span>:
                                 <span  className='text-red-600 flex  items-center'><span><GoDotFill size={10} /></span>{ item.status.charAt(0).toUpperCase()+item.status.slice(1)}</span>
                             }
                             
                             
                            </td>
 
                         
                          <td className='relative ' >

                            
                              {/* DESKTOP */}
                              <div className="table_row hidden md:block">
                                
                              <span onClick={() => handleRowClick(item.code)} className='cursor-pointer '><BiDotsVerticalRounded /></span>
                             
                              </div>

                               {/* MOBILE */}
                              <div className="block md:hidden">
                              <span onClick={() => handleRowClick(item.code)} className=' text-gray-600'><IoMdArrowDropdown /></span>
                              </div>
                           
             
                          
                            
                          </td>
                              
                        
                           
                 </tr>
{selectedUser?.code === item.code && (
                    
      <div className="border-2 h-[200px] w-[200px] absolute">

      </div>
  
  )}

</React.Fragment>
                 
                         )
                     })
                 }
                 </tbody>
             
         </table>
 
        
     </div>
     <div className="px-[0.8rem] relative sm:px-[3rem] lg:px-[2rem]   flex  flex-col gap-y-[1rem] sm:flex-row sm:items-center sm:justify-between mt-[4rem] pr-[1.8rem] " >
 
 
 
         <div className="flex  items-center w-full gap-x-[1rem]  sm:gap-x-[1rem]  sm:flex-row">
             <div className="rlative">
                <div className="">
                    <button onClick={()=>setBulkDelete(prev=>!prev)} className='flex border-[1px] rounded-[4px] py-[0.5rem] px-[0.8rem] w-fit items-center gap-x-[0.6rem] text-[0.85rem]'>
                    <span><LiaTrashAlt size={18} /></span>
                            Delete
                    <span><IoMdArrowDropdown /></span>                        
                    </button>
                </div>

               <div className={` ${bulkDelete? 'visible opacity-1': 'invisible opacity-0 '} z-[100] transition-opacity  duration-[0.5s] absolute bottom-[110%] rounded-[4px] left-[2.7%]    bg-[var(--grey-color)] w-fit  shadow-[2px_2px_1px_2px_rgba(0,0,0,1)]`}>
               <TableMenuList  items={[
                  {icon:<CiUser size={15} />, text: "Activate staffs"},     
                  {icon:<LiaUserAltSlashSolid size={15} />, text: "Deactivate staffs", type:"", actionType:"deactivate"},      
                  // {icon:<IoCardOutline size={15} />, text: "Activate Cards", type:"", actionType:"deactivate"},      
                  {icon:<IoTrashOutline size={15} />, text: "Delete staffs", type:"", actionType:"deactivate"},      
                  // {icon:<TbFileExport size={15}  />, text: "Export data as CSV" , type:"external_link", path:"https://wagepull.com", target:'_blank', actionType:"delete"}      
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
