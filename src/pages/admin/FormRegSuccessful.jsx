import React from 'react'
import FemaleAvatar from '../../assets/images/avatar.png'
import InnerButton from '../../components/shared/InnerButton'
export default function FormRegSuccessful() {
  return (
    <div className='bg-white max-w-[580px]  text-center mx-auto mt-[1rem] rounded-[4px] px-[1rem] md:px-[2rem] py-[2rem] pb-[2rem]'>
       <p>
       Your application is now in review. We’ll reach out to you in 2 to 3 business days to confirm your application to use our platform. 
       </p>

       <p className='mt-[3rem]'>
       Have any question, <a className='text-[var(--secondary-color)] underline' href="https://milarn.com/our-support/" target="_blank">please contact our support team</a>
       </p>

       <div className="w-full flex justify-center mt-[2rem]">
        <img src={FemaleAvatar } alt="" />
       </div>

       <p className="mt-[1.5rem]">
       For the main time, you can explore how your organization and employee can use  WagePull to easily process salaries & also get salaries on demand.
       </p>

       <div className="mt-[1rem]">
            <InnerButton width="text-center w-full flex justify-center" text="View Guide" />
       </div>
    </div>
  )
}
