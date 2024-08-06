import React, { useRef } from 'react'
import { handleOTPInputChange, handleOTPPaste,handleKeyDown } from '../../utilities/admin/handleOTPInputChange';

export default function OTPInputorm({otp, setOtp}) {
    const inputs = Array.from({ length: 4 }, () => useRef(null));


    
    
  return (
    <div className="flex gap-x-[1rem] justify-center my-[1rem] overflow-auto no-scrollbar">

                    {
                      otp.map((value, index)=>(
                          <input className='border-2 border-black max-w-[40px] text-center w-fu h-[40px] p-2 rounded-md text-[2rem]'
                            type="text"
                            
                             key={index}
                        
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleOTPInputChange(index,inputs,setOtp, e)}
                            onPaste={(e)=>handleOTPPaste(inputs,setOtp,e)}
                            onKeyDown={(e) =>  handleKeyDown(index, inputs, setOtp, e)}
                            ref={inputs[index]}
                            
                            
                            />

                      ))  
                    }
        
    </div>
  )
}
