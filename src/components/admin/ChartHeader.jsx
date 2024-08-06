import React from 'react'
import {TbCurrencyNaira} from 'react-icons/tb'
export default function ChartHeader({selectPull, setSelectPull, value}) {

    let handleOnclick = (val)=>{
        setSelectPull(val)
        
    }


  return (
    <div className='border- border-red-600 mb-[3rem]'>
    <div className="flex items-center justify-between h-full border-">
        <div className="left">
            <h1 className='flex items-center text-[1rem] '><span className='text-[1.7rem] md:text-[1.8rem]'><TbCurrencyNaira /></span><span className="text-[1.5rem] md:text-[1.4rem] font-[700]"> 
            {
                selectPull == 'W'? value.weekly_amt : 
                selectPull == 'M'? value.monthly_amt :
                selectPull == 'Y'? value.yearly_amt : null
            }
            .00
            </span></h1>
            <p className='text-[0.8rem] pl-[0.2rem] text-gray-500 font-[500]'>Total wages pulled this 
            
            {
                selectPull == 'W'? ' week' : 
                selectPull == 'M'? ' month' :
                selectPull == 'Y'? ' year' : null
            }
            </p>
        </div>
        <div className="right flex flex-wrap gap-x-[0.3rem] text-[0.8rem] items-center h-[1rem] border-">
            <span onClick={()=>handleOnclick('W')}  className={`px-[0.5rem] cursor-pointer rounded-[0.2rem] ${selectPull == 'W'? 'bg-[#FE5E55] text-white ':'border-2 text-black'} '`}>W</span>
            <span onClick={()=>handleOnclick('M')} className={`px-[0.5rem] cursor-pointer rounded-[0.2rem]  ${selectPull == 'M'? 'bg-[#FE5E55] text-white ':'border-2 text-black'} `}>M</span>
            <span onClick={()=>handleOnclick('Y')} className={`px-[0.5rem] cursor-pointer rounded-[0.2rem] ${selectPull == 'Y'? 'bg-[#FE5E55] text-white ':'border-2 text-black'} `}>Y</span>
        </div>
    </div>
</div>
  )
}
