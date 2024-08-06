import React, { useState } from 'react'
import Header from '../components/admin/Header'
import AdminSiderBar from '../components/admin/AdminSiderBar'


export default function AdminProviderLayout({children}) {

    let [isSidebarOpen, setIsSideBarOpen] = useState(false)


  return (
    <div  className="flex items-start  h-screen md:bg-white">
    {/* LEFT */}
        <div >
               <AdminSiderBar isSidebarOpen={isSidebarOpen} setIsSideBarOpen = {setIsSideBarOpen} />
  
               {/* <div className=" hidden md:block h-screen  md:fixed md:left-0 max-w-[85px] w-full overflow-hidden">
  
               <TabletDesktopSideBar />
               </div> */}
        </div>
  
  {/* RIGHT */}
        <div className="right_content ml-0 md:ml-[85px] flex-1 w-full">
              {/* Header */}
              <Header  isSidebarOpen={isSidebarOpen} setIsSideBarOpen = {setIsSideBarOpen} />
  
            
              {/* Pages */}

              <div className={`md:fixed   ${isSidebarOpen? ' md:left-[200px] md:max-w-[calc(100%-200px)] ':' md:left-[85px] md:max-w-[calc(100%-85px)] max-w-[calc(200%)]'}  transition-all duration-[0.3s]    mt-[57px]  md:mt-[53px] overflow-x-hidden  w-full   z-[10] `}>
                  <div className="md:mx[20px] w-screen p[1.5rem]  overflow-x-hidden md:w-auto no-scrollbar md:overflow-y-auto bg-white md:h-screen   md:p[1rem]">
                        {children}
                  </div>
            </div>



              {/* <div className={`${!isSidebarOpen? ' md:left-[200px] md:max-w-[calc(100%-200px)] ':' md:left-[85px] md:max-w-[calc(100%-85px)] max-w-[calc(200%)]'} mt-[57px]  md:mt-[53px] overflow-x-hidden z-[2000]`}>
                 {children}
  
              </div> */}
        </div>
  
  
        
        
  </div>
  )
}
