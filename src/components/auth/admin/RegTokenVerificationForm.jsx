import React, { useEffect, useState } from 'react'
import Button from '../../shared/Button'
import OTPInputorm from '../../shared/OTPInputorm'


import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useResendTokenForRegistration, useVerifyEmailForRegistration, } from '../../../services/admin/mutation';
import convertAndRemoveCommas from '../../../utilities/convertAndRemoveCommas';
import Error404 from '../../../pages/Error404'

export default function RegTokenVerificationForm({otpSentMsg, setOTPSentMsg}) {
    const [otp, setOtp] = useState(['', '', '', '']);


    let navigate = useNavigate()
  
  
  
         
   
    let  { mutate, error, isPending,isError, isSuccess, data} = useResendTokenForRegistration()
  
  
  
  const handleResendCode = (e)=>{
    e.preventDefault()
  
    return mutate(sessionStorage.getItem('email'),{
     
      onError:(error)=>{
        // console.log(error?.response.data.message)
        return  setOTPSentMsg({ error: error.response.data.message}) 
      },
  
      onSettled:(response)=>{
        
        return setOTPSentMsg({
       
          success: response?.message
        })
      }
    })
  }
          
  
  
  
  let {mutate: mutateToken, isError: checkErr, error:errMsg,isPending:loading, isSuccess:isSuccessfull} = useVerifyEmailForRegistration()
 
  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log()
    const otpStrCode = convertAndRemoveCommas(otp)
    setOTPSentMsg({})
    
   return mutateToken(otpStrCode,{
        onSuccess:(data)=>{
          // return navigate("/set-password") 
          console.log(data)
          localStorage.setItem('adminInfo', JSON.stringify(data))
          
        },
        onError:(err)=>{
            
            return setOTPSentMsg({ error: err?.response.data.errors.token})
        },
        onSettled:(res)=>{
          console.log(res)
              // setOTPSentMsg({success: errMsg?.res.data.message})
              const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
            if (adminInfo) {
      
                if(adminInfo.token.access !==null && adminInfo.organization.account_status === "pending"  ){
                    return navigate('/onboarding')
                }
                if(adminInfo.token.access !==null && adminInfo.organization.account_status ===  "approved" ){
                return navigate('/admin')
                }
                // return  await queryClient.setQueryData("adminData");
              } 
       
        }
   })
    // console.log()
  
  
  }
  
    return (
      <>
          {/* {
          otpSentMsg && <div className={`${otpSentMsg.error && 'bg-[#FDEAEA] text-[#FE5E55] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{otpSentMsg.error}</div>
         }  */}
          <OTPInputorm otp={otp} setOtp={setOtp} />
          <div className="mt-[2rem]">
                <Button  text={loading? "loading...": "Proceed" }onClick={handleSubmit} />
          </div>
  
          <div className="text-center my-[1rem]">
              <p>No code receive? <span onClick={handleResendCode}  className='cursor-pointer text-[var(--secondary-color)]'>Resend</span></p>
          </div>
      
      
      </>
      
    )
}
