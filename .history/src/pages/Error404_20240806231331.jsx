import React from 'react'
import Button from '../components/shared/Button'

export default function Error404({status, message, desc}) {
  return (
    <div className=' h-[100vh] flex justify-center items-center'>
    <div className=" max-w-[700px] w-full mx-auto ">
            <div className="text-center sm:flex flex-col sm:justify-center sm:items-center h-full px-[2rem] py-[2rem]">
                <h1 className=' p-0  font-[1000] text-[7.5rem] sm:text-[9.5rem] md:text-[11rem] xl:text-[12.75rem] mb-0'>{status? status: 404}</h1>
                <p className='sm:text-[1.4rem] leading-[30px] text-[1rem]'>{message? message : "Opps! This Page Could not be found"}</p>
                <p className='uppercase mt-[1rem] text-[0.89rem]'>{desc? desc : "Sorry but the page you are looking for does not exist, have been removed, Name changed or is temporarily unavailable"}</p>
               <div className=" mt-[2rem]">

               <Button text="Reload" type="internal-link" path="/" />
               </div>
             
            </div>
    </div>
</div>
  ) 
}
