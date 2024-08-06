import React from 'react'
import { GoDotFill } from 'react-icons/go'

export default function UserCard({image, name, position, onboardDate, status}) {
  return (
    <div className="h-fit bg-white px-[0.6rem] py-[1rem] rounded-[4px] border-[1px] overflow-hidden">
        <div className="flex items-start justify-between">
            <div className="w-[30%] overflow-hidden">
                <img src={image} className='w-full' alt="" />
            </div>
            <div className=" bg-gray-100 px-[0.6rem] border-[1px] py-[0.4rem] rounded-[5px] text-[0.85rem]">
              <span className={`flex items-center   ${status? 'text-green-800': 'text-red-800'}`}><GoDotFill /> <span className='text-black'>{status? 'Active': 'Inactive'}</span> </span>
                {/* <Dot */}
            </div>
        </div>
 
        <div className=" mt-[1rem] leading-[2rem]">
            <h1 className='font-[600]'>{name}</h1>
            <p className='text-[0.85rem] text-gray-500'>{position}</p>
            <p className='text-[0.8rem]'>Onboard date: {onboardDate}</p>
        </div>
    </div>
  )
}
