import React from 'react'
import WalletImg from '../../assets/images/solar_wallet-money-linear.png'
import CashImg from '../../assets/images/money.png'
import {TbCurrencyNaira} from 'react-icons/tb'
export default function PinkAlert({label, value, type}) {
  return (
    <div className="bg-[#FDEAEA] py-[1rem] p-[0.5rem] bg-[url('../assets/images/bg-vector.png')] rounded-[4px]">
    <div className="">
    <p className='font-[600] text-[0.7rem] min-h-[50px] md:min-h-[50px]'>{label}</p>
      <h1 className='whitespace-nowrap flex items-center font-[600] '><span><TbCurrencyNaira  size={20} /></span>{value}.00</h1>
    </div>
     
      <div className="flex justify-end ">
          <div className=" w-[2.5rem] ">
            <img src={
              type == 'cash'?
              CashImg
              :
              type == 'wallet'?
              WalletImg
              :
              ''
              
              } className='w-full block' alt="" />
          </div>
      </div>
    </div>
  )
}
