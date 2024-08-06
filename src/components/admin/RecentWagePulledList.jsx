import React from 'react'
import { Link } from 'react-router-dom'

import { GoDotFill } from "react-icons/go";
import { RecentWageData } from '../../utilities/admin/Data';
import getRandomBackroundColor from '../../utilities/getRandomBackroundColor';
import { TbCurrencyNaira } from 'react-icons/tb';


import formatDate2 from '../../utilities/formatDate2';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';

export default function RecentWagePulledList({data}) {
  return (
    <div className='p-[1rem] border-[1px] rounded-[4px] my-[2rem] overflow-hidden'>
        <RecentWagePulledHeader />
        <RecentWageList data={data} />

    </div>
  )
}

function RecentWagePulledHeader(){
    return(
        <div className="flex justify-between ">
        <h4 className='font-[600] text-[1rem]'>Recent Wage pulled</h4>
        <Link to="/wages" className='text-[0.95rem] text-[var(--secondary-color)] underline'>View all</Link>
        </div>
    )
   
}
function RecentWageList({data}){

    return(
        <div className="flex justify-between items-center ">
            <ul className='mt-[3rem] w-full block no-scrollbar px-[1rem] md:grid md:px-[1rem] overflow-x-scroll '>

                {
                   data.map((item,i)=>{
                        return(
                            <li key={i} className='flex hover:bg-[--grey-color] rounded-md hover:shadow-[1.5px_1.5px_1px_1px_rgba(0,0,0,1)] gap-x-[1rem] py-[1rem] border- items-center justify-between  whitespace-nowrap w-fit lg:w-full  px-[1rem]'>
        
                            {/* <div className="w-[35px] hidden md:block">
                                <img src={item.avatar} className='block w-full object-contain' alt="" />
                            </div> */}

{
                            item.staff.avatar == ''?

                            <div className="">
                                  <p style={{backgroundColor:getRandomBackroundColor()}} className={` w-[40px] mr-[0.7rem] md:mr-0 h-[34px] flex justify-center items-center rounded-full text-white`}>
                                        
                                        {item.staff.last_name.toUpperCase().charAt(0)}
                                            
                                       
                                        
                                        </p>
                            </div>
                            :
                            <div className="w-[20px] h-[25px] hidden md:block">
                            <img src={item.staff.avatar} className='block w-full object-contain rounded-full w-[100%]' alt="" />
                        </div>

                           }
                            {/* <div className="flex gap-x-[0.2rem]">
                                <h4 className='whitespace-nowrap text-[0.8rem]'>{item.name}</h4>
                                <p className=' text-[0.8rem]'>{item.amount}</p>
                                <p className='whitespace-nowrap text-[0.8rem]'>{item.date}</p>
                            </div> */}
                            <h4 className='whitespace-nowrap text-[0.8rem] min-w-[150px] md:min-w-[300px] font-[700]'>{item.staff.first_name+" "+item.staff.last_name}</h4>

                            <div className="leading-[0.85rem] md:min-w-[150px] md:hidden">
                                    <h5 className='text-[0.85rem] font-[600]  '> <span><TbCurrencyNaira /></span> {item.amount}</h5>
                                    
                                    <p className={`text-[0.8rem] md:hidden flex items-center  ${item.status == 'Successful'? 'text-[var(--green-color)] ':'text-[var(--secondary-color)]'}`}><span><GoDotFill size={10} /></span>{item.status}</p>
                                </div>
                            <p className='hidden  text-[0.8rem] min-w-[100px] md:min-w-[150px] font-[700] md:flex items-center'> <span><TbCurrencyNaira /></span> {item.amount}</p>
                            <p className='hidden md:block whitespace-nowrap  text-[0.8rem] min-w-[200px]  font-[700]'>{formatDate2(item.created_at) }</p>
                            {/* <p className='hidden md:block whitespace-nowrap  text-[0.8rem] min-w-[200px]  font-[700]'>{item.date }</p> */}
                            <p className={`text-[0.8rem] hidden  md:flex items-center  ${item.status == 'success'? 'text-[var(--green-color)] ':'text-[var(--secondary-color)]'}`}><span><GoDotFill size={10} /></span>{capitalizeFirstLetter(item.status) }</p>
        
                        </li>
                        )
                    })
                }
               
            </ul>
        </div>
    )
   
}
