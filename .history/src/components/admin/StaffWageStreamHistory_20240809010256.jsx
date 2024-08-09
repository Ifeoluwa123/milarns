import React, { useState } from 'react'
import Checkbox from '../shared/Checkbox'
import { TbCurrencyNaira } from 'react-icons/tb'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { IoMdArrowDropdown } from 'react-icons/io'
import { GoDotFill } from 'react-icons/go'
import { useGetSingleEmployeeWageStreamHistory } from '../../services/admin/queries'
import { useParams } from 'react-router-dom'
import Pagination from '../shared/Pagination'
import getRandomBackroundColor from '../../utilities/getRandomBackroundColor'
import formatDate2 from '../../utilities/formatDate2'
import NoRecordFound from '../shared/NoRecordFound'
import arrayToObject from '../../utilities/arrayToObject'
import OutlineButton from '../shared/OutlineButton'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { LiaUserAltSlashSolid } from 'react-icons/lia'
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter'
import formatDate from '../../utilities/formatDate'

export default function StaffWageStreamHistory() {


    const handlePageChange = (page)=>{
        setCurrentPage(page)
    }
    let  itemsPerPage = 6
    let {staffId} = useParams()
    let [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);


    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
   

    let {data, isLoading, isError, error} = useGetSingleEmployeeWageStreamHistory(staffId)
    if(isLoading) {
        return <h2>Loading...</h2>
        

       
    }

    
    if(isError){
        return <h1>{error.message}</h1>
    }

    let paginatedData = data.results.slice(startIndex, endIndex)
    const totalPages = Math.ceil(data.results.length / itemsPerPage)
 
 


 // MENU LIST CONFIGURATION
   const handleRowClick = (userCode) => {
    if (selectedUser?.code === userCode) {
      setSelectedUser(null); // Hide details if the same row is clicked again
    } else {
      setSelectedUser(arrayToObject(data.results.filter((item)=>item.code === userCode)));
    
    }
  };


  return (

<>
{
        data.results.length > 0 ?
        <div className='data_table   no-scrollbar mb-[14rem]   overflow-x-auto scrollbar-hidden-x'>
         <table  className='rounded-md   text-left text-[0.85rem] border-[0.4px]' >
         <thead   >
                 <tr  >
                     
             
                     <th className=' md:table-cell z-[20]'>Amount</th>
                     <th className='hidden md:table-cell z-[20]'>Code</th>
                     <th className=' md:table-cell z-[20]'>Date</th>
                     <th className='hidden md:table-cell z-[20]'>Wage pulled</th>
                     <th className='hidden md:table-cell z-[20]'>Hour rate</th>
                     <th className='hidden md:table-cell z-[20]'>Work hour</th>
                    <th className=' md:table-cell z-[20]'>Status</th> 
                    {/* <th className='z-[20]'></th>  */}
                 </tr>
             </thead>


             <tbody>

             {
                paginatedData.map((item, index)=>
                <>
                 <tr key={index} className='relative z-[10]  hover:bg-[--grey-color] rounded-md hover:shadow-[2px_2px_1px_2px_rgba(0,0,0,1)] '>
                 <td  className=' md:table-cell'>
                    <p className='flex items-center font-[600]'>
                    <span className='text-[1.3rem]'><TbCurrencyNaira /></span>
                    {/* {item.amount} */}
                    {item.amount ? item?.amount : 0.00}
                    

                    
                    </p>
                </td>
                <td  className='hidden md:table-cell'>{item.code}</td>
                <td  className=' md:table-cell'>{formatDate(item.date_created) }</td>
                <td  className='hidden md:table-cell'>

                <p className='flex items-center font-[600]'>
                    <span className='text-[1.3rem]'><TbCurrencyNaira /></span>
                    {/* {item.amount} */}
                    {item.wage_pull_amount ? item.wage_pull_amount : 0.00}
                    

                    
                    </p>
                    
                   
                    </td>
                    <td  className='hidden md:table-cell'>{item.wage_rate }</td>
                    <td  className='hidden md:table-cell'>{item.work_hour==0  ? item.work_hour+" hour" : item.work_hour == 1 ? item.work_hour+" hour" :   item.work_hour+" hours" }</td>
                    <td className=' md:table-cell'>
                        {
                            item.status === 'success'? 
                        
                            <span className='text-green-600 flex  items-center'><span><GoDotFill size={10} /></span> Success</span>:
                            <span  className='text-red-600 flex  items-center'><span><GoDotFill size={10} /></span>Failed</span>
                        }
                        
                        
                    </td>
                    <td className='relative ' >
                        {/* <span onClick={() => handleRowClick(item.code)} className='cursor-pointer table_row hidden md:block'><BiDotsVerticalRounded /></span> */}
                        <span onClick={() => handleRowClick(item.code)} className='block md:hidden text-gray-600'><IoMdArrowDropdown /></span>
                    
                    
                    </td>
                 </tr>

                 {
    selectedUser?.code === item.code && 
                    
                    <tr  className='relative top-[-1px] bg-[var(--grey-color)]   hover:bg-[var(--grey-color)]  '>
                         {/* DESKTOP VIEW */}
                        {/* <td colSpan="4"   className="mt-[-15px] hidden md:block  p-0 z-[50]   rounded-md overflow-hidden absolute  md:right-[2%] md:top-[20%] bg-[var(--grey-color)]  w-fit  shadow-[2px_2px_1px_2px_rgba(0,0,0,1)]">
                            
                            <div className="z-[100] h-full border-2 hidden md:block">
                            <TableMenuList id={item.code} items={[
                                {icon:<FiEdit2 />,  text: "Edit Profile", type:"internal_link", path:`${item.code}` },     
                                {icon:<LiaUserAltSlashSolid />, text: "Deactivate account", actionHandler:handleActionType , actionType:"deactivate"},      
                                {icon:<CiUser/>, text: "Delete account", actionHandler:handleActionType , actionType:"delete"}      
                            ]} 
                            style=" px-0 w-[300]"  />
                            </div>
                            
                            
                            </td> */}



                            {/* MOBILE VIEW */}
    <td colSpan="4"  className='pt-[2rem] px-[2rem] md:hidden'>

            <div className="flex justify-between  flex-wrap  gap-y-[1rem]">
            <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Code:</h5>
            <p className='flex-[0_0_50%] font-[600]'>{selectedUser.code}</p>
            <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Wage pulled:</h5>
            <p className='flex items-center flex-[0_0_50%] font-[600]'>
                                <span><TbCurrencyNaira /></span>
                                {item?.wage_pull_amount? item?.wage_pull_amount : 0}
                                .00
            </p>
            <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Wage rate:</h5>
            <p className='flex-[0_0_50%] font-[600]'>{selectedUser.wage_rate}</p>
            <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Wage hour:</h5>
            <p className='flex-[0_0_50%] font-[600]'>{selectedUser.work_hour }</p>

          
                            

            </div>
            {/* <div className=" mt-[2rem] flex  flex-wrap gap-[1rem]">
                <OutlineButton type="Link"  path={`${item.code}`} text="Edit profile" icon={<FiEdit2 />} />
                <OutlineButton onClick={()=>handleActionType('delete', item.code)} text="Delete" icon={<RiDeleteBin6Line />} style="bg-[#FDEAEA] text-[#FE5E55] border-[#FE5E55] border-[1px]" />
                <OutlineButton onClick={()=>handleActionType('deactivate', item.code)} text="Deactivate account" icon={<LiaUserAltSlashSolid />} />
            </div> */}
            {/* <p>{selectedUser.name}</p>
            <p>{selectedUser.email}</p> */}

        </td>
                    </tr>
    

    }
                </>
            
            )

             }

             </tbody>

            
         </table>

         <div className="mt-[1rem]">
         <Pagination
                         currentPage={currentPage}
                         totalPages={totalPages}
                         onPageChange={handlePageChange}
                 />
         </div>
    </div>
        :

        <div className="p-[1rem] border-[1px] rounded-[4px] mb-[5rem] overflow-hidden">
                    <NoRecordFound
                  title="No recent wages pulled yet"
                  label="Oblige your employees to download WagePull app to access their salary in-advance"
                
                />

                  </div>
    }
   

</>

    
  )
}
