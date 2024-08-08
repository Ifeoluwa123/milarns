import React, {  useEffect, useState } from 'react'

import { useLocation, Link, useNavigate } from 'react-router-dom'
import ChangeHeaderText from '../../utilities/admin/ChangeHeaderText'
import {FiBell} from 'react-icons/fi'
import {IoIosHelpCircleOutline} from 'react-icons/io'
import {IoLogOutOutline} from 'react-icons/io5'
import {MdArrowDropDown, MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/md'
import {CiUser} from 'react-icons/ci'
import {FaBarsStaggered} from 'react-icons/fa6'

import AdminImg from '../../assets/images/admin/admin.png'
import CountSlashes from '../../utilities/admin/CountSlashes'
import { useQueryClient } from '@tanstack/react-query'
import userPlaceholder from '../../assets/images/default.png'
 


export default function Header({isSidebarOpen, setIsSideBarOpen}) {

    
    let {pathname} = useLocation()
    let navigate = useNavigate()
    let countSlashes = CountSlashes(pathname)
    let [urlPath, setUrlPath] = useState("Dashboard")

    let [isLoginBar, setIsLoginBar] = useState(false)
    
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))

    
    ChangeHeaderText(useEffect, useLocation,setUrlPath )
   
    let [notification, setNotification] = useState(2)
   

 

    const queryClient = useQueryClient();
    const logout = ()=>{
        sessionStorage.clear()
        localStorage.clear()
        queryClient.clear();
        // queryClient.removeQueries("adminData")
     
    }

console.log()
  return (
    <header className={`fixed top-0 bg-[var(--grey-color)]    ${isSidebarOpen? 'md:max-w-[calc(100%-200px)] md:left-[200px]':'md:max-w-[calc(100%-85px)] md:left-[85px]'} transition-all duration-[0.3s]   w-full border-b-[1px] py-[1rem] md:py-0 m-0 z-[120] bg-white md:bg-transparent md:z-[50] px-[1rem] md:px-0`}>
    <div className="flex justify-between">
        {/* Left Box */}
        <div className="hamburger flex items-center gap-x-[0.6rem]  md:max-w-[250px]  lg:max-w-[300px] overflow-x-hidden md:pl-[1.5rem] w-full md:h-[51px] md:bg-[var(--grey-color)]">
        <span onClick={()=>setIsSideBarOpen((prev)=>!prev)} className='text-[1rem] cursor-pointer md:hidde'><FaBarsStaggered /></span>
       {countSlashes> 1 && <span onClick={()=>navigate(pathname.split('/').splice(1)[0])} className='text-[1.6rem] cursor-pointer '><MdKeyboardArrowLeft /></span>} 
         
            <h3 className='text-[1rem] font-[700] whitespace-nowrap '>{urlPath}</h3>
        </div>
         {/* Right Box*/}
         <div className="md:mr-[1rem] lg:mr-[3rem]">
            <div className="flex items-center h-full ">
            {/* <div className="hidden relative right-[1.5rem] md:flex items-center">
                            <span className="bg-[var(--secondary-color)] font-[600] absolute left-[40%] top-[-50%] text-white p-[0.5rem] rounded-full h-[13px] flex justify-center items-center text-[0.5rem] w-[13px] ">{notification}</span>
                            <span className="block text-[1rem] "><FiBell /></span>
            </div> */}
   
            {/* <a href='#' className='flex items-center   font-[500] whitespace-nowrap '><span className='text-[1.3rem]'><IoIosHelpCircleOutline /></span> &nbsp; <span className='  text-[0.85rem]'>Support</span></a> */}
            <div  className="header_menu cursor-pointer flex items-center gap-[0.5rem] ml-[0.8rem] md:ml-[2rem]">
                        <div className="rounded-full overflow-hidden w-[25px]">
                            <img src={adminInfo?.user.avatar ? adminInfo?.user.avatar: userPlaceholder } alt="" />
                        </div>
                        <div className="text-[0.8rem] ">
                            <h1 className='whitespace-nowrap'>{adminInfo?.user?.first_name} {adminInfo?.user?.last_name}</h1>
                            {/* <h1 className='whitespace-nowrap'>{adminData.director_name }</h1> */}
                        </div>
                        <div className=' relative'>
                            <span ><MdArrowDropDown /></span>
                            {/* <div className={` ${isLoginBar? 'visible': 'invisible'}  absolute top-[100%] right-[-2%]  md:right-[-5%] lg bg-[var(--grey-color)] w-[300px] max-w-[150px] mr-[1rem] md:mr-[5rem] shadow-[2px_2px_1px_1px_rgba(0,0,0,1)] rounded-sm `}> */}
                            <div className={` header_link_items relative  h-full`}>
                              
                            <ul className=' absolute top-[100%] right-[-2%] md:text-black  md:mt-[1rem] md:right-[-5%]  bg-[var(--grey-color)] w-[300px] max-w-[150px] mr-[1rem] md:mr-[0rem] shadow-[2px_2px_1px_1px_rgba(0,0,0,1)] rounded-sm '>
                                <li className='border-b-[0.3px]'><Link to="/settings" className='text-[0.85rem]  flex items-center justify-center  gap-[1rem] py-[1rem] hover:bg-[--secondary-color-hover-lighter] hover:text-[var(--secondary-color)]'><span><CiUser  /></span> Profile <span><MdKeyboardArrowRight /></span></Link></li>
                                <li onClick={logout}><Link className='text-[0.85rem]  flex items-center justify-center  gap-[1rem] py-[1rem] hover:bg-[--secondary-color-hover-lighter] hover:text-[var(--secondary-color)]'><span><IoLogOutOutline  /></span> Log out <span><MdKeyboardArrowRight /></span></Link></li>
                                {/* <li className='border-b-[0.3px]'><Link className='transition-all duration-[0.3s] text-[0.85rem] flex items-center justify-center gap-[1rem] py-[1rem] hover:bg-[--secondary-color] hover:text-white'> <span><CiUser  /></span> Profile <span><MdKeyboardArrowRight /></span></Link></li>
                                <li><Link to="/" className='transition-all duration-[0.3s] text-[0.85rem] flex items-center justify-center gap-[1rem] py-[1rem]  hover:bg-[--secondary-color] hover:text-white'> <span><IoLogOutOutline  /></span> Log out <span><MdKeyboardArrowRight /></span></Link></li> */}
                            </ul>
                              
                               
                            </div>
                        </div>
                    </div>              
        </div>
        </div>
    </div>
    </header>
  )
}
