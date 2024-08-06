import React from 'react'

export default function ComponentRight({children}) {
  return (
    <div className=' p-[1rem]  pt-[2rem] lg:px-[3rem] bg-white b-[var(--grey-color)] md:bg-white   md:relative md:left-[250px]    md:max-w-[calc(100%-250px)] lg:left-[300px] lg:max-w-[calc(100%-300px)]  w-full '>
        {children}
    </div>
  )
}
