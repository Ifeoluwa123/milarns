import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/logo/logo.png'
import AdminLinks from '../../utilities/admin/AdminLinks'
import { Link, NavLink, useLocation } from 'react-router-dom'
import AdminImg from '../../assets/images/admin/admin.png'


export default function TabletDesktopSideBar() {
  let {pathname} = useLocation()

  return (
    <div  className=''>
        <div className="">
          <div className="py-[0.94rem] ">
          <Link  to ="admin" className=" max-w-[25px] w-full mx-auto block">
              <img src={Logo} className='w-full object-cover block' alt="" />
            </Link>
          </div>


            {/* NAV LINKS */}

            <div className="bg-[var(--primary-color)] h-screen">
            <ul >

              <li className='mb-[2rem] pt-[3rem] flex items-center justify-center w-full  '>
                <div className="w-[47.32px] rounded-full overflow-hidden">
                  <img src={AdminImg} className='w-full block object-cover' alt="" />
                </div>
              </li>
           
           {
            AdminLinks.map((link,index)=>
                // <li key={index} className='mb-[1rem] pl-[2rem]'>
                <li key={index} className='mb-[1rem] ml-[1rem]'>
                {/* <Link to={link.path} className='text-white rounded-tl-md rounded-bl-md  transition-all duration-[0.3s] ease py-[1rem] px-[1.2rem]  flex hover:bg-[var(--secondary-color)] items-center gap-[1rem]'> */}
                <NavLink  to={link.path} end={index == 0} className={`text-white whitespace-nowrap pl-[0.5rem] rounded-tl-md rounded-bl-md ${pathname.includes(link.path) && 'bg-[var(--secondary-color)]'} transition-all duration-[0.3s] ease py-[0.6rem]   flex hover:bg-[var(--secondary-color)] items-center gap-[1rem]`}>
                {/* <NavLink  to={link.path} end={index == 0} className={`text-white whitespace-nowrap pl-[0.5rem] rounded-tl-md rounded-bl-md transition-all duration-[0.3s] ease py-[0.6rem]   flex hover:bg-[var(--secondary-color)] items-center gap-[1rem]`}> */}
                <span className='text-[1.2rem]'>{link.icon}</span>
                
                </NavLink>  
            </li>
            )
           }
           
        </ul>
            </div>
        </div>
    </div>
  )
}
