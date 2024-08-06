import React from 'react'
import HeaderForm from '../../components/superadmin/HeaderForm'
import SuperAdminLoginForm from '../../components/auth/superadmin/SuperAdminLoginForm'

export default function SuperAdminLogin() {
  return (
    <div className='bg-[var(--primary-color)] h-screen flex justify-center items-center px-[1.6rem] md:px-0'>
        <div className="bg-white max-w-[400px] md:max-w-[350px] w-full  rounded-[4px] px-[1.5rem] md:px-[2rem] py-[2rem]">
                <HeaderForm text="Login as super admin" />

                <div className="mt-[2rem]">
                    <SuperAdminLoginForm />
                </div>
        </div>
    </div>
  )
}
