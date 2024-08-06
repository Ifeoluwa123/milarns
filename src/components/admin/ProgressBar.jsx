import React from 'react'

export default function ProgressBar({value}) {
  return (
    <div className='static z-[-10]'>
        {/* <div className={`relative bg-[var(--grey-color)] overflow-hidden  h-[7px] after:transition-all after:duration-[0.3s] rounded-[1rem] after:bg-[var(--primary-color)] after:absolute after:left-0 after:rounded-r-[1rem] after:top-0 after:w-[${value? (value+'%'):''}] after:h-full`}> */}
        <div className={`relative bg-[var(--grey-color)]  overflow-hidden h-[7px] after:transition-all after:duration-[0.3s] rounded-[1rem] after:bg-[var(--progress-bar-color)] after:absolute after:left-0 after:rounded-r-[1rem] after:top-0 after:w-[60%] after:h-full`}>
        

            {/* <div className="absolute block top-0 left-0 bg-green-600  h-[100%] width-[80%]"></div> */}
        </div>
    </div>
  )
}
// [var(--primary-color)]