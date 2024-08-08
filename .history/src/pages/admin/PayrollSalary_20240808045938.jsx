import React, { useState } from 'react'
import InnerButton from '../../components/shared/InnerButton'
import PayrollDataTableAction from '../../components/admin/PayrollDataTableAction'
import { payrolldata } from '../../utilities/admin/Data'

import Modals from '../../components/shared/Modals'
import { TbCurrencyNaira } from 'react-icons/tb'
import { RiErrorWarningLine } from "react-icons/ri";
import ModalPayrollSalary from '../../components/shared/ModalPayrollSalary'

export default function PayrollSalary() {
  const [isOpen, setIsOpen] = useState(false)
  
  let [data, setData] = useState(JSON.parse(localStorage.getItem('payment'))?.results || [])
  
  return (
    <> 
 
    {/* <ModalPayrollSalary isOpen={isOpen} setIsOpen ={setIsOpen} /> */}
    
    <div className=' max-w-[46rem] w-[100%] md:py-[2rem] md:pl-[3rem]'>
      {/* <div className="bg-[#F5F5F5]  border-[1px]  w-[46rem] px-[1rem] py-[2rem] rounded-[4px]"> */}
      <div className="bg-[#F5F5F5]   px-[1rem] py-[2rem] rounded-[4px]">
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center">
            <p className='font-[600] text-[0.85rem]'>Select staffs you want to pay salary to</p>
            <InnerButton text="Select all staffs" width='w-fit text-[0.85rem]' />
        </div>

        {/* PAYROLL DATA TABLE ACTION  */}
       
        <PayrollDataTableAction buttonText="Proceed to make payment" setIsOpen={setIsOpen} data={data} type="type-1" itemsPerPage={6} />
        

      </div>

    </div>
    </>
  
  )
}
