import React, { useState } from 'react'
import InnerButton from '../shared/InnerButton'
import { TfiReload } from "react-icons/tfi";
import verveImg from '../../assets/images/card.png'
import siliconChipImg from '../../assets/images/silicon_chip.png'
import { useRequestCard } from '../../services/admin/mutation';
import { useParams } from 'react-router-dom';

export default function StaffAccountCardPage() {
  let {staffId} = useParams()

let {mutate, isPending} = useRequestCard()
let [response, setResponse] = useState({
  success:null,
  error:null
})

const handleSubmit = ()=>{
  mutate(staffId, {
    onSuccess:(success)=>{
      console.log(success)
      setResponse({
        ...response,
        success:success.message
      })
    },
    onError:(error)=>{

      setResponse({
        ...response,
        error:error.response.data.message,
        success:null
      })
      // console.log(error.response.data.message)
    }
  })
}



  return (
    <div className='pb-[3rem] lg:pb-0'>
       {/* Card form */}
       <div className="">
            <p className='mb-[0.5rem] font-[600] '>Staff Debit Card details</p>
             
        </div>


<div className="">
  <p className='text-[1rem] mt-[2rem]'>No debit card generated for staff yet. You can request for it. And we shall get back to you within 48 hours.</p>
</div>
        <div className="mt-[2rem]">
            <InnerButton onClick={ handleSubmit} icon={<TfiReload />} text={`${isPending? 'Loading...':'Request Card' }`} width="w-fit"/>
      {/* <p className='mt-[33px] p-[4px_20px_4px_20px] w-fit rounded-[4px] bg-[#F3F4F6] text-[#008080]'>Note! Staff credit card has been generated, but only staff can receive the card details</p> */}
        </div>


      {/* Card Section */}
        {/* <div className=" min-w-[303px] w-fit  mt-[33px] overflow-x-hidden">
          <div className="">

          </div>
        <img src={verveImg} alt="" />
        </div> */}
{/* Card Section Ends */}

{ response.success &&  <p className='mt-[33px] p-[4px_20px_4px_20px] max-w-[320px] w-full rounded-[4px] bg-[#F3F4F6] text-[#008080]'>
  Staff credit card has been requested, it will be delivered as soon as possible
  </p>  }
  {
    response.error && <p className='mt-[33px] p-[4px_20px_4px_20px] max-w-[320px] w-full rounded-[4px] bg-[#F3F4F6] text-[#008080]'>
        {response.error}
    </p> 
  }

      {/* <div className="mt-[1rem] ">
      To deactivate staff credit card, please 
      &nbsp;
      <a href="#" className='text-[var(--secondary-color)]'>

      contact WagePull support,

      </a>
      &nbsp;
       our support team shall assist you with the card deactivation.
      </div> */}

    </div>
  )
}
