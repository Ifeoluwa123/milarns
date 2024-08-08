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
// import { deactivateSingleUser, deleteSingleUser } from '../../services/staffListPages'
import { TbCurrencyNaira, TbFileExport } from 'react-icons/tb'
import { IoAdd } from 'react-icons/io5'
import InnerButton from '../shared/InnerButton'

import { IoTrashOutline } from "react-icons/io5";
import { IoCardOutline } from "react-icons/io5";





export default function PayrollDataTableAction({data,setData,type,buttonText,setIsOpen, itemsPerPage,addNewstaffHandler }) {

  
  const getUnpaidStaffs = () => {
    return data.filter(staff => staff.status === "unpaid");
  };
  const [selectedUser, setSelectedUser] = useState(null);
    let [currentPage, setCurrentPage] = useState(1);
    let [selectedRows, setSelectedRows] = useState([]);
    const [deleteRecord, setDeleteRecord] = useState(false)
    const [deactivateRecord, setDeactivateRecord] = useState(false)
    const [selectAll, setSelectAll] = useState(false); //For checbox
    const [bulkDelete, setBulkDelete] = useState(false)

   
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    let paginatedData = getUnpaidStaffs().slice(startIndex, endIndex)
    const totalPages = Math.ceil(getUnpaidStaffs().length / itemsPerPage)
 


    // let {staffId} = useParams()

    let handleProceed = ()=>{
      // console.log(selectedRows)
      setIsOpen(true)
      // console.log(data.filter(item=>item.isChecked === true))
    }
    const handlePageChange = (page)=>{
        setCurrentPage(page)
    }


   // MENU LIST CONFIGURATION
   const handleRowClick = (userId) => {
    if (selectedUser?.id === userId) {
      setSelectedUser(null); // Hide details if the same row is clicked again
    } else {
      setSelectedUser(arrayToObject(data.filter((item)=>item.id === userId)));
    
    }
  };



  
  let handleActionType = (actionType, id) =>{
    if(actionType === 'delete'){
      setDeleteRecord(true)
      setSelectedUser(id)
      // console.log("delete", id)
    }
    if(actionType === 'deactivate'){
      setDeactivateRecord(true)
      setSelectedUser(id)
    }
  }

 
//  const deactivateSingleRecord = ()=>{
  
//  }

   
  return (
    <div className='mt-[2rem]'>

        <div className="data_table   no-scrollbar    overflow-x-auto scrollbar-hidden-x">
        {/* PayrollDataTableAction */}
        <table  className='rounded-md text-left text-[0.85rem] border-[0.4px]' >
              <thead   >
                 <tr  >
                     {/* <th className='z-[20]'><Checkbox name="selectAll" onChange={(e)=>handleSelectAll(e,data,setSelectAll,setData)} /></th> */}
                     <th className='z-[20]'>Name</th>

                     {
                        type=="type-1"&&
                        <>
                    <th className=' z-[20]'>Wage pulled</th>
                     <th className=' z-[20]'>Net salary</th>
                        </>
                        }
                        {
                       type=="type-2"&&
                        <th className=' z-[20]'>Position</th>
                     }
                   
                     <th className=' z-[20]'>Status</th>
                     <th className='z-[20]'></th>
                 </tr>
             </thead>

             <tbody className='bg-white '>
             {
                paginatedData.map((item,i)=>{
                         return(
                      <React.Fragment key={i}>
                 <tr    className='relative z-[10]  hover:bg-[--grey-color] rounded-md hover:shadow-[0px_2px_1px_0px_rgba(0,0,0,1)] '>

                         <td className=''>
                         {item.staff.first_name+" "+item.staff.last_name}
                            
                         
                         </td>

                         {
                            type=="type-1"&&
                            <>
                              <td  className=' md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.wage_pulled? item.wage_pulled : 0}.00</p></td>
                         <td className='table-cell'>
                         <p className="  flex  items-center"><span ><TbCurrencyNaira /></span>{item.net_wages? item.net_wages : 0}.00</p>
                         </td>
                            </>
                         }
                         {
                            type=="type-2"&&
                            <td  className=' md:table-cell'>{item.staff.position}</td>
                         }
                        
                       

                         <td className=' md:table-cell'>
                             {
                                 item.status === "paid"? 
                                 <span className='  text-green-600 flex  items-center'><span><GoDotFill size={10} /></span> Paid</span>:
                                 <span  className=' text-red-600 flex  items-center'><span><GoDotFill size={10} /></span>Unpaid</span>
                             }
                             
                             
                            </td>
                         
                        <td ><Checkbox id={item.id} checked={item.isChecked} onChange={()=>handleSingleCheckboxChange(item.id, data, setSelectAll,setData )} /></td>   
                 </tr>


        </React.Fragment>
                 
                         )
                     })
                 }
                 </tbody>

        </table>
     </div>
        <div className="mt-[2rem]">
          <Pagination
                         currentPage={currentPage}
                         totalPages={totalPages}
                         onPageChange={handlePageChange}
                 />
         </div>

         <div className="mt-[2rem]  flex items-center justify-between sm:max-w-[60%] gap-x-[1rem]">
                    {
                        setIsOpen &&  <InnerButton onClick={handleProceed}  text={buttonText} width="w-fit text-[0.85rem]"    />
                    }
           
            {
            type=="type-1"&&
                        <button className="border-[2px] hover:bg-[var(--secondary-color)] hover:text-white transition-all duration-[0.3s]  basis-[0_0_80%]  text-[0.85rem] py-[0.45rem] px-[1rem] rounded-[4px]">
                            Record as cash
                        </button>
             }

        </div>
    </div>
  )
}
