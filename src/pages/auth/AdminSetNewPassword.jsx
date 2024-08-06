import React from 'react'
import HeaderForm from '../../components/shared/HeaderForm'
import SubheaderForm from '../../components/shared/SubheaderForm'
import SetNewPassword from '../../components/auth/admin/SetNewPasswordForm'


export default function AdminSetNewPassword() {
  return (
    <div className='containers '>
        <HeaderForm text='Don’t have an account? ' linkText='Create an account' path="/register" />

        {/* <div className="border- px-[1rem] md:px-[2rem] pb-[3rem]  max-w-[500px] md:max-w-[765px] w-full mx-auto  mt-[3rem]"> */}
        <div className="border- px-[1rem] md:px-[2rem] pb-[3rem] max-w-[500px] md:max-w-[765px] lg:max-w-[460px]  w-full mx-auto  mt-[1rem]">
            {/* <SubheaderForm  label="Welcome back, login" desc="You can log into your account with your details." /> */}
            <SubheaderForm  label="Set password" desc="Set your new password" />
            <SetNewPassword />
        </div> 

    </div>
  )
}
 