import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { LuUserPlus2 } from "react-icons/lu";
import Checkbox from '../shared/Checkbox';
import { IoDocumentTextOutline } from 'react-icons/io5';
import AddManualOnboardStaff from '../../pages/admin/StaffList_AddManualOnboardStaff';

export default function AddNewStaffModalBody({setIsModalOpen}) {

    let [selectedOption, setSelectedOption] = useState(null)
    let navigate = useNavigate()
   

let handleCheckBoxChange= (option)=>{
  setSelectedOption(option)
}


let handleProceed = ()=>{

    if(selectedOption != null){
        setIsModalOpen(false)
        if(selectedOption == 'manual'){
              return navigate('add-single-staff')
              // navigate('add-single-staff')
        } 
        else if(selectedOption == 'bulk'){
              return navigate('add-bulk-staff')
        } 
    }
  


}


  return (
    <div className="">
                  <ul >
                    <li onClick={()=>handleCheckBoxChange('manual')} className='hover:cursor-pointer hover:bg-[var(--secondary-color-hover-lighter)] hover:border-[var(--secondary-color)] mb-[2rem] border-[1px] p-[1rem] rounded-[5px] border-black' >
                      <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <span className='mr-[1rem]'><LuUserPlus2 /></span>
                          <div className="">
                          <h6 className='font-[600]'>Add new staff manually</h6>
                            <p className='text-[0.8rem]'>Onboard staff one after the other</p>
                          </div>
                        
                          </div>
                          <span><Checkbox  readOnly={true} id="manual" value="manual"  checked = {selectedOption === 'manual'} /></span>
                      </div>
                    </li>
                    <li onClick={()=>handleCheckBoxChange('bulk')} className='hover:cursor-pointer hover:bg-[var(--secondary-color-hover-lighter)] hover:border-[var(--secondary-color)] border-[1px] p-[1rem] rounded-[5px] border-black'>
                      <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <span className='mr-[1rem]'><IoDocumentTextOutline  /></span>
                          <div className="">
                          <h6 className='font-[600]'>Bulk upload staff list</h6>
                            <p className='text-[0.8rem]'>Use an excel sheet to upload the details of staffs in one-go</p>
                          </div>
                        
                          </div>
                          <span><Checkbox readOnly={true} id="bulk" value="bulk"  checked = {selectedOption === 'bulk'} /></span>
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
