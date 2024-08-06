import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import Button from './Button';
import {Link, useNavigate} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
import SubheaderForm from './SubheaderForm'

export default function Modals({isOpens, setIsopens, title, children }) {

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
        <ModalContent className='bg-white border-2 rounded-md'>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center  gap-1 border-b-[1.5px]">{title} <span className='cursor-pointer' onClick={()=>setIsopens(false)}><AiOutlineClose size={20} /></span></ModalHeader>
              <ModalBody className='py-[1rem] '>
                
              {/* <div className="leading-[40px]">

              <h1 className='font-[700] text-[1.1rem] md:text-[1.1rem]'>Confirm Email Address</h1>
              <p className='text-gray-500 text-[1rem] md:text-[0.88rem] leading-8 '>Please input  the 6 digit number sent to olu************.com</p>
              </div> */}

{children}
               {/* <div className="flex gap-x-[2rem] my-[1rem]">
                  <input className='border-2 border-black max-w-[42px] h-[47px] p-2 rounded-md text-[2rem]'  type="text" maxLength={1} />
                  <input className='border-2 border-black max-w-[42px] h-[47px] p-2 rounded-md text-[2rem]'  type="text" maxLength={1} />
                  <input className='border-2 border-black max-w-[42px] h-[47px] p-2 rounded-md text-[2rem]'  type="text" maxLength={1} />
                  <input className='border-2 border-black max-w-[42px] h-[47px] p-2 rounded-md text-[2rem]'  type="text" maxLength={1} />
                  <input className='border-2 border-black max-w-[42px] h-[47px] p-2 rounded-md text-[2rem]'  type="text" maxLength={1} />
                  <input className='border-2 border-black max-w-[42px] h-[47px] p-2 rounded-md text-[2rem]'  type="text" maxLength={1} />
               </div>
                  <div className="">
                        <Button text="Proceed" onClick={handleClick} />
                  </div>

                  <div className="text-center my-[1rem]">
                      <p>No code receive? <span onClick={()=>setIsopens(false)}  className='cursor-pointer text-[var(--secondary-color)]'>Resend</span></p>
                  </div> */}
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
