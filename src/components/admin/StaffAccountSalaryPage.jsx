import React, { useState } from 'react'
import TextField from '../shared/TextField'
import SelectField from '../shared/SelectField'
import { useLoaderData, useParams } from 'react-router-dom'
import InnerButton from '../shared/InnerButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useBankNames } from '../../services/admin/queries'
import { useUpdateBankEmployeeData } from '../../services/admin/mutation'
import AlertMessages from '../shared/AlertMessages'
import displayErrorMessages from '../shared/displayErrorMessages'
// import { updateSingleEmployeeRecord } from '../../services/staffListPage'


export default function StaffAccountSalaryPage({data}) {

    
    let {staffId} = useParams()
    let {data:bankList} = useBankNames()
    const queryClient = useQueryClient();
  // console.log(data)
    const [employeeData, setEmployeeData] = useState(

      {
        bankinformation: {

          account_number: data && data.bankinformation.account_number,
          bank_code: data && data.bankinformation.bank_code,
          bvn: data && data.bankinformation.bvn,
          // last_name:data && data.last_name,
     
  
        }

      }
     
      )

      const handleOnChange = (e)=>{
        const { name, value } = e.target;
        console.log(employeeData)
        setEmployeeData(prev=>({
            ...prev,
            bankinformation:{
              ...prev.bankinformation,
              [name]: value
            }
           
        }))
    }


   
    queryClient.invalidateQueries({ queryKey: ["getSingleDetailsEmployeeData"+staffId] })
    
    let {mutate, isPending, isSuccess}  = useUpdateBankEmployeeData()
 
    const handleSubmit = (e) => {
      e.preventDefault()
  







      
    // const formData = new FormData();
    
    // // Append each key-value pair to the FormData object
    // Object.entries(employeeData).forEach(([key, value]) => {
    //     formData.append(key, value);
    // });
       mutate({staffCode:staffId, data:employeeData.bankinformation},{
      //  mutate({staffCode:staffId, data:employeeData},{
          onSuccess:(res)=>{
              console.log(res)
              AlertMessages(" Success", "Record Updated Successfully", "success")
              return  queryClient.invalidateQueries({ queryKey: ["employeesData"] });
          },
          onError:(err)=>{
              console.log(err)
              // AlertMessages(" Error", err.response.data.message, "error")
              displayErrorMessages(err.response.data)
          }
       })
      
     
  }


  return (
    <div className='pb-[3rem] lg:pb-0'>

       {/* Salary Account form */}
       <div className="">
            <p className='mb-[0.5rem] font-[600] '>Staff bank account details</p>
            
        </div>


        <div className="mt-[1.3rem]">
            <form >
                  <div className="grid md:grid-cols-3 gap-[1rem]">
                  <TextField
                        label="Account Number"
                        // onClick={''}
                        type="text"
                        paddingY="py-[0.5rem]"
                        fontSize="font-[500]"
                        textSize="text-[0.875rem]"
                        name="account_number"
                        defaultValue={employeeData.bankinformation.account_number}
                        onChange={handleOnChange}
                    />
                 
                  {/* <TextField
                        label="Last name"
                        // onClick={''}
                        type="text"
                        paddingY="py-[0.5rem]"
                        fontSize="font-[500]"
                        textSize="text-[0.875rem]"
                        name="last_name"
                        defaultValue = {employeeData.bankinformation.last_name}
                        onChange={handleOnChange}
                    /> */}
                   <div className='flex flex-col mb-[1rem] justify-center md:mb-[0.4rem]'>
                                    <label htmlFor='bank_code' className=" text-[0.875rem] " >Bank name</label>
                                    <select defaultValue={employeeData.bankinformation.bank_code}  onChange={handleOnChange}   id='bank_code'  name="bank_code"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.5rem] w-full  transition-[border] duration-[0.4s] rounded-[6px] ">
                                    
                                        <option disabled >--Select--</option>
                                        { 
                                            bankList?.map((item, i)=>(
                                                <option key={i} value={item.code}  >{item.name}</option>
                                            ))
                                        }
                                        
                                    
                                    </select>

                      </div>
                  <TextField
                        label="BVN"
                       
                        // onClick={''}
                        type="text"
                        paddingY="py-[0.5rem]"
                        fontSize="font-[500]"
                        textSize="text-[0.875rem]"
                        name="bvn"
                        defaultValue={employeeData.bankinformation.bvn}
                        onChange={handleOnChange}
                    />
                    </div>


<div className="">
                                        {
                                          !isSuccess? null  : <p className='py-[1rem] text-[var(--primary-color)]'>Record updated Successfully</p>
                                        }
</div>
                    <div className=" mt-[3rem]">
                        <div className="flex items-start flex-wrap gap-x-[1rem] sm:flex-nowrap gap-y-[1.5rem]">
                            <InnerButton onClick={handleSubmit } text={`${ isPending && !isSuccess? "Loading...": "Update profile"}`}  type="button"  width="w-fit " />
                         

                            {/* <button type="button" className='p-[14px_28px_14px_28px] hover:bg-[var(--grey-color)]  hover:border-none transition-all duration-[0.3s]  border-[1px] border-[#374151] rounded-[4px]'>Delete</button> */}
                        </div>
                   </div>
            </form>
        </div>
    </div>
  )
}
