import React from 'react'

export default function ComponentLeft({top, children}) {
  return (
    <div className={`md:fixed pt-[2rem] pb-[10re]  md:${top? top : 'top-[52px]' }  overflow-y-auto scrollbar-hide  mt-0 no-scrollbar    md:max-w-[250px]  lg:max-w-[300px] md:h-screen lg:h-full   bg-[var(--grey-color)] w-full  p-[1rem]`}>
        {children}
    </div>
  )
}
