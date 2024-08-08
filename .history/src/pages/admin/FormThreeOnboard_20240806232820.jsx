import React, { useState } from 'react'
import TextField from '../../components/shared/TextField'
import Button from '../../components/shared/Button'
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useOutletContext} from 'react-router-dom';
import { useBankNames } from '../../services/admin/queries';
import { useFormThree } from '../../services/admin/mutation';
import {useQueryClient} from '@tanstack/react-query'
import Error404 from '../Error404';
import validateUserData from '../../utilities/validateUserData';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';
import SelectField from '../../components/shared/SelectField';
import displayErrorMessages from '../../components/shared/displayErrorMessages';
export default function FormThreeOnboarding() {
  let navigate = useNavigate()
  



  let {data:userData,isError, error } = useOutletContext()

      
  let inputFields = {}
 
  if(userData){
    inputFields = {
      // first_name:userData.bankinformation.first_name,
      // last_name:userData.bankinformation.last_name,
      bank_code:userData.bankinformation.bank_code ? userData.bankinformation.bank_code : '',
      account_number:userData.bankinformation.account_number ? userData.bankinformation.account_number : '',
      phone_number:userData.bankinformation.phone_number ? userData.bankinformation.phone_number : '',
      bvn:null


  
    }
  }else{
     
      return <Error404 status={error.response.status} message={error.response.data.message} desc ={error.message} />
  }

// console.log( userData)
  
let [data, setData] = useState(inputFields)

const handleOnChange = (e) => {

  let {name, value} = e.target
 

 setData({
    ...data, 
    [name]:value
  })

}


let {mutate, isPending,isLoading, isSuccess,isError:isErrors, error:errMsg} = useFormThree()
const queryClient = useQueryClient();


let [errMsgs, setErrMsgs] = useState({})
const handleSubmit = (e)=>{
    e.preventDefault()
  console.log(data)
    if(validateUserData(data, setErrMsgs )){

      // console.log(data)

      mutate(data,
        {
          onSuccess:(response)=>{
          
          
          //  navigate('/onboarding_success')
          },
          onError:(error)=>{
              if(error){
                console.log(error.response.data.message)
                displayErrorMessages(error)
              }
          },
    
          onSettled: async function(){
         
             return queryClient.invalidateQueries({ queryKey: ["mutiStepForm"] });
          
          }
        })


    }else{
      console.log(errMsgs)
    }
 

 
}


//Fetch Bank List
let {data:bankList} = useBankNames()




if(isError){
  return <h1>errMsg</h1>
}

if(isSuccess){
  navigate('/onboarding_success')
}

  return (
    <div className='bg-white  mt-[1rem] rounded-[4px] px-[1rem] md:px-[2rem] py-[2rem] max-w-[570px] w-full'>
        <div className="flex justify-between items-center text-[0.9rem]">
            <h1 className='font-[600]'>Verify Identity</h1>
            <p className='text-[var(--primary-color)] uppercase'>Step 3 / 3</p>
        </div>

        {/* <div className="bg-[#F5F5F5] p-[10px] mt-[2rem] rounded-[4px] md:w-[90%] w-full">
            <p className='text-[var(--primary-color)]'>Enter your organization's salary account for staff payment, not your personal bank details. </p>
        </div> */}

        <form onSubmit={handleSubmit}>
        <div className="mt-[2rem]">
              {/* <div className="md:grid   gap-x-[1rem] grid-cols-2 ">
                <div className="md:my-0 my-[1rem]">
                <TextField 
                        label="First name"
                        fontSize="text-[0.75rem] font-[600] w-full "
                        type="text"
                        paddingY="py-[0.6rem]"
                        name="first_name"
                        defaultValue = {data.first_name}
                        onChange={handleOnChange}
                        errMsg={errMsgs.first_name && capitalizeFirstLetter(errMsgs.first_name)}
                        // value="General Manager"
                        // errMsg="hjkkj"

                      />
                </div>
                 

                 <div className="md:my-0 my-[1rem]">
                 <TextField 
                        label="Last name"
                        fontSize="text-[0.75rem] font-[600] w-full"
                        type="text"
                        paddingY="py-[0.6rem]"
                        name="last_name"
                        defaultValue = {data.last_name}
                        onChange={handleOnChange}
                        errMsg={errMsgs.last_name && capitalizeFirstLetter(errMsgs.last_name)}
                        // value="General Manager"
                        // errMsg="hjkkj"

                      />
                 </div>
                 
              </div> */}
              <div className="md:grid gap-x-[1rem] grid-cols-2 md:my-[2rem]">

                
             
              <div className='flex flex-col justify-center mt-[-6px]'>
        <label htmlFor='bank_name' className="font-[600] text-[0.875rem] " >Bank name</label>
        <select defaultValue = {data.bank_code} onChange={(e)=>setData({...data, bank_code:e.target.value})}   id='bank_code'  name="bank_code"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.57rem] w-full  transition-[border] duration-[0.4s] rounded-[6px] ">
        
            <option disabled >--Select Bank--</option>
            { 
                bankList?.map((item, i)=>(
                    <option key={i} value={item.code}  >{item.name}</option>
                ))
            }
            
         
        </select>
 
                {/* <TextField 
                        label="Bank name"
                        fontSize="text-[0.75rem] font-[600] w-full"
                        type="text"
                        paddingY="py-[0.6rem]"
                        name="bank_name"
                        defaultValue = {data.bankinformation.bank_name}
                        
                        // value="General Manager"
                        // errMsg="hjkkj"

                      /> */}
     </div>
                 

                
                

     <div className="md:my-0 my-[1rem]">
                 <TextField 
                        label="Account number"
                        fontSize="text-[0.75rem] font-[600] w-full"
                        type="text"
                        paddingY="py-[0.6rem]"
                        name="account_number"
                        placeholder='Enter your Account Number'
                        defaultValue = {data.account_number}
                        onChange={handleOnChange}
                        errMsg={errMsgs.account_number && capitalizeFirstLetter(errMsgs.account_number)}
                        // errMsg={errMsg?.response.data.errors.account_number && errMsg.response.data.errors.account_number}
                        // value="General Manager"
                        // errMsg="hjkkj"

                      />
                 </div>

                 <div className="md:my-0 my-[1rem] md:mt-[2rem]">
                 <TextField 
                        label="BVN"
                        fontSize="text-[0.75rem] font-[600] w-full"
                        type="text"
                        paddingY="py-[0.6rem]"
                        name="bvn"
                        defaultValue={data.bvn}
                        placeholder='Enter your BVN'
                        onChange={handleOnChange}
                        errMsg={errMsgs.bvn && capitalizeFirstLetter(errMsgs.bvn)}
                        
                        // value="General Manager"
                        // errMsg="hjkkj"

                      />
                 </div>
                 <div className="md:my-0 my-[1rem] md:mt-[2rem]">
                 <TextField 
                        label="Phone Number"
                        fontSize="text-[0.75rem] font-[600] w-full"
                        type="text"
                        paddingY="py-[0.6rem]"
                        name="phone_number"
                        placeholder='Enter your Phone Number'
                        defaultValue={data.phone_number}
                        onChange={handleOnChange}
                        errMsg={errMsgs.phone_number && capitalizeFirstLetter(errMsgs.phone_number)}
                        
                        // value="General Manager"
                        // errMsg="hjkkj"

                      />
                 </div>
                  
              </div>
          
          <div className="mt-[1rem] mb-[1rem]">
              <Button type="submit" text={isPending? "Loading...": "Save & Submit" } padding="py-[0.6rem]" />
             
          </div>
          <div className="flex justify-center items-center">
              <button type="button" onClick={()=>navigate('/organizationInformation')} className='text-[#374151] flex items-center'><span className=""><MdArrowBackIos /></span> Previous Step</button>
          </div>
             
        </div>
        </form>
  </div>
  )
}
