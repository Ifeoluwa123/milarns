import React, { useEffect, useState } from 'react'
import Button from '../../shared/Button'
import OTPInputorm from '../../shared/OTPInputorm'



import { useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation, useVerifyPwdTokenMutation } from '../../../services/admin/mutation';
import convertAndRemoveCommas from '../../../utilities/convertAndRemoveCommas';
import Error404 from '../../../pages/Error404'

export default function TokenVerificationForm({otpSentMsg, setOTPSentMsg}) {
  const [otp, setOtp] = useState(['', '', '', '']);

  let navigate = useNavigate()



       
 
  let  { mutate, error, isPending,isError, isSuccess, data} = useForgetPasswordMutation()



const handleResendCode = (e)=>{
  e.preventDefault()

  return mutate(sessionStorage.getItem('email'),{
   
    onError:(error)=>{
      // console.log(error?.response.data.message)
      return  setOTPSentMsg({ error: error.response.data.message}) 
    },

    onSettled:(response)=>{
      return setOTPSentMsg({
        ...otpSentMsg,
        success: response?.message
      })
    }
  })
}
        



let {mutate: mutateToken, isError: checkErr, error:errMsg,isPending:loading, isSuccess:isSuccessfull} = useVerifyPwdTokenMutation()
const handleSubmit = async (e)=>{
  e.preventDefault()
  console.log()
  const otpStrCode = convertAndRemoveCommas(otp)
  setOTPSentMsg({})
  // if(isSuccessfull){
    
  //   setOTPSentMsg({
  //     ...otpSentMsg,
  //     success: errMsg?.response.data.message
  //   })
  // }
  // if(checkErr){
  //   setOTPSentMsg({
  //     ...otpSentMsg,
  //     error: errMsg?.response.data.message
  //   })

  // }

//   if(checkErr){
//     return <Error404 desc={error.message} />
// }
 return mutateToken(otpStrCode,{
      onSuccess:()=>{
        return navigate("/set-password") 
        
      },
      onError:(err)=>{
          // console.log(err)
          return setOTPSentMsg({error: errMsg?.response.data.message})
      },
      onSettled:(res)=>{
        
            setOTPSentMsg({success: errMsg?.res.data.message})
     
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


