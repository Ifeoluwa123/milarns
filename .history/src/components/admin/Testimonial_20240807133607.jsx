import React from 'react'
import imageLady from '../../assets/images/register-lady.png'
import fiveStar from '../../assets/images/5-star.png'
import Logo2 from '../../assets/images/logo.png'

export default function Testimonial() {
  return (
    <div>
         <h1 className='bg-[var(--primary-color)] text-white rounded-full text-center py-[0.6rem] md:py-[0.8rem]  '>Testimonial from user</h1>
                                  <div className="h-[68px] border-x-[4px] max-w-[200px] w-full mx-auto border-dotted border-x-black"></div>
                                  <div className=" right-bar-bg rounded-[5px] px-[1rem] pb-[0.4rem]">
                                       
                                        <div className="w-[4.375rem] h-[4.375rem] overflow-hidden relative top-[20px] left-[5px]">
                                            <img src={imageLady} className='object-cover w-full block' alt="" />
                                        </div>

                                        <p className='relative top-[2.5rem] font-[600]   w-[600] text-[1rem] text-black'>“Our favorite thing about Milarn is the ability for employee to easily get their salary in advance and also pay salary in one-go.”</p>
                                       
                                        <div className="relative top-[3.5rem] mb-[3.5rem]">
                                          <img src={fiveStar} alt="" />
                                        </div>

                                        <div className="mt-[4.5rem]">
                                          <h5 className='font-[600] text-[1rem]'>Veronica Akinyemi</h5>
                                          <p className='text-[0.8rem] text-gray-500 font-[500]'>Senior manager Fillop</p>
                                        </div>

                                        <div className="relative top-[1.5rem] mb-[3.5rem] ">
                                          <img src={Logo2} alt="" />
                                        </div>
                            </div>
    </div>
  )
}
