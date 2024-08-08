import React, { useState } from 'react'
import NoRecordFound from '../shared/NoRecordFound';
import ChartContent from './ChartContent';
import { LiaTrashAlt, LiaUserAltSlashSolid } from 'react-icons/lia';
import { IoMdArrowDropdown } from 'react-icons/io';
import { TbCurrencyNaira, TbFileExport } from 'react-icons/tb';
import OutlineButton from '../shared/OutlineButton';
import TableMenuList from '../shared/TableMenuList';
import { CiUser } from 'react-icons/ci';
import { IoCardOutline, IoTrashOutline } from 'react-icons/io5';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Checkbox from '../shared/Checkbox';
import { userTransactionData } from '../../utilities/admin/Data';

import { GoDotFill } from 'react-icons/go';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import Pagination from '../shared/Pagination';
import arrayToObject from '../../utilities/arrayToObject';
import { useQueryClient  } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';
import { useGetSingleEmployeePayrollHistory, useGetSingleEmployeePayrollHistoryDetails } from '../../services/admin/queries';
import formatDate2 from '../../utilities/formatDate2';
import Modals from '../shared/Modals';
import { IoEyeOutline } from "react-icons/io5";


export default function StaffPayrollHistory() {

  let {staffId} = useParams()
  let {data:response, isLoading, isError, error}= useGetSingleEmployeePayrollHistory(staffId)

  

    if(isLoading){
      return <h1>Loading...</h1>
    }
    if(isError){
      return <h1>{error.message}</h1>
    }
  

  // const {data:response, isLoading, isError} = useQuery({
  //   queryKey:[staffId],
  //    queryFn:()=>getEmployeePayrollHistory(staffId),
  //     staleTime:10,
  //     cacheTimeout:10
     
    
  //   })


 


  return (
    <div className='pb-[2rem]'>

        {
          response.results.length === 0?
          <div className="border-[1px] rounded-[4px]">
            <NoRecordFound 
              title="No transaction yet"
              label="Oblige your employees to download WagePull app to access their salary in-advance"

            />
        </div> 
          :
        <>

    

        {/* Table Section */}

        <div className="mt-[2rem]">
          <TransactionTable data={response} />
        </div>
        
        </>
        }


    </div>
  )
}



function TransactionTable({data:result}){
  const queryClient = useQueryClient ()
  let {staffId} = useParams()

  queryClient.invalidateQueries({ queryKey: ["getSingleDetailsEmployeeData"+staffId] });
  queryClient.invalidateQueries({ queryKey: ["getSingleEmployeePayrollHistoryData"+staffId] });
  const [showMenu, setShowMenu] = useState({
    isShow:false,
    text:'All transaction'
  })
 const [data, setData]=useState(result)
 



  const handleTransaction = (type)=>{
    setShowMenu({
      ...showMenu,
      text: type,
      isShow:false
    })

    if(type === 'All transactions'){
      return 'transactionFunc'
    }
    if(type === 'Wage streams'){
      return 'transactionFunc'
    }
  }
  return(
    <div className="">
          {/* Header Section */}
        

          {/* Table Data */}
          <div className="mt-[1rem]">
          <TableData data={data?.results} setData={setData} itemsPerPage={10} />

          </div>
    </div>
  )
}



