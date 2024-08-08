import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import Logo from '../../assets/images/logo/dark-bg-logo.png'
import Logo2 from '../../assets/images/logo/logo.png'
import { Link, useLocation, NavLink } from 'react-router-dom';
import AdminImg from '../../assets/images/admin/admin.png'
import AdminLinks from '../../utilities/admin/AdminLinks';
import userPlaceholder from '../../assets/images/default.png'

export default function AdminSiderBar({isSidebarOpen, setIsSideBarOpen}) {
    let {pathname} = useLocation()
  
    // console.log(iss)
  return (
    <>
    {/* SuperAdminSidebar */}
    <MobileView pathname={pathname} isSidebarOpen={isSidebarOpen} setIsSideBarOpen={setIsSideBarOpen}/>
    <DesktopView pathname={pathname} isSidebarOpen={isSidebarOpen} setIsSideBarOpen={setIsSideBarOpen} />
</>
  )
}






function MobileView({pathname, isSidebarOpen, setIsSideBarOpen}){
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))

  return(
      <div className={` ${isSidebarOpen? 'left-0':'left-[-100%]'} transition-all duration-[0.3s]   flex justify-between bg-[rgba(0,0,0,0.7)] h-screen md:hidden fixed top-0 w-full z-[200]`}>
          <div className="bg-white h-full relative   max-w-[228px] w-full">
          <div className="border-b-[1px] py-[0.85rem] mx-auto w-full pl-[2rem]">
              <Link to="/admin" className="w-[100px] block">
                  <img src={Logo2 } alt="" />
              </Link>
          </div>





          <div className="text-white border- border-red-900 h-fit absolute top-[5rem] md:top-[7rem] pl-[1.5rem] w-full ">
                 <div className="">
                     <div className=" w-[80px] h-[80px] rounded-full overflow-hidden">
                     <img src={adminInfo?.user.avatar?adminInfo?.user.avatar : userPlaceholder } className='w-full object-cover block' alt="" />
                     </div>

                     <h4 className='mt-[0.5rem]'>{adminInfo.organization.director_name} </h4>
                     {/* <p className='text-[0.85rem] font-[100]'>{adminInfo.organization.role}</p> */}
                     <p className='text-[0.85rem] font-[100]'>Administrator</p>
                 </div>
          </div>
                 <div className="text-white mt-[4rem] md:mt-[6rem] bg-[var(--primary-color)] h-full ">
                     <ul className='relative top-[8rem] h-full  px-[1rem] overflow-y-auto'>
                      {
                           AdminLinks.map((item, index)=>{
                              return <li key={index} onClick={()=>setIsSideBarOpen(false)}><Link to={item.path} className={` ${pathname.includes(item.path) && 'bg-[var(--secondary-color)]'} transition-all duration-[0.3s] ease py-[0.6rem] px-[0.6rem] mb-[1rem] rounded-md  flex hover:bg-[var(--secondary-color)] items-center gap-[1rem]`}><span>{item.icon}</span>{item.name}</Link></li>
                                
                          })
                      }
                        
                     </ul>
                 </div>
          </div>


          <div  className={`pt-[0.6rem] pr-[0.6rem]`} >
        <div className="text-black bg-white hover:cursor-pointer ml-[2rem]  rounded-full" onClick={()=>setIsSideBarOpen(false)}>
          <span className='text-[1.5rem]  '> <IoCloseOutline /></span>
        </div>
        </div>
      </div>

      
  )
}


function DesktopView({pathname, isSidebarOpen, setIsSideBarOpen}){

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
  return(
      <div className={` bg-white border-r-[1px] border-[#F5F5F5] h-screen fixed ${isSidebarOpen? 'max-w-[200px]':'max-w-[85px]'} transition-all duration-[0.3s] z-[100]  w-full hidden md:block`}>
             <div className=" py-[0.88rem] border-b-[1px]">
              <Link  to ="admin" className={`${!isSidebarOpen?"max-w-[25px] w-full":"w-[75px] "}    mx-auto block`}>
                  <img src={!isSidebarOpen? Logo2: Logo} className={` w-full object-cover block `} alt="" />
              </Link>
              </div>


               {/* NAV LINKS */}


               <div className={` ${!isSidebarOpen && 'bg-[var(--primary-color)]' }  transition-all duration-[0.3s] absolute pt-[3rem] flex items-center flex-col justify-center w-full  `}>
              <div className={`${isSidebarOpen? 'w-[80px]   ' :'w-[47.32px]'} transition-all duration-[0.3s] rounded-full  overflow-hidden`}>
                <img src={adminInfo?.user.avatar?adminInfo?.user.avatar : userPlaceholder } className='w-full block object-cover' alt="" />
              </div>
              <div className={`${isSidebarOpen?'opacity-1 mb-[3.2rem]':'opacity-0' } whitespace-nowrap text-white transition-all duration-[0.3s]`}>
              <h4 className='mt-[0.5rem]'>{adminInfo.organization.director_name}</h4>
                     <p className='text-[0.85rem] font-[100]'>Administrator</p>
              </div>
            </div>

          <div className="text-white mt-[0rem]  md:mt-[5.7rem] bg-[var(--primary-color)] h-full ">
          <ul className={`relative ${!isSidebarOpen? 'top-[2rem]': 'top-[8rem]'} transition-all duration-[0.3s] h-full   overflow-y-auto`}>

           
         
         {
           AdminLinks.map((link,index)=>
              // <li key={index} className='mb-[1rem] pl-[2rem]'>
              <li key={index} className='mb-[1rem] ml-[1rem]'>
              {/* <Link to={link.path} className='text-white rounded-tl-md rounded-bl-md  transition-all duration-[0.3s] ease py-[1rem] px-[1.2rem]  flex hover:bg-[var(--secondary-color)] items-center gap-[1rem]'> */}
              <NavLink  to={link.path} end={index == 0} className={`text-white whitespace-nowrap pl-[0.5rem] rounded-tl-md rounded-bl-md ${pathname.includes(link.path) && 'bg-[var(--secondary-color)]'} transition-all duration-[0.3s] ease py-[0.6rem]   flex hover:bg-[var(--secondary-color)] items-center gap-[1rem]`}>
              {/* <NavLink  to={link.path} end={index == 0} className={`text-white whitespace-nowrap pl-[0.5rem] rounded-tl-md rounded-bl-md transition-all duration-[0.3s] ease py-[0.6rem]   flex hover:bg-[var(--secondary-color)] items-center gap-[1rem]`}> */}
              <span className='text-[1.2rem]'>{link.icon}</span>
              <span className={`${isSidebarOpen? 'opacity-1':'opacity-0'}   transition-all duration-[0.3s]`}>{link.name}</span>
              </NavLink>  
          </li>
          )
         }
         
      </ul>
          </div>
      </div>
  )
}