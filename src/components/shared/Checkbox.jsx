import React from 'react'

export default function Checkbox({name,onChange,checked, id,...others}) {
  return (
    <div className='w-fit  rounded-[0.3em] border-2 shadow-none'>
            <input type="checkbox" id={name?name:id?id:'default'} onChange={onChange} checked={checked} name={name} {...others}/>
            <label htmlFor={name?name:id?id:'default'}>
            <svg viewBox="0 0 100 100">
                <path className="box" d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"/>
                <polyline className="check" points="25.5,53.5 39.5,67.5 72.5,34.5 "/>
            </svg>
            </label>
    </div> 
  )
}
