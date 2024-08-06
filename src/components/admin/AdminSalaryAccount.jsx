import React, { useState } from 'react'
import { Form } from 'react-router-dom'
import TextField from '../shared/TextField'
import Button from '../shared/Button'
import { useBankNames } from '../../services/admin/queries'
import { useUpdateOrgBankInfo } from '../../services/admin/mutation'
import validateUserData from '../../utilities/validateUserData'
import SelectField from '../shared/SelectField'

export default function AdminSalaryAccount({data}) {

  let initialValues = {
    bank_code:data && data.bank_code, 
    // account_name: data && data.account_name,
    account_number: data && data.account_number,
    bvn:null
  }

  let [bankInfo, setBankInfo] = useState(initialValues)
  // console.log(data)

  let {data:BankNames} = useBankNames()


  const handleOnChange = (e)=>{
    let {name, value} = e.target
    setBankInfo(prev=>({
      ...prev,
      [name]:value
    }))
  }

  let [errMsg, setErrMsg] = useState({})
  let {mutate, isPending} = useUpdateOrgBankInfo()
  const handleSubmit = (e)=>{
    e.preventDefault()

   if(validateUserData(bankInfo, setErrMsg)) {
    return mutate(bankInfo, {
      onSuccess:(success)=>{
        console.log(success)
        setErrMsg({success: "Record updated successfully"})
      },
      onError:(err)=>{
        // console.log(error.response.data.message)
        return setErrMsg({error: err.response.data.message})
      }
    })
   }
    
  }
  // {
  //   BankNames?.map(({name, code})=>
  //     console.log(name, code)
  //   )
  // }
 
  return (
    <div className="pb-[2rem]">
        <p className='mb-[0.5rem] font-[600] '>Organisation salary bank detail</p>
        <div className="mt-[1rem]">
          <form onSubmit = {handleSubmit}>
              <div className="md:grid grid-cols-2 gap-x-[3rem] gap-y-[1rem] max-w-[800px] w-full">
                {/* <TextField
                    label="Bank name"
                      // value={userData.name}
                    // onClick={''}
                    type="text"
                    paddingY="py-[0.5rem]"
                    fontSize="font-[500]"
                    textSize="text-[0.875rem]"

                  /> */}
                           <div className='flex flex-col mb-[1rem] justify-center md:mb-[0rem]'>
                                    {/* <label htmlFor='bank_code' className=" text-[0.875rem] " >Bank name</label>
                                    <select defaultValue={bankInfo.bank_name ? bankInfo.bank_name: "" }  onChange={handleOnChange}   id='bank_code'  name="bank_code"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.7rem] w-full  transition-[border] duration-[0.4s] rounded-[6px] ">
                                    
                                        <option disabled value="">--Select Bank--</option>
                                        { 
                                            BankNames?.map((item, i)=>(
                                                <option key={i} value={item.code}  >{item.name}</option>
                                            ))
                                        }
                                        
                                    
                                    </select> */}

                                    <SelectField 
                                    label="Bank name"
                                    textSize="font-[300]"
                                    options={BankNames}
                                    key1={'code'}
                                    key2={'name'}
                                    name="bank_code"
                                    onChange={handleOnChange} 
                                    selectedOption={bankInfo.bank_name ? bankInfo.bank_name: "" }
                                     paddingY="py-[0.5rem]"
                                     fontSize="font-[400] text-[0.85rem]"
                                      
                                      />

                            </div>

                         
                <TextField
                    label="Account number"
                      // value={userData.name}
                    // onClick={''}
                    type="text"
                    paddingY="py-[0.5rem]"
                    fontSize="font-[500]"
                    textSize="text-[0.875rem]"
                    name="account_number"
                    defaultValue = {data.account_number}
                    onChange={handleOnChange}
                    errMsg={errMsg && errMsg.account_number}
                    // value={}

                  />
                {/* <TextField
                    label="Account holder"
                      // value={userData.name}
                    // onClick={''}
                    type="text"
                    name="account_name"
                    paddingY="py-[0.5rem]"
                    fontSize="font-[500]"
                    textSize="text-[0.875rem]"
                    defaultValue = {bankInfo.account_name}
                    onChange={handleOnChange}
                    errMsg={errMsg && errMsg.account_name}

                  /> */}
                <TextField
                    label="BVN"
                      // value={userData.name}
                    // onClick={''}
                    type="text"
                    name="bvn"
                    paddingY="py-[0.5rem]"
                    fontSize="font-[500]"
                    textSize="text-[0.875rem]"
                    onChange={handleOnChange}
                    errMsg={errMsg && errMsg.bvn}

                  />
              </div>
              

              <div className="">
              {
                        errMsg.success ?  <p className='bg-[#F2FDF5] text-[#21C45D] font-[600] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]'>{errMsg.success}</p> : errMsg.error && <p className='bg-[#FDEAEA] text-[#FE5E55] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]'>{errMsg.error}</p>
              }
              </div>
                    
                    
              <div className="mt-[3rem] ">
                <Button text={isPending? "Updating..." : "Update details"} width="w-fit" padding="py-[0.6rem] px-[1rem]" type="submit"/>
              </div>
          </form>
        </div>
    </div>
  )
}
