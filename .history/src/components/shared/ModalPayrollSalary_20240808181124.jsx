import React from 'react'
import Modals from './Modals'
import { TbCurrencyNaira } from 'react-icons/tb'
import { RiErrorWarningLine } from 'react-icons/ri'
import Button from './Button'
import { usePayEmployeeSalary } from '../../services/admin/mutation'
import AlertMessages from './AlertMessages'
 
export default function ModalPayrollSalary({isOpen, setIsOpen, value, mutation}) {

//  if(mutation.isPending){
//       return <h1>Loading...</h1>
//     }
  // console.log(mutation.variables)
let payload = {}
  if(mutation.variables ){
    payload = {
      month:mutation?.variables.month,
      year:mutation?.variables.year ,
      codes:mutation?.variables.codes ,
      record_type:"payout"
    }
  }
    

      let {mutate} = usePayEmployeeSalary()

      let handlepayout = ()=>{
             mutate(payload, {
                 onSuccess:(success)=>{
                  console.log(success);
                  AlertMessages("Payment Successful",success.message, "success")
                 },
                 onError:(error)=>{
                  console.log(error);
                 }
             })
      }
 
  return (
    <Modals setIsopens={setIsOpen} isOpens={isOpen} title="Proceed to pay salary">
    <div className=" bg-[var(--primary-color)] text-white rounded-[4px] flex flex-col items-center py-[1rem]">
          <h2 className='font-[700]  flex items-center justify-center text-[1.8rem]'><span className="text-[2.2rem]"><TbCurrencyNaira /></span>{value.total_payout > 0 ? value.total_payout : 0}.00</h2>
          <p className="text-[0.88rem]">Salary for the month of {value.month}</p>
    </div>

    <div className="py-[1rem] px-[1rem] bg-[#F5F5F5] text-black rounded-[4px] ">
        <p className='flex items-start justify-between gap-x-[0.7rem]'>
          <span className="text-[var(--secondary-color)] block text-[1.2rem] justify-between"><RiErrorWarningLine /></span>
          <span className=' block text-[0.85rem]'>
          Note! Total payment include wages pulled by staff as salary in-advance and the next salary of staff.
          </span>
        </p>

        <h5 className='mt-[1.6rem]'>
          <p className='flex text-[0.85rem] mb-[1rem]'><span className="max-w-[180px] block w-full text-[#6B7280]">Total wages pulled:</span> <span className="flex items-center font-[600]"><TbCurrencyNaira /> {value.wage_pulled>0? value.wage_pulled :0 }</span> <span className="font-[600]">.00</span></p>
          <p className='flex text-[0.85rem] mb-[1rem]'><span className="max-w-[180px] block w-full text-[#6B7280]">Total net salary:</span> <span className="flex items-center font-[600]"><TbCurrencyNaira /> {value.upcoming_salary>0? value.upcoming_salary: 0 }</span> <span className="font-[600]">.00</span></p>
          <p className='flex text-[0.85rem]'><span className="max-w-[180px] block w-full text-[#6B7280]">Total payment:</span> <span className="flex items-center font-[600]"><TbCurrencyNaira /> {value.total_payout>0? value.total_payout: 0 }</span> <span className="font-[600]">.00</span></p>
        </h5>
    </div>


{
  value.amount_left > 0 &&   <div className="py-[1rem] px-[1rem] bg-[#FDEAEA] text-black rounded-[4px]">
  <p className='font-[600] text-[0.85rem]'>Not enough fund in your wallet</p>
  <p className=" text-[0.85rem] mt-[0.6rem]">
  Topup current balance of <span className='font-[600]'>₦{value.amount_left}.00</span>   in your wallet before you make payment. &nbsp;
  <a href="#"  className="text-[var(--secondary-color)] underline">Topup wallet fund</a> 
  </p>
</div>

}
  

    <div className="">
      {/* <Button onClick={handlepayout}   text="Make payment now" padding="py-[0.6rem]" /> */}
      <Button onClick={handlepayout} disabled={value.amount_left > 0 } bgColor={value.amount_left > 0 || value.total_payout>0 ? "bg-grey-500 text-black cursor-not-allowed" : "bg-[var(--secondary-color)] text-white" } text={`${mutation.isPending? 'Loading...': 'Make payment now'}`} padding="py-[0.6rem]" />
    </div>

  </Modals>
  )
}
