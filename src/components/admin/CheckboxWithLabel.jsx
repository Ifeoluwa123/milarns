import React from 'react'
import Checkbox from '../shared/Checkbox'
export default function CheckboxWithLabel({label, id, name, checked, onChange}) {
  return (
    <div className='border-[1px] my-[0.4rem]   border-[#9CA3AF] w-fit rounded-[5px] inline-block mr-[1rem]'>
            <label  htmlFor={id} className="hover:cursor-pointer flex items-center text-[1rem] p-[0.6rem] ">
                {label} &nbsp; &nbsp; <Checkbox id={id} name={name} onChange={onChange} checked={checked}   />
            </label>
    </div>
  )
} 
