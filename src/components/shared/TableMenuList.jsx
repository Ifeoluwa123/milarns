import React from 'react'
import { Link } from 'react-router-dom'

import {FiEdit2} from 'react-icons/fi'
import {MdKeyboardArrowRight} from 'react-icons/md'
import {LiaUserAltSlashSolid} from 'react-icons/lia'
import {CiUser} from 'react-icons/ci'


export default function TableMenuList({id,items,text,style}) {
  return (
    <ul className={`   overflow-hidden border-none ${style && style}`}>

          {
            items.map((item, index)=>{ 
              return (
                <React.Fragment key={index}>
                  {
                  item.type == 'internal_link' ?

                   <li><Link   to={item.path} className='py-[1rem] w-full flex items-center border-b-[1px] gap-x-[0.6rem] px-[0.6rem] hover:bg-[var(--secondary-color-hover-lighter)] hover:text-[var(--secondary-color)]'><span className=' min-w-[150px] w-full flex items-center gap-x-[0.5rem]'>{item.icon&& item.icon } {item.text}</span>  <span><MdKeyboardArrowRight /></span> </Link></li>:
                    item.type == 'external_link'?
                   <li><a  href={item.path} target={item.target} className='py-[1rem] w-full flex items-center border-b-[1px] gap-x-[0.6rem] px-[0.6rem] hover:bg-[var(--secondary-color-hover-lighter)] hover:text-[var(--secondary-color)]'><span className=' min-w-[150px] w-full flex items-center gap-x-[0.5rem]'>{item.icon&& item.icon } {item.text}</span>  <span><MdKeyboardArrowRight /></span> </a></li>:
                  <li><button onClick={item.onClick}  className='py-[1rem] w-full flex items-center border-b-[1px] gap-x-[0.6rem] px-[0.6rem] hover:bg-[var(--secondary-color-hover-lighter)] hover:text-[var(--secondary-color)]'><span className=' min-w-[150px] w-full flex items-center gap-x-[0.5rem]'>{item.icon} {item.text}</span>  <span><MdKeyboardArrowRight /></span> </button></li>
                  }
  
                </React.Fragment>
              )
              // console.log(item.path)
            })
          }
                {/* 
                <li className='' htmlFor=""><Link to="/admin-dashboard" className='py-[1rem] flex items-center border-2 gap-x-[0.6rem] px-[0.6rem] hover:bg-[var(--secondary-color-hover-lighter)] hover:text-[var(--secondary-color)]'><span className=' min-w-[150px] w-full flex items-center gap-x-[0.5rem]'>< LiaUserAltSlashSolid /> Deactivate account</span>  <span><MdKeyboardArrowRight /></span> </Link></li>
                <li className='' htmlFor=""><Link to="/admin-dashboard" className='py-[1rem] flex items-center border-2 gap-x-[0.6rem] px-[0.6rem] hover:bg-[var(--secondary-color-hover-lighter)] hover:text-[var(--secondary-color)]'><span className=' min-w-[150px] w-full flex items-center gap-x-[0.5rem]'>< CiUser /> Delete</span>  <span><MdKeyboardArrowRight /></span> </Link></li> */}
                {/* <li className='' htmlFor=""><Link to="/admin-dashboard" className='py-[1rem] flex items-center border-2 gap-x-[0.6rem] px-[0.6rem] hover:bg-[var(--secondary-color-hover-lighter)] hover:text-[var(--secondary-color)]'><span className=' min-w-[150px] w-full flex items-center gap-x-[0.5rem]'>< FiEdit2 /> Edit Profile</span>  <span><MdKeyboardArrowRight /></span> </Link></li>
                <li className='' htmlFor=""><Link to="/admin-dashboard" className='py-[1rem] flex items-center border-2 gap-x-[0.6rem] px-[0.6rem] hover:bg-[var(--secondary-color-hover-lighter)] hover:text-[var(--secondary-color)]'><span className=' min-w-[150px] w-full flex items-center gap-x-[0.5rem]'>< LiaUserAltSlashSolid /> Deactivate account</span>  <span><MdKeyboardArrowRight /></span> </Link></li>
                <li className='' htmlFor=""><Link to="/admin-dashboard" className='py-[1rem] flex items-center border-2 gap-x-[0.6rem] px-[0.6rem] hover:bg-[var(--secondary-color-hover-lighter)] hover:text-[var(--secondary-color)]'><span className=' min-w-[150px] w-full flex items-center gap-x-[0.5rem]'>< CiUser /> Delete</span>  <span><MdKeyboardArrowRight /></span> </Link></li> */}
   
    </ul>
  )
}
