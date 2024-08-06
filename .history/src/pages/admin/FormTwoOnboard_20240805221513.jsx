import React, { useState } from 'react'
import TextField from '../../components/shared/TextField'
import Button from '../../components/shared/Button'
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useOutletContext} from 'react-router-dom'
import Error404 from '../Error404';
import { useFormOneAndTwoMutation } from '../../services/admin/mutation';
import {useQueryClient } from "@tanstack/react-query"
import validateUserData from '../../utilities/validateUserData';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';
import displayErrorMessages from '../../components/shared/displayErrorMessages';

export default function FormTwoOnboard() {
  let navigate = useNavigate()

  let {data:userData,isError, error } = useOutletContext()

    
  let inputFields = {}
 
  if(userData){
    inputFields = {
      director_name:userData.director_name ,
      director_phone_number: userData.director_phone_number,
      lowest_paid_salary:userData.lowest_paid_salary,
      highest_paid_salary:userData.highest_paid_salary

  
    }
  }else{
     
      return <Error404 status={error.response.status} message={error.response.data.message} desc ={error.message} />
  }


  
let [data, setData] = useState(inputFields)


const handleOnChange = (e) => {

  let {name, value} = e.target

  setData({
    ...data, 
    [name]:value
  })

}


let {mutate, isPending} = useFormOneAndTwoMutation()
const queryClient = useQueryClient();
let [errMsgs, setErrMsgs] = useState({})
const handleSubmit =  (e)=>{
    e.preventDefault()
    // console.log(data)
    if(validateUserData(data, setErrMsgs )){
      return  mutate(data,{
        onSuccess:(response)=>{
        
          
          //  navigate('/onboarding_3')
          navigate('/success')
        },
        onError:(err)=>{
          displayErrorMessages(err.response.data)
        },
        onSettled: async function(){
         
        return await queryClient.invalidateQueries({ queryKey: ["mutiStepForm"] });
       }
      })
    }else{
      console.log(errMsgs)
    }
    
   
}



//   const handleSubmit = ()=>{
//     return navigate('/settings/3')
// }
 

  return (
    <div className="h-[90vh] md:h-[66vh]">
          <div className='bg-white  mt-[1rem] rounded-[4px] px-[1rem] md:px-[2rem] py-[2rem]'>
        <div className="flex justify-between items-center text-[0.9rem]">
            <h1 className='font-[600]'>Organisation Information</h1>
            <p className='text-[var(--primary-color)] uppercase'>Step 2 / 2</p>
        </div>


        <form onSubmit={handleSubmit } >
        <div className="mt-[3rem]">
              <div className="md:grid  gap-x-[1rem] grid-cols-2 ">
                <div className="md:my-0 my-[1rem]">
                <TextField 
                        label="The founder / CEO’s  name"
                        fontSize="text-[0.75rem] font-[600] w-full "
                        type="text"
                        paddingY="py-[0.6rem]"
                        name="director_name"
                        defaultValue={data.director_name}
                        onChange={handleOnChange}
                        errMsg={errMsgs.director_name && capitalizeFirstLetter(errMsgs.director_name)}
                        
                        // value="General Manager"
                        // errMsg="hjkkj"

                      />
                </div>
                 

                <div className="md:my-0 my-[1rem]">
                <TextField 
                        label="The CEO / founder’s phone number"
                        fontSize="text-[0.75rem] font-[600] w-full"
                        type="text"
                        paddingY="py-[0.6rem]"
                        name="director_phone_number"
                        defaultValue={data.director_phone_number}
                        onChange={handleOnChange}
                        errMsg={errMsgs.director_phone_number && capitalizeFirstLetter(errMsgs.director_phone_number)}
                        // value="General Manager"
                        // errMsg="hjkkj"

                      />
                </div>
                 
              </div>
              <div className="md:grid gap-x-[1rem] grid-cols-2 md:my-[2rem]">

                
                 

                 <div className="md:my-0 my-[1rem]  relative">
                 <TextField 
                        label="Lowest paid salary to staff"
                        fontSize="text-[0.75rem] font-[600] w-full"
                        type="text"
                        paddingY="py-[0.6rem]"
                        name="lowest_paid_salary"
                        // defaultValue={"₦"+ data.lowest_paid_salary +".00"}
                        defaultValue={data.lowest_paid_salary}
                        onChange={handleOnChange}
                        errMsg={errMsgs.lowest_paid_salary && capitalizeFirstLetter(errMsgs.lowest_paid_salary)}
                        // defaultValue={ data.lowest_paid_salary}
                        // errMsg="hjkkj"

                      />
                      <p className='absolute right-[10%] top-[53%] text-[0.8rem]'>per month</p>
                 </div>
                  
                 <div className="relative">
                    <TextField 
                              label="Highest paid salary to staff"
                              fontSize="text-[0.75rem] font-[600] w-full"
                              type="text"
                              paddingY="py-[0.6rem]"
                              name="highest_paid_salary"
                              // defaultValue={"₦"+ data.highest_paid_salary+".00"}
                              defaultValue={data.highest_paid_salary}
                              onChange={handleOnChange}
                              errMsg={errMsgs.highest_paid_salary && capitalizeFirstLetter(errMsgs.highest_paid_salary)}
                              // defaultValue={data.highest_paid_salary}
                              // errMsg="hjkkj"

                            />
                       <p className='absolute right-[10%] top-[53%] text-[0.8rem]'>per month</p>
              </div>
              </div>
              
          <div className="mt-[1rem] mb-[1rem]">
              {/* <Button type="submit" text={isPending? "Loading...": "Save & Proceed"} padding="py-[0.6rem]" /> */}
              {/* <Button type="submit" text={isPending? "Loading...": "Save & Submit"} padding="py-[0.6rem]" /> */}
              <Button type="submit" text={isPending? "Loading...": "Next"} padding="py-[0.6rem]" />
             
          </div>
          <div className="flex justify-center items-center">
              <button type="button" onClick={()=>navigate('/onboarding')} className='text-[#374151] flex items-center'><span className=""><MdArrowBackIos /></span> Previous Step</button>
          </div>
             
        </div>
        </form>
  </div>

    </div>
    
  )
}
