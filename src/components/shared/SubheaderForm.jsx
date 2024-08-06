import React from 'react'


export default function SubheaderForm({label, desc, flex, img, ...others}) {

  return (
    <div {...others} className={`${flex && "flex" }   flex-col justify-center items-center`}>
           <div className={`${flex && "flex" } items-center content-start justify-center`}>

            {img && <div className="">
            <img src={img} alt="" />
            </div>
            }

            <h1 className='font-[700] ml-[0.01rem] text-[1.125rem] md:text-[1.5rem]'>{label} </h1>
            </div>


            <p className='text-gray-500 mt-[0.5rem] text-[0.85rem] md:text-[1rem]  '>{desc}</p>
    </div>
  )
}
