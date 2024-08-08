import React, { useEffect, useState } from 'react'
import Modals from './Modals'
import InnerButton from './InnerButton'
import { RiErrorWarningLine } from 'react-icons/ri'
import { TbCurrencyNaira } from 'react-icons/tb'
import Button from './Button'
import { useAddEmployeeBonusOrDeduction } from '../../services/admin/mutation'

export default function ModalPayrollAddDeduction({isOpen, setIsOpen,staffCode}) {


  // console.log(staffCode)
  let [payload, setPayLoad] = useState({
    codes:  [staffCode],
   medium:'salary_payout',
   type:"deduction",
   amount:'',
})


useEffect(function(){

  if(staffCode){
    setPayLoad((prev)=>({
      ...prev,
      codes:[staffCode]
    }))
  }
 
},[staffCode])

let handleOnchange = (e)=>{
  let {name, value} = e.target

 
    setPayLoad((prev)=>({
      ...prev,
      [name]:value,
      // codes:[staffCode]
    }))
  

}
let {mutate, isPending} = useAddEmployeeBonusOrDeduction()
    const handleSubmit = ()=>{
      console.log(payload)
    }




  return (
    <Modals setIsopens={setIsOpen} isOpens={isOpen} title="Proceed to add deduction from salary">

    <div className="relative">
      <input type="text" value={payload.amount} name="amount" onChange={handleOnchange} placeholder='Enter amount you want to deduct. e.g: 1000'  className='placeholder:pl-[0.3rem] pl-[1.8rem] w-full py-[0.5rem] px-[0.7rem] rounded-[4px] font-[600] border-[1px] border-[#6B7280]' />
      <p className="absolute top-[0.7rem] left-[0.4rem]"><span className="text-[1.2rem]"><TbCurrencyNaira /></span></p>
    </div>
     
    
    <div className="py-[1rem] px-[1rem] bg-[#F5F5F5] text-black rounded-[4px] ">
        <p className='flex items-start justify-between gap-x-[0.7rem]'>
          <span className="text-[var(--secondary-color)] block text-[1.2rem] justify-between"><RiErrorWarningLine /></span>
          <span className=' block text-[0.85rem]'>
          Note! You’re about to deduct from 10 staff salary to be pay out in this month.
          </span>
        </p>
    
    </div>
    
    
    
    
    
    <div className="">
      {/* <InnerButton  text="Record deduction now" width="flex justify-center w-full" /> */}
      <Button onClick={handleSubmit} disabled={payload.amount === '' } bgColor={payload.amount === '' ? "bg-grey-500 text-black cursor-not-allowed" : "bg-[var(--secondary-color)] text-white" } text={isPending? "Loading...":"Record deduction now"} padding="py-[0.6rem]" /> 
    </div>
    
    </Modals>
  )
}
