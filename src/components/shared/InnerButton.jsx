import React from 'react'
import { Link } from 'react-router-dom'

export default function InnerButton({text,icon,width,...other}) {

const btnStyle = `
bg-[var(--secondary-color)] 
transition-all duration-[0.3s] 
hover:bg-[var(--secondary-color-hover)] 
text-white 
${width?width:'w-full'}
 
  shadow-[2px_2.5px_1px_1px_rgba(0,0,0,1)]
   rounded-[4px]
whitespace-nowrap
block
text-center
py-[0.5rem]
px-[1rem]
flex
items-center
gap-x-[0.6rem]
`
// py-[14px]
// px-[2rem]
// p-[14px_80px_14px_80px]
  return (
    <a
      href="https://milarn.com/use-milarn/"
      target="_blank"
      {...other}
      className={btnStyle}
    >
      <span>{icon}</span>
      {text}
    </a>
    // <>

    // {
    //     type === "internal-link"? <Link to={path} className={btnStyle}>{text}</Link>
    //     :
    //      type === "external-link"?
    //      <a href={path} className={btnStyle}>{text}</a>
    //      :
    //      <button type="button" {...other} className={btnStyle} >{text}</button>
    // }

    // </>
  );
}
