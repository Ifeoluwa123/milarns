import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import Checkbox from '../shared/Checkbox';
import { IoDocumentTextOutline } from 'react-icons/io5';
import AddManualOnboardStaff from '../../pages/admin/StaffList_AddManualOnboardStaff';

export default function AddPayrollModalBody({setIsModalOpen}) {

    let [selectedOption, setSelectedOption] = useState(null)
    let navigate = useNavigate()
   

let handleCheckBoxChange= (option)=>{
  setSelectedOption(option)
}


let handleProceed = ()=>{

    if(selectedOption != null){
        setIsModalOpen(false)
        if(selectedOption == 'salary'){
              return navigate('pay-salary')
              // navigate('add-single-staff')
        } 
        else if(selectedOption == 'bonus'){
              return navigate('add-bonus')
        } 
        else if(selectedOption == 'deduction'){
              return navigate('add-deduction')
        } 
    }
  


}


  return (
    <div className="">
                  <ul >
                    <li onClick={()=>handleCheckBoxChange('salary')} className='hover:cursor-pointer hover:bg-[var(--secondary-color-hover-lighter)] hover:border-[var(--secondary-color)] mb-[2rem] border-[1px] p-[1rem] rounded-[5px] border-black' >
                      <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <span className='mr-[1rem]'><IoDocumentTextOutline /></span>
                          <div className="">
                          <h6 className='font-[600]'>Pay salary</h6>
                            <p className='text-[0.8rem]'>Pay your staff salary</p>
                          </div>
                        
                          </div>
                          <span><Checkbox  readOnly={true} id="salary" value="salary"  checked = {selectedOption === 'salary'} /></span>
                      </div>
                    </li>
                    <li onClick={()=>handleCheckBoxChange('bonus')} className='hover:cursor-pointer hover:bg-[var(--secondary-color-hover-lighter)] hover:border-[var(--secondary-color)] mb-[2rem] border-[1px] p-[1rem] rounded-[5px] border-black'>
                      <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <span className='mr-[1rem]'><IoDocumentTextOutline  /></span>
                          <div className="">
                          <h6 className='font-[600]'>Add bonus pay</h6>
                            <p className='text-[0.8rem]'>Add salary bonus for your staff</p>
                          </div>
                        
                          </div>
                          <span><Checkbox readOnly={true} id="bonus" value="bonus"  checked = {selectedOption === 'bonus'} /></span>
                      </div>
                    </li>
                    <li onClick={()=>handleCheckBoxChange('deduction')} className='hover:cursor-pointer hover:bg-[var(--secondary-color-hover-lighter)] hover:border-[var(--secondary-color)] border-[1px] p-[1rem] rounded-[5px] border-black'>
                      <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <span className='mr-[1rem]'><IoDocumentTextOutline  /></span>
                          <div className="">
                          <h6 className='font-[600]'>Add salary deduction</h6>
                            <p className='text-[0.8rem]'>Deduct fee from staff salary</p>
                          </div>
                        
                          </div>
                          <span><Checkbox readOnly={true} id="deduction" value="deduction"  checked = {selectedOption === 'deduction'} /></span>
                      </div>
                    </li>

                    <li className='mt-[2rem]'>
                      <button onClick={handleProceed } className={` ${selectedOption? 'bg-[var(--secondary-color)] text-white  hover:bg-[var(--secondary-color-hover)] ' : 'bg-[var(--grey-color)] text-black' } 
transition-all duration-[0.3s] 


w-full 
  shadow-[2px_2.5px_1px_1px_rgba(0,0,0,1)]
   rounded-[4px]
whitespace-nowrap
block
text-center
py-[0.5rem]
px-[1rem]

`}
>Proceed</button>
                    </li>
                  </ul>
                </div>
  )
}
