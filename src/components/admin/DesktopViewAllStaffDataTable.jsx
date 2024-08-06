// import React, { useEffect, useState } from 'react'
// import Checkbox from '../shared/Checkbox'
// import AllStaffs from '../../utilities/admin/AllStaffs'
// import {BiDotsVerticalRounded} from 'react-icons/bi'
// import {GoDotFill} from 'react-icons/go'
// import Pagination from '../shared/Pagination'
// import OutlineButton from '../shared/OutlineButton'
// import Button from '../shared/Button'
// import { IoMdArrowDropdown } from 'react-icons/io'
// import { RiDeleteBin6Line } from 'react-icons/ri'
// import TableMenuList from '../shared/TableMenuList'
// import { LiaTrashAlt } from 'react-icons/lia'
// import { Link } from 'react-router-dom'

// export default function TableLayout() {
//     const itemsPerPage = 8;
//     let [currentPage, setCurrentPage] = useState(1);
//     let [selectedRows, setSelectedRows] = useState([]);

//     const startIndex = (currentPage - 1) * itemsPerPage
//     const endIndex = startIndex + itemsPerPage
//     let paginatedData = AllStaffs.slice(startIndex, endIndex)
//     const totalPages = Math.ceil(AllStaffs.length / itemsPerPage)




//     let handleProceed = ()=>{
//       console.log(data.filter(item=>item.isChecked === true))
//     }
//     const handlePageChange = (page)=>{
//         setCurrentPage(page)
//     }


// console.log(selectedRows)

//   useEffect(()=>{
//       let tableRows = document.querySelectorAll('.table_row')
//       let tableMenu = document.querySelector('.table_menu')
//       tableRows.forEach((tableRow)=>{
      
//           tableRow.addEventListener('click',(e)=>{
//               tableRows.forEach((tableRow)=>{
//                   if(tableRow.nextSibling.classList.contains('block')){
//                          tableRow.nextSibling.classList.add('hidden')

//                   }

              
//               })
//               // if(tableRow.nextSibling.classList.contains('hidden')){
//               //     tableRow.nextSibling.classList.replace('hidden', 'block')
//               // }
//               // if(tableRow.nextSibling.classList.contains('block')){
//               //     tableRow.nextSibling.classList.replace('block', 'hidden')
//               // }
              
//               // console.log(tableRow.nextSibling)
//               // tableRows.forEach((tableRow)=>{
//               //    tableRow.nextSibling.classList.add('hidden')
//               // })
//               if(tableRow.nextSibling.classList.contains('block')){
                  
//                   return tableRow.nextSibling.classList.replace('block', 'hidden')
//               }
//               if(tableRow.nextSibling.classList.contains('hidden')){
//                   tableRow.nextSibling.classList.replace('hidden', 'block')
//               }else{
//                   tableRow.nextSibling.classList.add('hidden')
//               }
//               // tableMenu.classList.toggle('')
//           })
//       })
//   })

//     return (
//       <div className="pb-[5rem] hidden md:block">
//      <div className='data_table   no-scrollbar   overflow-x-auto scrollbar-hidden-x'>
//                 <table  className='rounded-md text-left text-[0.85rem] border-[0.4px]' >
//               <thead >
//                  <tr >
//                      <th><Checkbox onChange={(e)=>handleCheckAllBoxesChange(e, selectedRows,setSelectedRows)}  name="all" /></th>
//                      <th >Name</th>
//                      <th>Position</th>
//                      <th>Employee ID</th>
//                      <th>Work Days</th>
//                      <th>Basic Wage</th>
//                      <th>Status</th>
//                      <th></th>
//                  </tr>
//              </thead>
//              <tbody >
//                  {
//                      paginatedData.map((item,i)=>{
//                          return(
//                  <tr key={i} className='relative  hover:bg-[--grey-color] rounded-md hover:shadow-[2px_2px_1px_2px_rgba(0,0,0,1)] '>
//                          <td ><Checkbox id={item.email} value={item.name} 
//                          // checked = {selectedRows.has(item.email)} 
//                          onChange={(e)=>handleCheckBoxChange(e,item.email, selectedRows, setSelectedRows)}  name="cheeck box-2" /></td>
//                          <td className='flex items-center gap-x-[1rem]'>
//                              <img src={item.image} alt="" />
//                              <div >
//                              <h3 className='font-[700]'>{item.name}</h3>
//                              <p className='text-gray-400'>{item.email}</p>
//                              </div>
                         
//                          </td>
//                          {/* <td >
//                              <h3 className='font-[700]'>{item.name}</h3>
//                              <p>{item.email}</p>
//                          </td> */}
//                          <td >{item.position}</td>
//                          <td >{item.employerId}</td>
//                          <td>{item.workDays}</td>
//                          <td>{item.BasicWage}</td>
                         
//                          <td className=''>
//                              {
//                                  item.isActive? 
//                                  <span className='text-green-600 flex  items-center'><span><GoDotFill size={10} /></span> Active</span>:
//                                  <span  className='text-red-600 flex  items-center'><span><GoDotFill size={10} /></span>Inactive</span>
//                              }
                             
                             
//                             </td>
//                             <td className='relative ' >
//                              <span className='cursor-pointer table_row block'><BiDotsVerticalRounded /></span>
                             
                         
//                              <div  className="table_menu   z-[100] rounded-md overflow-hidden absolute  md:right-[20%] bg-[var(--grey-color)]  w-fit hidden">
//                                 <TableMenuList  />
//                              </div>
//                          </td>
//                  </tr>
//                          )
//                      })
//                  }
//                  </tbody>
             
//          </table>
 
        
//      </div>
//      <div className="px-[0.8rem] sm:px-[3rem] lg:px-[2rem]   flex  flex-col gap-y-[1rem] sm:flex-row sm:items-center sm:justify-between mt-[4rem] pr-[1.8rem] " >
 
 
 
//          <div className="flex items-center w-full gap-x-[1rem]  sm:gap-x-[1rem]  sm:flex-row">
//              <div className="">
//                  <button className='flex border-[1px] py-[0.5rem] px-[0.8rem] w-fit items-center gap-x-[0.6rem] text-[0.85rem]'>
//                  <span><LiaTrashAlt size={18} /></span>
//                          Delete
//                  <span><IoMdArrowDropdown /></span>                        
//                  </button>
//              </div>
//              <div className="mb-[6px] sm:mt-[0px]">
//              <Link className=' shadow-[1.8px_1.8px_1px_2px_rgba(0,0,0,1)] rounded-[3px] text-white py-[0.5rem] px-[0.8rem] bg-[var(--secondary-color)] items-center gap-x-[0.6rem] text-[0.85rem]'>
                 
//                          Proceed
                                      
//                  </Link>
//              </div>
//          </div>
//          <div className="">
//           <Pagination
//                          currentPage={currentPage}
//                          totalPages={totalPages}
//                          onPageChange={handlePageChange}
//                  />
//          </div>
                
//          </div>
//      </div>
   
//    )
// }
