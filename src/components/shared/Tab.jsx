import React from 'react'

export default function Tab({label, activeStyle, handleClick }) {
    return (
        
        <button className={`whitespace-nowrap pb-[1rem] font-[600] text-[0.95rem] ${activeStyle} `} onClick={handleClick}>
          {label} 
        </button>
      );
}
