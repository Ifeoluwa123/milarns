import React, { useEffect, useState } from 'react'
import Modals from './Modals'
import SelectField from './SelectField'
import InnerButton from './InnerButton'
import { RiErrorWarningLine } from 'react-icons/ri'
import { TbCurrencyNaira } from 'react-icons/tb'
import { useAddEmployeeBonusOrDeduction } from '../../services/admin/mutation'
import AlertMessages from './AlertMessages'
import Button from './Button'

export default function ModalPayrollAddBonus({isOpen, setIsOpen, staffCode}) {


  
  let [payload, setPayLoad] = useState({
    codes:  [staffCode],
   medium:'',
   type:"bonus",
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

              if(name === "medium"){
                if(value ===  "record_as_cash_received"){
                  setPayLoad((prev)=>({
                    ...prev,
                   medium:"cash"
                  }))
                }else{
                  setPayLoad((prev)=>({
                    ...prev,
                   medium:"salary_payout"
                  }))
                }
              }else{
                setPayLoad((prev)=>({
                  ...prev,
                  [name]:value,
                  // codes:[staffCode]
                }))
              }
            
    }


    let {mutate, isPending} = useAddEmployeeBonusOrDeduction()
    let handleAddBonus = (e)=>{
           e.preventDefault()
           mutate(payload,{
                onSuccess: (success)=>{
                    // console.log(success)
                    setPayLoad({})
                    setIsOpen(false)
                    setPayLoad((prev)=>({
                      ...prev,
                     medium:"",
                     amount:''
                    }))
                    AlertMessages("Bonus Added Successfully",success.message, "success")
                },
                onError: (error)=>{
                  console.log(error)
                  setPayLoad((prev)=>({
                    ...prev,
                   medium:"",
                   amount:''
                  }))
                  if(error.response.data.errors.amount){
                    AlertMessages("Error ",error.response.data.errors.amount, "error")

                  }
                  if(error.response.data.errors.)
                  AlertMessages("Error ",error.response, "error")
                }
           })
           
    }
  return (
    <Modals setIsopens={setIsOpen} isOpens={isOpen} title="Proceed to add bonus to salary">

    <div className="relative">
      <input value={payload.amount} placeholder='Add your bonus here. e.g: 1000' name="amount" onChange={handleOnchange}  type="text"  className='placeholder:pl-[0.3rem] pl-[1.8rem] w-full py-[0.5rem] px-[0.7rem] rounded-[4px] font-[600] border-[1px] border-[#6B7280]' />
      <p className="absolute top-[0.7rem] left-[0.4rem]"><span className="text-[1.2rem]"><TbCurrencyNaira /></span></p>
    </div>

    <div className="my-[0.8rem]">
      <p className='font-[600] text-[0.85rem]'>How should this bonus be treated?</p>
      <SelectField placeholder="Select Bonus type" onChange={handleOnchange} name="medium" options={["","Record as cash received", "Add to salary to be pay out"]} paddingY="py-[0.6rem] " />
    </div>

  {/* <div className="py-[1rem] px-[1rem] bg-[#F5F5F5] text-black rounded-[4px] ">
        <p className='flex items-start justify-between gap-x-[0.7rem]'>
          <span className="text-[var(--secondary-color)] block text-[1.2rem] justify-between"><RiErrorWarningLine /></span>
          <span className=' block text-[0.85rem]'>
          Note! You’re about to add <span className="font-[600]">₦1100</span> bonus to 10 staff salary that will be pay out this month. 
          </span>
        </p>

    </div> */}
  {/* <div className="py-[1rem] px-[1rem] bg-[#F5F5F5] text-black rounded-[4px] ">
        <p className='flex items-start justify-between gap-x-[0.7rem]'>
          <span className="text-[var(--secondary-color)] block text-[1.2rem] justify-between"><RiErrorWarningLine /></span>
          <span className=' block text-[0.85rem]'>
          Note! You’re about to add <span className="font-[600]">₦1100 </span>bonus to 10 staff salary that will be pay out this month. 
          </span>
        </p>

    </div> */}
 
  


    <div className="">
      {/* <InnerButton onClick={handleAddBonus} disabled={ payload.amount == '' || payload.medium == '' } bgColor={ payload.amount == '' || payload.medium == ''? "bg-grey-500 text-black cursor-not-allowed" : "bg-[var(--secondary-color)] text-white" } text={isPending? "Loading...": "Record bonus now"} width="flex justify-center w-full" /> */}
      <Button onClick={handleAddBonus} disabled={payload.amount == '' || payload.medium == '' } bgColor={payload.amount == '' || payload.medium == ''? "bg-grey-500 text-black cursor-not-allowed" : "bg-[var(--secondary-color)] text-white" }  text={isPending? "Loading...": "Record bonus now"} padding="py-[0.6rem]" />
    </div>

  </Modals>
  )
}

// valu="₦40,000.00"