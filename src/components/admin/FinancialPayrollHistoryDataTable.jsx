import React, { useState } from 'react'
import Pagination from '../shared/Pagination'
import OutlineButton from '../shared/OutlineButton';
import Checkbox from '../shared/Checkbox';
import { TbCurrencyNaira, TbFileExport } from 'react-icons/tb';
import { GoDotFill } from 'react-icons/go';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import NoRecordFound from '../shared/NoRecordFound';

export default function FinancialPayrollHistoryDataTable({data,setData, itemsPerPage,addNewstaffHandler}) {
  

    const [activeTab, setActiveTab] = useState(0);
   
 

    const tabButton = [
        {
          label:'All ',
          activeIndex:0,
        },
        {
          label:'Unpaid salaries',
          activeIndex:1,
        }
      
    
      ]

  return (
    <div className="pb-[5rem] ">
       
    
    {/* HEADER SECTION */}
        <div className="flex flex-wrap  items-center justify-between mb-[2rem] ">
                <ul className='inline-block'>
                    {
                        tabButton.map(({label,activeIndex },index)=>{
                            return(
                                <li onClick={()=>setActiveTab(index)} className={`text-[0.85rem] whitespace-nowrap  font-[600]  ${activeIndex == activeTab && 'text-[--secondary-color] border-b-[1px] border-[--secondary-color]' } inline mr-[2rem] hover:cursor-pointer`}>{label}</li>
                            )
                        })
                    }
                </ul>
       </div>
   
    {/*ALL TABLEDATA */}
    {

        activeTab == 0 && <AllDataTable data={data} itemsPerPage={itemsPerPage} addNewstaffHandler={addNewstaffHandler} />
       
    }
    {

        activeTab == 1 &&<div className="p-[1rem] border-[1px] mt-[1rem] rounded-[4px] my-[2rem] overflow-hidden"> <NoRecordFound
        title="No Wallet fund yet"
        label="Click on the below button to onboard staff on payroll list."
        
      
       />
       </div>
    
       
    }
   
 
    {/* <div className="px-[0.8rem] relative sm:px-[3rem] lg:px-[2rem]   flex  flex-col gap-y-[1rem] sm:flex-row sm:items-center sm:justify-between mt-[4rem] pr-[1.8rem] " > */}



        
        
               
        
    </div>
  )
}




