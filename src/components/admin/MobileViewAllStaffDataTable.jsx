// import React, { useState } from 'react'

// import Checkbox from '../shared/Checkbox';
// import RecentWageData from '../../utilities/admin/RecentWagePulledData';
// import { GoDotFill } from 'react-icons/go';
// import { IoMdArrowDropup,IoMdArrowDropdown } from "react-icons/io";
// import AllStaffs from '../../utilities/admin/AllStaffs';
// import arrayToObject from '../../utilities/arrayToObject';

// import { FiEdit2 } from "react-icons/fi";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { LiaUserAltSlashSolid } from "react-icons/lia";
// import Button from '../shared/Button';
// import Pagination from '../shared/Pagination';
// import OutlineButton from '../shared/OutlineButton';
// import { handleSelectAll, handleSingleCheckboxChange } from '../../utilities/admin/dataTableHandler';
// import Modals from '../shared/Modals';



// export default function MobileViewAllStaffDataTable() {
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [data, setData] = useState(AllStaffs);
//     const [selectAll, setSelectAll] = useState(false);
//     const [deleteRecord, setDeleteRecord] = useState(false)
//     const [deactivateRecord, setDeactivateRecord] = useState(false)


//     // MENU LIST CONFIGURATION
//     const handleRowClick = (userId) => {
//       if (selectedUser?.id === userId) {
//         setSelectedUser(null); // Hide details if the same row is clicked again
//       } else {
//         setSelectedUser(arrayToObject(AllStaffs.filter((item)=>item.id === userId)));
      
//       }
//     };
  
  
//     // PAGINATION CONFIGURATION
//     const itemsPerPage = 5;
//     let [currentPage, setCurrentPage] = useState(1);
  
//     const startIndex = (currentPage - 1) * itemsPerPage
//     const endIndex = startIndex + itemsPerPage
//     let paginatedData = data.slice(startIndex, endIndex)
//     const totalPages = Math.ceil(AllStaffs.length / itemsPerPage)
  
//     const handlePageChange = (page)=>{
//         setCurrentPage(page)
//     }
  

//     let handleProceed = ()=>{
//       console.log(data.filter(item=>item.isChecked === true))
//     }

//    const deleteSingleRecord = ()=>{
    
//    }



//     return(
//       <div className="block md:hidden staff_list mt-[1rem] pb-[1rem] data_tabl   no-scrollbar rounded-[4px] overflow-hidden  border-[0.4px]  scrollbar-hidden-x">
//          {/* DELETE MODAL */}
//         <Modals isOpens={deleteRecord} setIsopens={setDeleteRecord} title="Delete Staff">
//                         <div className="">
//                           <h6 className='font-[600] '>Are you sure you want to delete this staffs?</h6>
//                             <p className='text-[0.8rem]'>Once you delete this staffs, you will not be able to retrieve it.</p>
//                           </div>

//                           <div className="flex items-center gap-x-[2rem] mt-[1rem]">
//                           <Button onClick={deleteSingleRecord} text="Yes Proceed" width="w-fit" padding="py-[0.5rem] px-[1.7rem]" />
//                           <OutlineButton onClick={()=>setDeleteRecord(false)} text="Cancel"  />
//                           </div>
//         </Modals>
//          {/* DEACTIVATE MODAL */}
//         <Modals isOpens={deactivateRecord} setIsopens={setDeactivateRecord} title="Deactivate Staff">
//                  <div className="">
//                           <h6 className='font-[600] '>Are you sure you want to deactivate this staffs?</h6>
//                             <p className='text-[0.8rem]'>Once you deactivate this staffs, you can still reactivate staff.</p>
//                           </div>

//                           <div className="flex items-center gap-x-[2rem] mt-[1rem]">
//                           <Button text="Yes Proceed" width="w-fit" padding="py-[0.5rem] px-[1.7rem]" />
//                           <OutlineButton onClick={()=>setDeactivateRecord(false)}  text="Cancel"  />
//                           </div>
//         </Modals>


