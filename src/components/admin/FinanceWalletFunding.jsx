import React, { useState } from 'react'
import { useGetWalletFunding } from '../../services/admin/queries'
import { TbCurrencyNaira } from 'react-icons/tb'
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter'
import formatDate3 from '../../utilities/formatDate3'
import { GoDotFill } from 'react-icons/go'
import Pagination from '../shared/Pagination'
import NoRecordFound from '../shared/NoRecordFound'

export default function FinanceWalletFunding() {

    let [currentPage, setCurrentPage] = useState(1);

    let {data, isLoading} = useGetWalletFunding()
    if(isLoading){
        return <h1>Loading...</h1>
    }
    let itemsPerPage = 6

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    let paginatedData = data?.results.slice(startIndex, endIndex)
    const totalPages = Math.ceil(data?.results.length / itemsPerPage)

    const handlePageChange = (page)=>{
        setCurrentPage(page)
    }

// console.log(data)
  return (
     <div className='data_table   no-scrollbar    overflow-x-auto scrollbar-hidden-x'>


{
  paginatedData.length > 0 ? 

  <>

<table  className='rounded-md   text-left text-[0.85rem] border-[0.4px]' >
                    <thead>
                            <tr  >
                                
                                <th className='z-[20]'>Action</th>
                                <th className='hidden md:table-cell z-[20]'>Amount</th>
                                <th className='hidden md:table-cell z-[20]'>Date & time</th>
                                {/* <th className='hidden md:table-cell z-[20]'>Staff Code</th> */}
                                <th className='hidden md:table-cell z-[20]'>Status</th>
                            
                                {/* <th className='z-[20]'></th> */}
                        
                            </tr>
                        </thead>
                        <tbody>

                {
                    paginatedData.map((item, index)=>
                    <tr key={index} className='relative z-[10]  hover:bg-[--grey-color] rounded-md hover:shadow-[2px_2px_1px_2px_rgba(0,0,0,1)] '>
                             <td  className='hidden md:table-cell'> {capitalizeFirstLetter(item.type) }</td>
                             <td  className='hidden md:table-cell'> <p className="flex  items-center"><span ><TbCurrencyNaira /></span>{item.amount? item.amount : 0}.00</p></td>
                             <td  className='hidden md:table-cell'> {formatDate3(item.created_at) }</td>
                             <td  className='hidden md:table-cell'>
                           <div >
                           {
                           item.status === "pending" && <span  className=' text-red-600 flex  items-center'><span><GoDotFill size={10} /></span>{capitalizeFirstLetter( item.status)}</span>
                         }
                         {
                           item.status === "success" &&  <span className='  text-green-600 flex  items-center'><span><GoDotFill size={10} /></span> {capitalizeFirstLetter( item.status)}</span>
                         }
                        
                           </div>
                         </td>
                             {/* <td  className='hidden md:table-cell'> {item.code}</td> */}
                    </tr>
                    )
                }
     
         </tbody>

                    </table>

                    
    <div className="px-[0.8rem] sm:px-[3rem] lg:px-[0rem] mt-[2rem]">
       <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
              />
      </div>
    
  
  </>

  :

  <div className="p-[1rem] border-[1px] rounded-[4px] my-[2rem] overflow-hidden">
  <NoRecordFound
title="No recent wages pulled yet"
label="Oblige your employees to download WagePull app to access their salary in-advance"

/>

</div>
}

                    
</div>
  )
}
