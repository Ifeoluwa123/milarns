import React from 'react'
import { TbCurrencyNaira } from 'react-icons/tb'
import InnerButton from './InnerButton'
import { useNavigate } from 'react-router-dom'

export default function PinkPayroll({type, text, notificationText,handleOnclick,  amount, btnText, path }) {
    const navigate  = useNavigate()
  return (
            <div className="bg-[#FDEAEA] border-[E5E7EB] border-[1px] bg-[url('../assets/images/bg-vector.png')] h-fit mt-[1rem] rounded-[4px] px-[0.85rem] py-[1rem] ">
                <p className='text-[0.85rem]'>{text}</p>
                <h3 className='flex items-center text-[1.7rem] my-[0.5rem] font-[600] '><span className='text-[2.2rem]'><TbCurrencyNaira  /></span> {amount? amount : 0}.00</h3>
                {notificationText && <p className={` ${type == 'pink'? 'bg-[#FAD5D5] text-[#E72D2D]' : type == 'green'? 'bg-[#DEFCE9] text-[#21C45D]': null  } w-fit p-[4px_10px_4px_10px] font-[600] text-[0.85rem] rounded-[4px]`}>{notificationText}</p>}
               
               <div className=" mt-[1.5rem]">
              {handleOnclick?<InnerButton text={btnText} width="flex justify-center w-full" onClick={handleOnclick} />:
              btnText? <InnerButton text={btnText} width="flex justify-center w-full" onClick={()=>navigate(path)} /> : null
              }  
               </div>
            </div>
  )
}
