import React from 'react'

export default function WhiteCard({label, value}) {
  return (
    <div className="p-[0.5rem] bg-[url('../assets/images/bg-vector.png')]  bg-white">
          <p className='font-[600] text-[0.7rem]'>{label}</p>
          <h1 className='font-[600] mt-[1rem] text-[1rem]'>{+value > 0? value+" Staffs":value+" Staff" } </h1>
    </div>
  )
}