function AllDataTable({data,setData, itemsPerPage,addNewstaffHandler}){

    const [selectedUser, setSelectedUser] = useState(null);
    let [currentPage, setCurrentPage] = useState(1);
    let [selectedRows, setSelectedRows] = useState([]);
    const [deleteRecord, setDeleteRecord] = useState(false)
    const [deactivateRecord, setDeactivateRecord] = useState(false)
    const [selectAll, setSelectAll] = useState(false); //For checbox
    const [bulkDelete, setBulkDelete] = useState(false)


    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    let paginatedData = data.slice(startIndex, endIndex)
    const totalPages = Math.ceil(data.length / itemsPerPage)


    const handlePageChange = (page)=>{
        setCurrentPage(page)
    }

    return(
        <>
        
        <div className='data_table   no-scrollbar    overflow-x-auto scrollbar-hidden-x'>
               
               
               
               
               
        <table  className='rounded-md   text-left text-[0.85rem] border-[0.4px]' >
      <thead   >
         <tr  >
             <th className='z-[20]'><Checkbox name="selectAll" onChange={(e)=>handleSelectAll(e,data,setSelectAll,setData)} /></th>
             <th className='z-[20]'>Name</th>
             <th className='hidden md:table-cell z-[20]'>Earned wages</th>
             <th className='hidden md:table-cell z-[20]'>Bonus earned</th>
             <th className='hidden md:table-cell z-[20]'>Deduction</th>
             <th className='hidden md:table-cell z-[20]'>Wage pulled</th>
             <th className=' z-[20]'>Net salary</th>
             <th className='hidden md:table-cell z-[20]'>Status</th>
             <th className='z-[20]'></th>
         </tr>
     </thead>
     <tbody>
         {
        paginatedData.map((item,i)=>{
                 return(
              <React.Fragment key={i}>
         <tr    className='relative z-[10]  hover:bg-[--grey-color] rounded-md hover:shadow-[2px_2px_1px_2px_rgba(0,0,0,1)] '>
                 <td ><Checkbox id={item.id} checked={item.isChecked} onChange={()=>handleSingleCheckboxChange(item.id, data, setSelectAll,setData )} /></td>
                 <td className='flex  pl-0 ml-0 items-center gap-x-0 md:gap-x-[1rem] sm:min-w-[200px] min-w-fit'>
                 
                     <div >
                     <h3 className='font-[700]'>{item.name}</h3>
                     <p className='text-gray-400'>{item.date}</p>
                     </div>
                 
                 </td>
                
                 <td  className='hidden md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.wages? item.wages : 0}.00</p></td>
                 <td  className='hidden md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.bonus? item.bonus : 0}.00</p></td>
                 <td className='hidden md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.deduction? item.deduction : 0}.00</p></td>
                 <td className='hidden md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.wagepulled? item.wagepulled : 0}.00</p></td>
                 <td className='table-cell'>
                 <p className=" hidden md:flex  items-center"><span ><TbCurrencyNaira /></span>{item.netSalary? item.netSalary : 0}.00</p>
                 

                  <div className="md:hidden ">
                  <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.netSalary? item.netSalary : 0}.00</p>
              
                    <p className='flex justify-end w-fit '>
                    {
                         item.status? 
                         
                         <span className='  text-green-600 flex  items-center'><span><GoDotFill size={10} /></span> Paid</span>:
                         <span  className=' text-red-600 flex  items-center'><span><GoDotFill size={10} /></span>Unpaid</span>
                     }
                    </p>
                  </div>
                 
                 </td>
                 
                 <td className='hidden md:table-cell'>
                     {
                         item.status? 
                         <span className='  text-green-600 md:flex  items-center'><span><GoDotFill size={10} /></span> Paid</span>:
                         <span  className=' text-red-600 md:flex  items-center'><span><GoDotFill size={10} /></span>Unpaid</span>
                     }
                     
                     
                    </td>
                    <td className='relative ' >
                     <span onClick={() => handleRowClick(item.id)} className='cursor-pointer table_row hidden md:block'><BiDotsVerticalRounded /></span>
                     <span onClick={() => handleRowClick(item.id)} className='block md:hidden text-gray-600'><IoMdArrowDropdown /></span>
                 
                   
                 </td>
         </tr>
{selectedUser?.id === item.id && (
            
<tr  className='relative top-[-1px] bg-[var(--grey-color)]   hover:bg-[var(--grey-color)]  '>

{/* DESKTOP VIEW */}
<td colSpan="4"   className="mt-[-15px] hidden md:block  p-0 z-[50]   rounded-md overflow-hidden absolute  md:right-[2%] md:top-[20%] bg-[var(--grey-color)]  w-fit  shadow-[2px_2px_1px_2px_rgba(0,0,0,1)]">

<div className="z-[100] h-full border-2 hidden md:block">
<TableMenuList id={item.id} items={[
{icon:<IoTrashOutline/>, text: "Delete", actionHandler:handleActionType , actionType:"delete"},   
{icon:<TbFileExport />,  text: "Export as CSV", type:"external_link", target:"_blank", path:`https://wagepull.com` },     
// {icon:<TbFileExport />,  text: "Add bonus pay", type:"internal_link", path:`add-bonus` },       
// {icon:<TbFileExport />,  text: "Add deduction", type:"internal_link", path:`add-deduction` },     
// {icon:<LiaUserAltSlashSolid />, text: "Deactivate account", actionHandler:handleActionType , actionType:"deactivate"},      
// {icon:<CiUser/>, text: "Delete account", actionHandler:handleActionType , actionType:"delete"}      
]} 
style=" px-0 w-[300]"  />
</div>


</td>

{/* MOBILE VIEW */}
<td colSpan="4"  className='pt-[2rem] px-[2rem] md:hidden'>

<div className="flex justify-between  flex-wrap  gap-y-[1rem]">
<h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Earned wages:</h5>
<p className="flex flex-[0_0_50%] font-[600]  items-center"><span ><TbCurrencyNaira /></span>{selectedUser.wages? selectedUser.wages : 0}.00</p>

<h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Bonus earned:</h5>
<p className="flex flex-[0_0_50%] font-[600]  items-center"><span ><TbCurrencyNaira /></span>{selectedUser.bonus? selectedUser.bonus : 0}.00</p>

<h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Deduction:</h5>
<p className="flex flex-[0_0_50%] font-[600]  items-center"><span ><TbCurrencyNaira /></span>{selectedUser.deduction? selectedUser.deduction : 0}.00</p>
<h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Wages pulled:</h5>
<p className="flex flex-[0_0_50%] font-[600]  items-center"><span ><TbCurrencyNaira /></span>{selectedUser.wagePulled? selectedUser.wagePulled : 0}.00</p>

</div>
<div className=" mt-[2rem] flex  flex-wrap gap-[1rem]">
  <OutlineButton onClick={()=>handleActionType('delete', item.id)} text="Delete" icon={<RiDeleteBin6Line />} style="bg-[#FDEAEA] text-[#FE5E55] border-[#FE5E55] border-[1px]" />
  <OutlineButton type="external_link"  path='https://wagepull.com' text="Export as CSV" icon={<TbFileExport />} />
  {/* <OutlineButton onClick={()=>handleActionType('deactivate', item.id)} text="Deactivate account" icon={<LiaUserAltSlashSolid />} /> */}
</div>
{/* <p>{selectedUser.name}</p>
<p>{selectedUser.email}</p> */}

</td>
</tr>
)}

</React.Fragment>
         
                 )
             })
         }
         </tbody>
     
 </table>


</div>
<div className="px-[0.8rem] sm:px-[3rem] lg:px-[2rem] mt-[2rem]">
         <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                />
        </div>
        </>
    )
}