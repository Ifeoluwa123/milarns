import React, { useState } from 'react'
import InnerButton from '../../components/shared/InnerButton'
import PayrollDataTableAction from '../../components/admin/PayrollDataTableAction'
import { payrolldata } from '../../utilities/admin/Data'

import Modals from '../../components/shared/Modals'
import { TbCurrencyNaira } from 'react-icons/tb'
import { RiErrorWarningLine } from 'react-icons/ri'
import SelectField from '../../components/shared/SelectField'
import getCurrentMonthAndYear from '../../utilities/getCurrentMonthAndYear'

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
            <InnerButton text="Select all staffs"  width='w-fit text-[0.85rem]' />
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
             

             </table>
             </div>
             </div>
        
       
        {/* <PayrollDataTableAction buttonText= "Proceed to record bonus" setIsOpen={setIsOpen} data={data} type="type-2" itemsPerPage={6} /> */}
        

      </div>

    </div>
    </>
   
  )
}
