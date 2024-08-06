import React from 'react'

export default function Pagination({currentPage, totalPages, onPageChange}) {
    const pages = [];

    for(let i = 1; i<=totalPages; i++){
            pages.push(i);
    }
  return (
    <ul className='w-full flex items-center'>

            {
                pages.map((page,i)=>(
                <React.Fragment key={page}>
                   {
                    page !== totalPages?
                    
                    <li onClick={()=>onPageChange(page)} className={`text-[0.85rem] inline-block ${i==0?'ml-0':'ml-[0.6rem]'}  border-[1px] border-[#374151] px-[0.5rem] cursor-pointer rounded-[5px] ${page === currentPage? 'bg-[var(--secondary-color)] text-white border-none':'' }`} >{page}</li>
                    :

                    <><span className='ml-[0.4rem]'>{page === 1? null: <>...</>}</span><li  onClick={()=>onPageChange(page)} className={`text-[0.85rem] inline-block ml-[0.4rem] border-[1px] border-[#374151] px-[0.5rem] cursor-pointer rounded-[5px] ${page === currentPage? 'bg-[var(--secondary-color)] text-white border-none':'' }`} >{page}</li></>
                   } 
                
                 </React.Fragment >
                ))
            }
          
               
    </ul>
  )
}
