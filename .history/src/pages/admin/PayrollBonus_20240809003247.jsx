import React, { useEffect, useState } from 'react'
import InnerButton from '../../components/shared/InnerButton'
import PayrollDataTableAction from '../../components/admin/PayrollDataTableAction'
import { payrolldata } from '../../utilities/admin/Data'

import Modals from '../../components/shared/Modals'
import { TbCurrencyNaira } from 'react-icons/tb'
import { RiErrorWarningLine } from 'react-icons/ri'
import SelectField from '../../components/shared/SelectField'
import getCurrentMonthAndYear from '../../utilities/getCurrentMonthAndYear'
import { GoDotFill } from 'react-icons/go'
import Checkbox from '../../components/shared/Checkbox'
import Pagination from '../../components/shared/Pagination'
import Button from '../../components/shared/Button'
import { handlePayrollSelectAll } from '../../utilities/checkedBoxDataTableHandler'

export default function PayrollBonus() {
  const [isOpen, setIsOpen] = useState(false)
  
  let [data, setData] = useState(JSON.parse(localStorage.getItem('payment'))?.results || [])
  let [currentPage, setCurrentPage] = useState(1);
  // const getUnpaidStaffs = () => {
  //   return data.filter(staff => staff.status === "unpaid");
  // };

  const unpaidStaff = data.filter(staff => staff.status === "unpaid");
  
  useEffect(()=>{
    const updatedItems = unpaidStaff.map(item => {
      return {
        ...item,
        staff: {
          ...item.staff,
          checked: false, 
        }
      };
    });
    setData(updatedItems)
  },[])
 
  const itemsPerPage =6;
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  let paginatedData = data.slice(startIndex, endIndex)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handlePageChange = (page)=>{
    setCurrentPage(page)
}


  let [selectAll, setSelectAll] = useState(false)
  let [selectUsers, setSelectedUsers] = useState([])



  let monthAndYear = getCurrentMonthAndYear()

  let [isModalSalaryOpen, setIsModalSalaryOpen] = useState(false)
let [modalSalaryValues, setModalSalaryValues] = useState({})

  const [monthYear, setMonthYear] = useState({
    month: monthAndYear.month,
    year: monthAndYear.year
  })
  return (
    <>
    
 
    


    <div className=' max-w-[46rem] w-[100%] md:py-[2rem] md:pl-[3rem]'>
      {/* <div className="bg-[#F5F5F5]  border-[1px]  w-[46rem] px-[1rem] py-[2rem] rounded-[4px]"> */}
      <div className="bg-[#F5F5F5]   px-[1rem] py-[2rem] rounded-[4px]">
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center">
            <p className='font-[600] text-[0.85rem]'>Select staffs you want to pay bonus to</p>
            <InnerButton onClick={()=>handlePayrollSelectAll(selectAll, setSelectAll, unpaidStaff, setData,  setSelectedUsers)} text={selectAll? 'Unselect all Staffs': 'Select all Staffs' }  width='w-fit text-[0.85rem]' />
        </div>

        
        {/* PAYROLL DATA TABLE ACTION  */}
        <div className='mt-[2rem]'>

        <div className="data_table   no-scrollbar    overflow-x-auto scrollbar-hidden-x">
        {/* PayrollDataTableAction */}
        <table  className='rounded-md text-left text-[0.85rem] border-[0.4px]' >
        <thead   >
                 <tr  >

                     <th className='z-[20]'>Name</th>

                   
                     <th className=' z-[20]'>Position</th>
                    
                   
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

                       
                         
                            
                            <td  className=' md:table-cell'>{item.staff.position}</td>
                         
                        
                       

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
                    {/* <InnerButton    text= "Proceed to make payment" width={` w-fit text-[0.85rem] ${!true? "bg-grey-500 text-black cursor-not-allowed" : "bg-[var(--secondary-color)] text-white"} `}    /> */}
                    

                    <Button  disabled={!selectUsers.length > 0}  bgColor={!selectUsers.length > 0? "bg-grey-500 text-black cursor-not-allowed" : "bg-[var(--secondary-color)] text-white" }  text={"Proceed to record bonus"} padding="py-[0.6rem]" />
                    {/* <Button onClick={handleAddBonus} disabled={payload.amount == '' || payload.medium == '' } bgColor={payload.amount == '' || payload.medium == ''? "bg-grey-500 text-black cursor-not-allowed" : "bg-[var(--secondary-color)] text-white" }  text={isPending? "Loading...": "Record bonus now"} padding="py-[0.6rem]" /> */}
   
                     

        </div>
             </div>
        
       
        {/* <PayrollDataTableAction buttonText= "Proceed to record bonus" setIsOpen={setIsOpen} data={data} type="type-2" itemsPerPage={6} /> */}
        

      </div>

    </div>
    </>
   
  )
}