//               <table className='overflow-x-auto w-full border-collapse  text-left text-[0.85rem] '>
//                   <thead>
//                     <tr >
//                       <th ><Checkbox name="selectAll" onChange={(e)=>handleSelectAll(e,data,setSelectAll,setData)} /></th>
//                       <th>Name</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
  
  
//                   <tbody>
//                     {
//                       paginatedData.map((item)=>(
//                     <React.Fragment key={item.id}>
//                       <tr  className=' hover:bg-[var(--grey-color)]'>
//                       <td className='w-[4px] ' ><Checkbox id={item.id} checked={item.isChecked} onChange={()=>handleSingleCheckboxChange(item.id,data, setSelectAll,setData )} /></td>
//                       <td className='ml-0 pl-0' onClick={() => handleRowClick(item.id)} >
//                           <div className='flex items-center w-fit '>
//                             <div className=" overflow-hidden rounded-full flex justify-center items-center">
//                               <img src={item.image} className='w-full  object-cover block' alt="" />
//                             </div>
//                             <div className="leading-[1rem]">
//                               <h5 className='text-[0.85rem] font-[600]'>{item.name}</h5>
//                               <p className='text-[#374151] text-[0.625rem]'>{item.email}</p>
//                             </div>
                          
                         
//                           </div>
//                       </td>
//                       <td>
//                           <div className="flex items-center ">
//                             <span className={`${item.isActive ? 'text-[#16A34A]':'text-[var(--secondary-color)]'} flex items-center text-[0.85rem]`}><GoDotFill size={10} /> {item.isActive? 'Active': 'Inactive'}</span>
//                             <span ><IoMdArrowDropdown /></span>
//                           </div>
//                       </td>
                     
//                     </tr>
  
//                      {selectedUser?.id === item.id && (
                    
//                 <tr  className=' bg-[var(--grey-color)] hover:bg-[var(--grey-color)] '>
                 
//                   <td colSpan="3"  className='pt-[2rem] px-[2rem]'>
  
//                     <div className="flex justify-between  flex-wrap  gap-y-[1rem]">
//                       <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Position:</h5>
//                       <p className='flex-[0_0_50%] font-[600]'>{selectedUser.position}</p>
//                       <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Employee ID:</h5>
//                       <p className='flex-[0_0_50%] font-[600]'>{selectedUser.employerId}</p>
//                       <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Work Days:</h5>
//                       <p className='flex-[0_0_50%] font-[600]'>{selectedUser.workDays}</p>
//                       <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Basic Wages:</h5>
//                       <p className='flex-[0_0_50%] font-[600]'>{selectedUser.BasicWage}.00</p>
                 
//                     </div>
//                     <div className=" mt-[2rem] flex  flex-wrap gap-[1rem]">
//                         <OutlineButton type="Link" path={`${item.id}`} text="Edit profile" icon={<FiEdit2 />} />
//                         <OutlineButton onClick={()=>setDeleteRecord(true)} text="Delete" icon={<RiDeleteBin6Line />} style="bg-[#FDEAEA] text-[#FE5E55] border-[#FE5E55] border-[1px]" />
//                         <OutlineButton onClick={()=>setDeactivateRecord(true)} text="Deactivate account" icon={<LiaUserAltSlashSolid />} />
//                     </div>
//                     {/* <p>{selectedUser.name}</p>
//                     <p>{selectedUser.email}</p> */}
                  
//                   </td>
//                 </tr>
//                 )}
//                 </React.Fragment>
//                       ))}
                    
//                   </tbody>
  
               
                 
                 
//               </table>
  
//               <div className="px-[1rem]">
  
//               <div className="mt-[2rem] flex items-center gap-[1rem] ">
//                   <OutlineButton text={<span className='flex items-center'>Delete &nbsp; <span ><IoMdArrowDropdown /></span></span>} icon={<RiDeleteBin6Line />}  />
//                   <Button text="Proceed" onClick={handleProceed} width="w-fit" padding="py-[0.5rem] px-[1.7rem]" />
//                 </div>
  
//                   <div className="mt-[3rem]">
//                     <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
//                   </div>
  
//               </div>
             
        
//       </div>
//     )
// }
