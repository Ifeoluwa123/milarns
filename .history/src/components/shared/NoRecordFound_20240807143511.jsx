import React from 'react'
import Img from '../../assets/images/kiko-38570-removebg-preview.png'
export default function NoRecordFound({title,label,component,height}) {
  return (

             <div className={`flex flex-col justify-center items-center  ${height? height : 'min-h-[300px]'} h-full px-[0.3rem]`}>
                <div className="image">
                    <img src={Img} alt="" />
                </div>
                <h1 className='font-[700] mb-[0.5rem] text-center'>{title}</h1>
                <p className='text-[0.85rem] text-gray-500 text-center'>{label}</p>

                {/* {
                    component && <div className='mt-[0.5rem]'>{component}</div>
                } */}
            </div>
   
  )
}
