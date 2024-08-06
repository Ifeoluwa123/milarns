import React from 'react'
import HeaderForm from '../../components/shared/HeaderForm'
import SubheaderForm from '../../components/shared/SubheaderForm'
import ResetPasswordForm from '../../components/auth/admin/ResetPasswordForm'

export default function AdminResetPassword() {
    return (
        <div className='containers '>
                <HeaderForm text='Don’t have an account? ' linkText='Create an account' path="/register" />
    
                <div className="border- px-[1rem] md:px-[2rem] pb-[3rem]  max-w-[500px] md:max-w-[765px] lg:max-w-[460px] w-full mx-auto  mt-[3rem]">
                    <SubheaderForm  label="Reset password" desc="Enter your email to reset your password" />
                    <ResetPasswordForm />
                </div>
    
        </div> 
      )
}
