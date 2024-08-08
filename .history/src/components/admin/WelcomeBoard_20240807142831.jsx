import React from 'react'
// import ProgressBar from './ProgressBar'

import { Link } from 'react-router-dom'
import {TbCurrencyNaira} from 'react-icons/tb'
import ImgPreview from '../../assets/images/bg-preview1.png'
// import PinkAlert from './PinkCard'
// import WhiteCard from './WhiteCard'
import ProgressBar from './ProgressBar'


export default function WelcomeBoard({currentWagePulled}) {

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
  
    let check = true
  return (
    <div className="text-white px-[1rem] py-[1.5rem] overflow-hidden   bg-[#fe5e55] rounded-[4px] bg-[url('../../assets/images/bg-vector.png')] ">
    <h1 className=''>Welcome onboard Rasheed</h1>
    <div className='bg-[var(--primary-color)]  mt-[1rem] pt-[0.2rem] rounded-md overflow-hidden'>
                            <div className="bg-white h-full rounded-[0.3rem] p-[1rem]">
                                <p className='text-black font-[600] text-[0.8rem]'>
                                Is another beautiful day to tell your staff they can take
                                their salary in advance through Milarn
                                
                                
                                  </p>
                            </div>
                   </div>
 
              {/* {
                check? <div className='bg-[var(--primary-color)]  mt-[1rem] pt-[0.2rem] rounded-md overflow-hidden'>
                            <div className="bg-white h-full rounded-[0.3rem] p-[1rem]">
                                <p className='text-black font-[600] text-[0.8rem]'>
                                Is another beautiful day to tell your staff they can take
                                their salary in advance through Milarn
                                
                                
                                  </p>
                            </div>
                   </div> 
                
                : 

                <div className='mt-[0.5rem]'>
                <p className='text-[0.8rem] '>Please complete your organization profile</p>
                
                <div className='relative my-[1rem]'>
      
                <ProgressBar value={90} />
                </div>
                <p className='text-[0.8rem] mt-[0.5rem]'>It will take you one minute</p>
                <Link to="/settings" className='bg-white mt-[1.5rem] block text-center font-[600] text-[0.85rem] whitespace-nowrap rounded-md text-black px-[1rem] py-[1rem]'  >Complete Profile</Link>
                </div>
              } */}
   
   

    <div className='mt-[1.5rem]  '>

    
      <h4 className=' text-[0.9rem]'>Wages pulled this month</h4>
    </div>

    <div className="mt-[0.3rem]">
          <h3 className='text-[1.4rem] font-[700] flex items-center '><span><TbCurrencyNaira size={28} /></span>
          
          {
            currentWagePulled? currentWagePulled :'0'
          }
         .00
          
          </h3>
    </div>
    <div className="relative w-full top-0 flex justify-end h-[70px]">
    <div className=" w-full absolute top-0 z-[100] ">
      {/* {
        check &&  <div className=" mt-[0.6rem] z-[50]">

        <p className='bg-[#FAD5D5] w-fit text-[var(--secondary-color)] py-[0.1rem] px-[0.6rem] rounded-[0.3rem] text-[0.7rem] font-[600]'>14% less than last month</p>
        </div>
      } */}
     
      <div className=" w-[100px] absolute top-0 right-[-20px] z-[-1]">
          <img src={ImgPreview} className='w-full ' alt="" />
      </div>
        </div>
    </div>
</div>
  )
}
