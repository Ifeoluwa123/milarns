import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/logo/dark-bg-logo.png'

export default function HeaderForm({text, linkText, path }) {
  return (
    <div className='  py-[1rem] md:py-[2rem] flex justify-between items-center'>
    <Link to="/" className="w-[120px] md:w-[]">
      <img src={Logo} className='object-cover w-full' alt="" />
    </Link>
    <div className='  hidden md:block'>
        <p className='text-[1rem]'> {text} <Link to={path} className='text-[var(--secondary-color)]'>{linkText}</Link></p>
      </div>
    </div>
  )
}
