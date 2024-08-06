import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {BsEye, BsEyeSlash} from 'react-icons/bs'
export default function TextField({label, name, value,placeholder,textSize, fontSize, errMsg,paddingY, type,...other}) {
 
    let [pwdEye, setPwdEye] = useState(false)
    let [confirmPwdEye, setConfirmPwdEye] = useState(false)

  return (
    <div className='flex flex-col relative'>
        <label htmlFor={`input-${label}`} className={`${!fontSize? 'font-[600]':fontSize}  ${!textSize? 'text-[0.875rem]': textSize}  `}>{label}</label>
          
          {
            type == 'text' ||  type == 'date' ||  type == 'month' ? 
            
        <input  onChange={(e)=>e.target.value} {...other} name={name} value={value} type={type} id={`input-${label}`} className={`  ${errMsg? 'input-border-error-message  ]':' outline-none focus:input-border'} ${!paddingY? 'py-[0.9rem]':paddingY}  text-[0.85rem] mt-[0.6rem] border-[0.9px]  px-[0.6rem] transition-[border] duration-[0.4s]  rounded-[5px] `} placeholder={placeholder} />
        :
        type == 'password'?
                <>
                
                <input onChange={(e)=>e.target.value} {...other} name={name} value={value} type={pwdEye?"text":"password"} id={`input-${label}`} className={`  ${errMsg? 'input-border-error-message  ]':' outline-none focus:input-border'} ${!paddingY? 'py-[0.9rem]':paddingY}   text-[0.85rem] mt-[0.6rem] border-[0.9px] py-[0.9rem] px-[0.6rem] transition-[border] duration-[0.4s]  rounded-[5px] `} placeholder={placeholder} />
                <span onClick={()=> setPwdEye(prev=>!prev)} className='absolute top-[55%] right-[5%] hover:cursor-pointer'>{pwdEye?<BsEyeSlash />:<BsEye />}</span>
    
                </>:
        type == 'number'?
        <div className='pt-[0.6rem]'>

            <PhoneInput
                                  id={`input-${label}`}
                                country={'ng'}
                                value={value}
                                name={name}
                                {...other}
                                
                               
                                inputProps={{
                                  name: name,
                                  required: true,
                                  
                                  // autoFocus: true
                                }}
                                placeholder={placeholder}
                                
                                containerClass=""
                                inputClass={`${!paddingY? 'py-[1.5rem]':paddingY}  react-tel-input-input-fields   text-[0.85rem] mt-[0.6rem] border-[0.9px]  px-[0.6rem] transition-[border] duration-[0.4s] focus:input-border`}

                                // enableAreaCodes={true}
                                // // onlyCountries={['Ng', 'fr', 'us']}
                                onlyCountries={['ng', 'es']}
                                // localization={{ng: 'Nigeria', es: 'España'}}
                                // onlyCountries={['ng']}
                               
                              />
        </div>:
          type == 'textarea'?
        
           <textarea onChange={(e)=>e.target.value}  {...other} name={name} value={value} type={type} id={`input-${label}`} className={`  ${errMsg? 'input-border-error-message  ]':' outline-none focus:input-border'} ${!paddingY? 'py-[0.9rem]':paddingY} resize-none no-scrollbar  text-[0.85rem] mt-[0.6rem] border-[0.9px]  px-[0.6rem] transition-[border] duration-[0.4s]  rounded-[5px] `} placeholder={placeholder} ></textarea>
          //  <textarea placeholder={placeholder} className='w-full py-[0.5rem] resize-none no-scrollbar px-[0.6rem] outline-none focus:input-border text-[0.85rem] mt-[0.6rem] border-[0.9px]  transition-[border] duration-[0.4s]  rounded-[5px] '></textarea>
        
        :null
          }
          
            
        <span className={` ${errMsg? 'visible input-field-error-message':'invisible' }   mt-[0.4rem] ml-[0.2rem] text-[0.8rem] `}>{errMsg && errMsg}</span>
    </div>
  )
}
