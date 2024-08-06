import React from 'react'
import { Link } from 'react-router-dom'

export default function OutlineButton({text, icon,type,style, path="", ...others}) {
  return (
    <div className=''>
        {
            type == "Link"? <Link to={path} className={`border-[1px] border-[#374151]  ${style && style} rounded-[4px] p-[7px_20px_7px_20px] flex items-center`}>{icon} &nbsp;  {text}</Link> : 
            type == "external_link"?
            <a href={path} {...others} className={`border-[1px] border-[#374151]  ${style && style} rounded-[4px] p-[7px_20px_7px_20px] flex items-center`}>{icon} &nbsp;  {text}</a>:
            <button {...others} className={`border-[1px] border-[#374151]  ${style && style} rounded-[4px] p-[7px_20px_7px_20px] flex items-center`}>{icon} &nbsp; {text}</button>
        }
    </div>
  )
}
