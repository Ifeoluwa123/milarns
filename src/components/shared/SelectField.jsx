import React from 'react'

export default function SelectField({modify,label,fontSize,name,options,key1, key2, selectedOption, onChange, placeholder, paddingY, textSize}) {
  

    return (

      <>  
   
       <div className='flex flex-col justify-center mt-[-6px]'>
        <label htmlFor={label} className={`${!fontSize? 'font-[600]':fontSize}   ${!textSize? 'text-[0.875rem]': textSize}` }>{label}</label>
       <select name={name} defaultValue={selectedOption} onChange={onChange} id={label} className={`focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem] ${!paddingY? 'py-[0.9rem]': paddingY}  w-full  transition-[border] duration-[0.4s] rounded-[6px]`}>
      { 
         typeof options?.[0] === 'object' && options[0] !== null ?
            options.map((item, index)=>(
              <option key={index} value={ item[key1 || key2]}   >{item[key2 || key1]}</option>
              // <option key={index} value={ item[key1 || key2].toLowerCase().replace(/ /g, '_')}   >{item[key2 || key1]}</option>
            ))
         :
                options?.map((item, i)=>(
                    <option key={i} value={item.toLowerCase().replace(/ /g, '_')}   >{item}</option>
                ))
      }
      </select>
      </div>
      </>
   



      

    )
  
  
  // return (
  //   <div className='flex flex-col justify-center mt-[-6px]'>
  //       <label htmlFor={label} className={`${!fontSize? 'font-[600]':fontSize}   ${!textSize? 'text-[0.875rem]': textSize}` }>{label}</label>
  //       <select name={name} defaultValue={selectedOption} onChange={onChange} id={label} className={`focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem] ${!paddingY? 'py-[0.9rem]': paddingY}  w-full  transition-[border] duration-[0.4s] rounded-[6px]`}>
  //           <option  >--Select {placeholder}</option>
  //           { 
  //               options.map((item, i)=>(
  //                   <option key={i} value={item.toLowerCase().replace(/ /g, '_')}   >{item}</option>
  //               ))
  //           }
            
         
  //       </select> 
  //   </div>
  // )
}
