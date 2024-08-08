import React, { useEffect, useState } from 'react'
import InnerButton from '../../components/shared/InnerButton'
import PayrollDataTableAction from '../../components/admin/PayrollDataTableAction'
import { payrolldata } from '../../utilities/admin/Data'

import Modals from '../../components/shared/Modals'
import { TbCurrencyNaira } from 'react-icons/tb'
import { RiErrorWarningLine } from "react-icons/ri";
import ModalPayrollSalary from '../../components/shared/ModalPayrollSalary'
import { GoDotFill } from 'react-icons/go'
import Checkbox from '../../components/shared/Checkbox'
import Pagination from '../../components/shared/Pagination'
import Button from '../../components/shared/Button'
import { handleRowChange, handleSelectAll } from '../../utilities/checkedBoxDataTableHandler'

export default function PayrollSalary() {
  const [isOpen, setIsOpen] = useState(false)
  
  let [data, setData] = useState(JSON.parse(localStorage.getItem('payment'))?.results || [])
  let [currentPage, setCurrentPage] = useState(1);
  // const getUnpaidStaffs = () => {
  //   return data.filter(staff => staff.status === "unpaid");
  // };

  const unpaidStaff = data.filter(staff => staff.status === "unpaid");
  
  useEffect(()=>{
    const updatedItems = unpaidStaff.map(item => ({ ...item, checked: false }));
    setData(updatedItems)
  },[])
 
  const itemsPerPage =6;
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  let paginatedData = unpaidStaff.slice(startIndex, endIndex)
  const totalPages = Math.ceil(unpaidStaff.length / itemsPerPage)

  const handlePageChange = (page)=>{
    setCurrentPage(page)
}


  let [selectAll, setSelectAll] = useState(false)
  let [selectUsers, setSelectedUsers] = useState([])




  
  return (
    <> 
 
    {/* <ModalPayrollSalary isOpen={isOpen} setIsOpen ={setIsOpen} /> */}
    
    <div className=' max-w-[46rem] w-[100%] md:py-[2rem] md:pl-[3rem] '>
      {/* <div className="bg-[#F5F5F5]  border-[1px]  w-[46rem] px-[1rem] py-[2rem] rounded-[4px]"> */}
      <div className="bg-[#F5F5F5]   px-[2rem] py-[2rem] rounded-[4px]">
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center">
            <p className='font-[600] text-[0.85rem]'>Select staffs you want to pay salary to</p>
            <InnerButton onClick={()=>handleSelectAll(selectAll, setSelectAll, data, setData,  setSelectedUsers)} text="Select all staffs" width='w-fit text-[0.85rem]' />
        </div>

        {/* PAYROLL DATA TABLE ACTION  */}
        <div className='mt-[2rem]'>

        <div className="data_table   no-scrollbar    overflow-x-auto scrollbar-hidden-x">
        {/* PayrollDataTableAction */}
        <table  className='rounded-md text-left text-[0.85rem] border-[0.4px]' >
        <thead   >
                 <tr  >
                     {/* <th className='z-[20]'><Checkbox name="selectAll" onChange={(e)=>handleSelectAll(e,data,setSelectAll,setData)} /></th> */}
                     <th className='z-[20]'>Name</th>

                   
                     <th className=' z-[20]'>Wage pulled</th>
                     <th className=' z-[20]'>Net salary</th>
                   
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

                        <td  className=' md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.wage_pulled? item.wage_pulled : 0}.00</p></td>
                         <td className='table-cell'>
                         <p className="  flex  items-center"><span ><TbCurrencyNaira /></span>{item.net_wages? item.net_wages : 0}.00</p>
                         </td>
                        
                      
                        
                       

                         <td className=' md:table-cell'>
                             {
                                 item.status === "paid"? 
                                 <span className='  text-green-600 flex  items-center'><span><GoDotFill size={10} /></span> Paid</span>:
                                 <span  className=' text-red-600 flex  items-center'><span><GoDotFill size={10} /></span>Unpaid</span>
                             }
                             
                             
                            </td>
                         
                        {/* <td ><Checkbox id={item.id} checked={item.isChecked} onChange={()=>handleSingleCheckboxChange(item.id, data, setSelectAll,setData )} /></td>    */}
                        <td ><Checkbox id={item.id} name={item.staff.code} checked={item.checked}  onChange={(e)=>handleRowChange(item.staff.code, data, setData, setSelectAll, setSelectedUsers)}  /></td>   
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
                    {/* <InnerButton    text= "Proceed to make payment" width={` w-fit text-[0.85rem] ${!true? "bg-grey-500 text-black cursor-not-allowed" : "bg-[var(--secondary-color)] text-white"} `}    /> */}
                    
                    <Button  bgColor={true? "bg-grey-500 text-black cursor-not-allowed" : "bg-[var(--secondary-color)] text-white" }  text={"Proceed to make payment"} padding="py-[0.6rem]" />
                    {/* <Button onClick={handleAddBonus} disabled={payload.amount == '' || payload.medium == '' } bgColor={payload.amount == '' || payload.medium == ''? "bg-grey-500 text-black cursor-not-allowed" : "bg-[var(--secondary-color)] text-white" }  text={isPending? "Loading...": "Record bonus now"} padding="py-[0.6rem]" /> */}
   
                     

        </div>
        </div>
        {/* <PayrollDataTableAction buttonText="Proceed to make payment" setIsOpen={setIsOpen} data={data} type="type-1" itemsPerPage={6} /> */}
        

      </div>

    </div>
    </>
  
  )
}
