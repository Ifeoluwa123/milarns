import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({text,type,link,path,icon,bgColor, width, padding,...other}) {

const btnStyle = `

${bgColor? bgColor : 'bg-[var(--secondary-color)] '}

transition-all duration-[0.3s] 
${bgColor? bgColor: 'hover:bg-[var(--secondary-color-hover)] ' }

${bgColor ? bgColor: 'text-white' }
${width ? width : 'w-full '}

  shadow-[2px_2px_1px_1.5px_rgba(0,0,0,1)]
   rounded-[4px]
whitespace-nowrap
block
text-center
${padding ? padding : 'p-[14px_80px_14px_80px]'}

${icon && 'flex items-center'}


`
// py-[14px]
// px-[2rem]
// p-[14px_80px_14px_80px]
  return (
    <>

    {
        type === "internal-link"? <Link to={path} className={btnStyle}> {icon && icon}{text}</Link>
        :
         type === "external-link"?
         <a href={path} className={btnStyle}>{icon && icon} {text}</a>
         :
         <button type={`${type? type: 'button'}`} {...other} className={btnStyle} >{icon && icon} {text}</button>
    }
        
    </>
  )
}
