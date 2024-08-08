import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
// import Button from './Button';
import {Link, useNavigate} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
// import SubheaderForm from './SubheaderForm'
import TextField from '../shared/TextField';
import Button from '../shared/Button';
import { useVerifyFormThreeOTPCode } from '../../services/admin/mutation';

export default function ModalBankOTPVerification({isOpens, setIsopens }) {
    const {isOpen, onOpenChange} = useDisclosure();
    // const {isOpen, onOpen, onOpenChange} = useDisclosure();
    let [otpCode, setOtpCode] = useState()
    // const 
    let navigate = useNavigate()
    let {mutate, isPending} = useVerifyFormThreeOTPCode()
    let [errorMsg, setErrorMsg]=useState()
    let handleSubmit  = ()=>{
        console.log(otpCode)
        if(!otpCode){
               console.log("bjnkmk")
               setErrorMsg('This field is Required')
        }else{
        
            mutate({otp:otpCode},
                {
                    onSuccess:(success)=>{
                        console.log(success)
                    },
                    onError:(error)=>{
                        console.log(error.data)
                    }
                }
            )
        }
     
      // return navigate('/')
    }
  return (
    <>
    {/* <Button onPress={onOpen}>Open Modal</Button> */}
    <Modal 
    hideCloseButton={true}
     backdrop="blur" 
     isOpen={isOpens} 
     onOpenChange={onOpenChange}
     placement='center'
  
     classNames={{
       backdrop: "bg-gradient-to-t from-zinc-900/60 to-zinc-900/60  "
      //  backdrop: "bg-gradient-to-t from-zinc-900/60 to-zinc-900/60  backdrop-blur-[3px]"
     }}
    
    >
      <ModalContent className='bg-white  rounded-md'>
        {(onClose) => (
          <>
            <ModalHeader className="bg-[linear-gradient(to_bottom,rgb(254,94,85),rgb(254,94,85))] z-[-1] text-white border-none outline-none p-0">
                    <div className=" bg-[url('../assets/images/bg-modal-header.png')] py-[0.80rem] px-[1.4rem] m-0 h-full w-full flex justify-between items-center  gap-1 ">
                OTP Code

                 <span className="cursor-pointer" onClick={()=>setIsopens(false)}><AiOutlineClose size={20} /></span>
                    </div>
                 </ModalHeader>
            <ModalBody className='py-[1rem] '>
              
            <div className="leading-[40px]">

            <h1 className='font-[700] text-[1.1rem] md:text-[1.1rem]'>Verify Phone Number</h1>
            <p className='text-gray-500 text-[1rem] md:text-[0.88rem] leading-8 '>Please input  the 6 digit character sent to ---</p>
            </div>

            <div className="">
            {
                errorMsg.error && <div className={`${errorMsg.error && 'bg-[#FDEAEA] text-[#FE5E55] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{errorMsg.error}</div>
               } 
            {
               errorMsg.success && <div className={`${ errorMsg.success && 'bg-[var(--primary-color)] text-white mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{ errorMsg.success}</div>
               } 
            </div>

                <TextField errMsg={errorMsg && errorMsg} label="OTP Code" onChange={(e)=>setOtpCode(e.target.value)} type="text" paddingY='py-[0.4rem] ' placeholder="Enter the OTP Code"/>
                <Button text={isPending? 'Loading...' : 'Submit'} onClick={handleSubmit} type="submit" padding="py-[0.4rem]" />
        
            </ModalBody>
            <ModalFooter className='border-t-[1px]'>
              <div color="danger" className='cursor-pointer' variant="light" onClick={()=>setIsopens(false)}>
                Close
              </div>
              
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>
  )
}
