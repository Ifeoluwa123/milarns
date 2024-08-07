import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import Button from './Button';
import {Link, useNavigate} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
import SubheaderForm from './SubheaderForm'

export default function ModalBankOTPVerification({isOpens, setIsopens, title, children }) {
    const {isOpen, onOpenChange} = useDisclosure();
    // const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    // const 
    let navigate = useNavigate()
    let handleClick  = ()=>{
      // return navigate('/')
    }
  return (
    <div>ModalBankOTPVerification</div>
  )
}
