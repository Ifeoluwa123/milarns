import React from 'react'
import InnerButton from '../shared/InnerButton'
import { TfiReload } from "react-icons/tfi";
import verveImg from '../../assets/images/card.png'
import siliconChipImg from '../../assets/images/silicon_chip.png'

export default function StaffAccountCardPage() {






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
            <InnerButton icon={<TfiReload />} text="Request Card" width="w-fit"/>
      {/* <p className='mt-[33px] p-[4px_20px_4px_20px] w-fit rounded-[4px] bg-[#F3F4F6] text-[#008080]'>Note! Staff credit card has been generated, but only staff can receive the card details</p> */}
        </div>


      {/* Card Section */}
        <div className=" min-w-[303px] w-fit  mt-[33px] overflow-x-hidden">
          <div className="">
            
          </div>
        <img src={verveImg} alt="" />
        </div>
{/* Card Section Ends */}

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
