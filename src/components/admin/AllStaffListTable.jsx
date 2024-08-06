// import React, { useState } from 'react'
// import InnerButton from '../shared/InnerButton'
// import { IoAdd } from 'react-icons/io5'
// import OutlineButton from '../shared/OutlineButton'
// import { TbFileExport} from "react-icons/tb";
// import MobileViewAllStaffDataTable from './MobileViewAllStaffDataTable';
// import DesktopViewAllStaffDataTable from './DesktopViewAllStaffDataTable';


// export default function AllStaffListTable({addNewstaffHandler}) {
//   return (
//     <div className='h-[200vh]'>
//             <div className="">
//                 {/* HEADER SECTION */}
//                 <div className="flex flex-wrap  items-center justify-between ">
//                     <p className='font-[600] '>All Staffs</p>
//                     <div className="flex gap-x-[1rem] mt-[0.6rem] sm:mt-0">
//                         <InnerButton onClick={addNewstaffHandler} text="Add new staff" width="w-fit text-[0.85rem]"  icon={<IoAdd />}  />
//                         <OutlineButton text="Export All" style="text-[0.85rem]" icon={<TbFileExport size={20} />} />
//                     </div>
//                 </div>

//                 {/* TABLEDATA */}
//                 <MobileViewAllStaffDataTable />
//                 <DesktopViewAllStaffDataTable />
//             </div>
//     </div>
//   )
// }



