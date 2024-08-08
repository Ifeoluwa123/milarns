import React, { useEffect, useState } from 'react'
import HeaderForm from '../../components/shared/HeaderForm'
import SubheaderForm from '../../components/shared/SubheaderForm'
import LoginForm from '../../components/auth/admin/LoginForm'
import HelloHand from '../../assets/images/hand.png'

import RegTokenVerificationForm from '../../components/auth/admin/RegTokenVerificationForm'
export default function AdminRegistrationOTPVerification() {
  const [otpSentMsg, setOTPSentMsg] = useState({
    error: '',
    success: ''
  });
  const [isEmail, setIsEmail] = useState('');

  const handleSendIsSentPhone = (childData) => {
    setIsEmail(childData);
  };



  // useEffect(()=>{
  //   if (otpSentMsg){
  //     console.log(otpSentMsg)
  //   }
  // },[otpSentMsg])
  // // 
  return (
    <div className='containers '>


      <HeaderForm text='Don’t have an account? ' linkText='Create an account' path="/register" />

      {/* <div className="border- px-[1rem] md:px-[2rem] pb-[3rem]  max-w-[500px] md:max-w-[765px] w-full mx-auto  mt-[3rem]"> */}
      <div className=" px-[1rem] md:px-[2rem] pb-[3rem] max-w-[500px]  md:max-w-[765px] lg:max-w-[500px]  w-full mx-auto mt-[3rem]  lg:mt-[6rem]">


        <SubheaderForm className="mt-[2rem]" label="Account Verification" desc={`Please input the 4 characters sent to your ${isEmail ? sessionStorage.getItem('phone') : sessionStorage.getItem('email')}`} />

        <div className="mt-[1rem]">

          {
            otpSentMsg.error &&
            <div className={`bg-[#FDEAEA] text-[#FE5E55] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]`}>
              Error: {otpSentMsg.error}
            </div>
          }
          {
            otpSentMsg.success &&
            <div className={`bg-[#F2FDF5] text-[#21C45D] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]`}>
              {otpSentMsg.success}
            </div>
          }
        </div>

        <div className="mt-[1rem]">
          <RegTokenVerificationForm otpSentMsg={otpSentMsg} setOTPSentMsg={setOTPSentMsg} sendIsSentPhone={handleSendIsSentPhone} />

        </div>
      </div>

    </div>
  )
}


