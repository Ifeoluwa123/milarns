import React from 'react'
import {MoonLoader} from 'react-spinners'
export default function Spinner() {
  return (
    <div className="absolute top-0  left-0 z-[1000]  h-screen w-full">
        <div className="  flex justify-center h-full items-center">
            <div className="bg-white max-w-[200px] shadow-[2px_2px_8px_rgba(0,0,0,0.5)] py-[2rem] rounded-md flex justify-center w-full mx-auto border-">
        <MoonLoader color="var(--secondary-color)" />

            </div>
        </div>

    </div>
  ) 
}
