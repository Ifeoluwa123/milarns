import React from 'react'
import InnerButton from '../shared/InnerButton'
import { TfiReload } from "react-icons/tfi";
import verveImg from '../../assets/images/verve.png'
import siliconChipImg from '../../assets/images/silicon_chip.png'

export default function StaffAccountCardPage() {
  return (
    <div className='pb-[3rem] lg:pb-0'>
       {/* Card form */}
       <div className="">
            <p className='mb-[0.5rem] font-[600] '>Staff Debit Card details</p>
             
        </div>


        <div className="mt-[2rem]">
            <InnerButton icon={<TfiReload />} text="Generate card" width="w-fit"/>
      {/* <p className='mt-[33px] p-[4px_20px_4px_20px] w-fit rounded-[4px] bg-[#F3F4F6] text-[#008080]'>Note! Staff credit card has been generated, but only staff can receive the card details</p> */}
        </div>


      {/* Card Section */}
        <div className=" min-w-[303px] w-fit  mt-[33px] overflow-x-hidden">
            <div className="text-white relative bg-[url('../assets/images/card_sample.png')] bg-no-repeat  h-[210px]  ">
             
              <div className="grid absolute w-[280px] grid-cols-[212px_1fr]  h-[205px] left-[1.28rem]">
               {/* Left Content */}
                <div className="overflow-x-hidden">
                <p className='uppercase text-[0.75rem] text-[#A9FFFF] absolute top-[22px] '>Oluwakemisola  Rasheed Bado</p>
                <div className="absolute top-[72.71px]">
                  <p className='text-[0.75rem] text-[#E5E7EB]'>Card Number</p>
                <h3 className=' text-[#F3F4F6] font-[600]'>XXXX XXXX XXXX XXXX</h3>
              </div>
              <div className=" absolute top-[145.75px]">
                  <p className='text-[0.75rem] text-[#E5E7EB]'>Expiry Date</p>
                  <p className="text-[0.75rem] text-[#E5E7EB]">10/25</p>
                
              </div>
                </div>

                {/* Right Content */}
                <div className=" flex justify-between flex-col items-center pt-[18.48px]">
                    <div className=" ">
                      <img src={verveImg} alt="" />
                    </div>

                    <div className="absolute top-[155.75px] ">
                        <img src={siliconChipImg}  alt="" />
                    </div>
                </div>
              
              </div>
              
            </div>
        </div>
{/* Card Section Ends */}

      <div className="mt-[1rem] ">
      To deactivate staff credit card, please 
      &nbsp;
      <a href="#" className='text-[var(--secondary-color)]'>

      contact WagePull support,

      </a>
      &nbsp;
       our support team shall assist you with the card deactivation.
      </div>

    </div>
  )
}
