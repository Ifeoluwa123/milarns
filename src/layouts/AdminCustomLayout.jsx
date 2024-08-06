
import { Navigate } from 'react-router-dom'


export default function AdminCustomLayout({children}) {


  return (
    <div className='md:flex items-start '>
        {children}
    </div>
  )
}
