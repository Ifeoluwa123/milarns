import React from 'react'
import SubheaderForm from '../../components/shared/SubheaderForm'
import LoginForm from '../../components/auth/admin/LoginForm'
import HeaderForm from '../../components/shared/HeaderForm'
import HelloHand from '../../assets/images/hand.png'

import { Navigate } from 'react-router-dom'


export default function AdminLogin() {


  // const adminInfo = localStorage.getItem('adminInfo')
  // const tokenKey = localStorage.getItem('adminToken')

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))

  if (adminInfo) {

    try {


      // const adminData = JSON.parse(adminInfo)


      if (adminInfo.token.access !== null && adminInfo.organization.account_status === "pending") {
        return <Navigate to="/onboarding_1" />

      }

      if (adminInfo.token.access !== null && adminInfo.organization.account_status === "approved") {
        return <Navigate to="/admin" />
      }
    } catch (e) {

    }

  }


  //   if(JSON.parse(localStorage.getItem('adminToken')) !== null && JSON.parse(localStorage.getItem('adminInfo'))?.account_status === "pending"  ){
  //     return <Navigate to="/onboarding_1" />

  // }

  // if(JSON.parse(localStorage.getItem('adminToken')) !== null && JSON.parse(localStorage.getItem('adminInfo'))?.account_status === "approved" ){
  //   return <Navigate to="/admin" />
  //   }

  return (
    <div className='containers '>
      <HeaderForm text='Don’t have an account? ' linkText='Create an account' path="/register" />

      {/* <div className="border- px-[1rem] md:px-[2rem] pb-[3rem]  max-w-[500px] md:max-w-[765px] w-full mx-auto  mt-[3rem]"> */}
      <div className="border- px-[1rem] md:px-[2rem] pb-[3rem] max-w-[500px] md:max-w-[765px] lg:max-w-[460px]  w-full mx-auto  mt-[1rem]">
        <SubheaderForm flex={true} img={HelloHand} label="Welcome back, login" desc="You can log into your account with your details." />
        <LoginForm />
      </div>

    </div>
  )
}