function TableData({data, setData, itemsPerPage}){
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); //For checbox



  let [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  let paginatedData = data.slice(startIndex, endIndex)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handlePageChange = (page)=>{
    setCurrentPage(page)
}
// MENU LIST CONFIGURATION
const handleRowClick = (userId) => {
  if (selectedUser?.code === userId) {
    setSelectedUser(null); // Hide details if the same row is clicked again
  } else {
    setSelectedUser(arrayToObject(data.filter((item)=>item.code === userId)));
  
  }
};



    let {staffId} = useParams()
    let [payrollCode, setPayrollCode] = useState()

    
    // let res ={}
  const handleDownloadReceipt = (payCode)=>{
    setPayrollCode(payCode)
    // setIsOpen(true)

    console.log(res)
 
    // setSelectedUser(null)
    // console.log(userId)
    // API Call
  }


  let {data:res, isLoading} = useGetSingleEmployeePayrollHistoryDetails(staffId, payrollCode);

  if(isLoading){
    return <h1>Loading...</h1>
  }


  return(
    <div className='   no-scrollbar    overflow-x-auto scrollbar-hidden-x'>
                 {/* MODAL START */} 
     <Modals setIsopens={setIsOpen} isOpens={isOpen} title="Payroll detail">
      <div className=" bg-[var(--primary-color)] text-white rounded-[4px] flex flex-col items-center py-[1rem]">
            {/* <h2 className='font-[700]  flex items-center justify-center text-[1.8rem]'><span className="text-[2.2rem]"><TbCurrencyNaira /></span>{res.earn_wages}.00</h2> */}
            <p className="text-[0.88rem]">Wages pulled from 01 Sep to 18 Sep</p>
      </div>

      <div className="py-[1rem] px-[1rem] bg-[#F5F5F5] text-black rounded-[4px] ">
          <p className='flex items-start justify-between gap-x-[0.7rem]'>
            {/* <span className="text-[var(--secondary-color)] block text-[1.2rem] justify-between"><RiErrorWarningLine /></span> */}
            <span className=' block text-[0.85rem]'>
            Note! Total wage pulled include salaries taken in-advance by 24 staffs from 01 Sep to 18 Sep, 2023.
            </span>
          </p>

          <h5 className='mt-[1.6rem]'>
            <p className='flex text-[0.85rem] mb-[1rem]'><span className="max-w-[180px] block w-full text-[#6B7280]">Total wages pulled:</span> <span className="flex items-center font-[600]"><TbCurrencyNaira /> 700,000</span> <span className="font-[600]">.00</span></p>

          </h5>
      </div>

      <div className="py-[1rem] px-[1rem] bg-[#FDEAEA] text-black rounded-[4px]">
        <p className='font-[600] text-[0.85rem]'>Not enough fund in your wallet</p>
        <p className=" text-[0.85rem] mt-[0.6rem]">
        Topup current balance of <span className='font-[600]'>₦40,000.00</span>   in your wallet before you make payment. &nbsp;
        <a href="#"  className="text-[var(--secondary-color)] underline">Topup wallet fund</a> 
        </p>
      </div>

      {/* <div className="">
        <InnerButton text="Make payment now" width="flex justify-center w-full" />
      </div> */}

    </Modals>
                
                
                
                
    <table  className='rounded-md   text-left text-[0.85rem] border-[0.4px]' >
  <thead   >
     <tr  >
         {/* <th className='z-[20] md:hidden'><Checkbox name="selectAll" onChange={(e)=>handleSelectAll(e,data,setSelectAll,setData)} /></th> */}
         <th className='z-[20]'>Earned wages</th>
         <th className='z-[20]'>Bonus earned</th>
         <th className='hidden md:table-cell z-[20]'>Date</th>
         <th className=' md:table-cell z-[20]'>Deduction</th>
         <th className='hidden md:table-cell z-[20]'>Wage pulled</th>
         <th className='hidden md:table-cell z-[20]'>Net salary</th>
         <th className='hidden md:table-cell z-[20]'>Status</th>
         {/* <th className='hidden md:table-cell z-[20]'>Action</th> */}
         <th className=' md:hidden z-[20]'></th>
     </tr>
 </thead>
 <tbody>
     {
    paginatedData.map((item,i)=>{
             return(
          <React.Fragment key={i}>
     <tr    className='relative z-[10]   hover:bg-[--grey-color] rounded-md  '>
             {/* <td className='md:hidden '><Checkbox id={item.id} checked={item.isChecked} onChange={()=>handleSingleCheckboxChange(item.id, data, setSelectAll,setData )} /></td> */}
             <td >
             <h3 className='font-[700] flex items-center'><span><TbCurrencyNaira /></span>{item.earn_wages? item.earn_wages: 0}.00</h3>
             </td>

                 {/*For Mobile Starts */}

             <td className=" md:hidden" >
                
                <h3 className='font-[700] flex items-center'><span><TbCurrencyNaira /></span>{item.total_bonus?item.total_bonus:0}.00</h3>
                    
                    
            </td>

          
             <td className=" md:hidden" >
                
                <h3 className='font-[700] flex items-center'><span><TbCurrencyNaira /></span>{item.total_deduction?item.total_deduction:0}.00</h3>

                <span className={`${item.status === "paid" ? 'text-green-600':'text-red-600'}   flex  items-center`}><span><GoDotFill size={10} /></span> {item.status === "paid" ? 'Paid': 'Unpaid'}</span>
                    
                    
            </td>

           {/*For Mobile ends */}



             <td className="hidden md:table-cell" >
                
             <h3 className='font-[700] flex items-center'><span><TbCurrencyNaira /></span>{item.total_deduction?item.total_deduction:0}.00</h3>
                 
                 
                </td>
 


             <td className="hidden md:table-cell" >
                
             <h3 className='font-[700] flex items-center'>{formatDate2(item.created_at)}</h3>
                 
                 
                </td>
             <td className="hidden md:table-cell" >
                
             <h3 className='font-[700] flex items-center'><span><TbCurrencyNaira /></span>{item.total_deduction?item.total_deduction:0}.00</h3>
                 
                 
                </td>
             <td className="hidden md:table-cell" >
                
             <h3 className='font-[700] flex items-center'><span><TbCurrencyNaira /></span>{item.wage_pulled?item.wage_pulled:0}.00</h3>
                 
                 
                </td>
             <td className="hidden md:table-cell" >
                
             <h3 className='font-[700] flex items-center'><span><TbCurrencyNaira /></span>{item.payable_net_wages?item.payable_net_wages:0}.00</h3>
                 
                 
                </td>
             <td className="hidden md:table-cell" >
                
             <span className={`${item.status === "paid" ? 'text-green-600':'text-red-600'}   flex  items-center`}><span><GoDotFill size={10} /></span> {item.status === "paid" ? 'Paid': 'Unpaid'}</span>
                 
                 
                </td>
             
           
            
                {/* <td className='relative ' > */}
       
                  {/* <OutlineButton text="View" icon={<IoEyeOutline />} onClick={()=>handleDownloadReceipt(item.code)} style="hidden md:flex" type="button" /> */}
                 {/* <span onClick={() => handleRowClick(item.id)} className='cursor-pointer table_row hidden md:block'><BiDotsVerticalRounded /></span> */}
                 {/* <span onClick={() => handleRowClick(item.code)} className='block md:hidden text-gray-600'><IoMdArrowDropdown /></span> */}
             
               
             {/* </td> */}

     </tr>
{/* Menu Action */}
{selectedUser?.code === item.code && (
        
        <tr  className='relative top-[-1px] bg-[var(--grey-color)]   hover:bg-[var(--grey-color)]  '>
        
      
        
        {/* MOBILE VIEW */}
        <td colSpan="4"  className='pt-[2rem] pb-[3rem] px-[2rem] md:hidden'>
        
        <div className="flex justify-between  flex-wrap  gap-y-[1rem]">
        <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Wage pulled:</h5>
        <p className='flex items-center flex-[0_0_50%] font-[600]'>
                    <span><TbCurrencyNaira /></span>
                    {selectedUser.wage_pulled? selectedUser.wage_pulled : 0}
                    .00
        </p>
    
        <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Net salary:</h5>
        <p className='flex items-center flex-[0_0_50%] font-[600]'>
                    <span><TbCurrencyNaira /></span>
                    {selectedUser.payable_net_wages? selectedUser.payable_net_wages : 0}
                    .00
        </p>
        <h5 className='flex-[0_0_50%] font-[580] text-[#6B7280]'>Date:</h5>
        <p className='flex-[0_0_50%] font-[600]'>{formatDate2(selectedUser.created_at)}</p>
      
        
        </div>
        <div className=" mt-[2rem] flex  flex-wrap gap-[1rem]">
        {/* <OutlineButton onClick={()=>handleDownloadReceipt(item.code)} type="button"   text="View" icon={<IoEyeOutline />} /> */}
        {/* <OutlineButton onClick={()=>handleActionType('delete', item.id)} text="Delete" icon={<RiDeleteBin6Line />} style="bg-[#FDEAEA] text-[#FE5E55] border-[#FE5E55] border-[1px]" /> */}
        {/* <OutlineButton onClick={()=>handleActionType('deactivate', item.id)} text="Deactivate account" icon={<LiaUserAltSlashSolid />} /> */}
        </div>
        
        
        </td>
        </tr>
        )}

</React.Fragment>
     
             )
         })
     }
     </tbody>
 
</table>


<div className="mt-[2rem]">
          <Pagination
                         currentPage={currentPage}
                         totalPages={totalPages}
                         onPageChange={handlePageChange}
                 />
         </div>
</div>
  )
}
