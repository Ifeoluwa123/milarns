import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
// import Button from './Button';
import {Link, useNavigate} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
// import SubheaderForm from './SubheaderForm'
import TextField from '../shared/TextField';
import Button from '../shared/Button';

export default function ModalBankOTPVerification({isOpens, setIsopens }) {
    const {isOpen, onOpenChange} = useDisclosure();
    // const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    // const 
    let navigate = useNavigate()
    let handleClick  = ()=>{
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
            <ModalHeader className="bg-[linear-gradient(to_left,rgba(30,44,30,0.4),rgba(30,44,30,0.4)),url('../../assets/images/bg-modal-header.png')] text-white border-none flex justify-between items-center  gap-1 outline-none">
                OTP Code
                 <span className='cursor-pointer' onClick={()=>setIsopens(false)}><AiOutlineClose size={20} /></span></ModalHeader>
            <ModalBody className='py-[1rem] '>
              
            <div className="leading-[40px]">

            <h1 className='font-[700] text-[1.1rem] md:text-[1.1rem]'>Verify Phone Number</h1>
            <p className='text-gray-500 text-[1rem] md:text-[0.88rem] leading-8 '>Please input  the 6 digit character sent to ---</p>
            </div>

                <TextField label="" type="text" paddingY='py-[0.4rem] mt-[0]' placeholder="Enter the OTP Code"/>
                <Button text="Submit" type="submit" padding="py-[0.4rem]" />
        
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
