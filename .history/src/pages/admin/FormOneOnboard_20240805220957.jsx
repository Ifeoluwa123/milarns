import React, { useEffect, useState } from 'react'
import TextField from '../../components/shared/TextField'
import Button from '../../components/shared/Button'
import { useNavigate,  useOutletContext} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import arrayToObject from '../../utilities/arrayToObject'
import SelectField from '../../components/shared/SelectField'
import Error404 from '../Error404'
import { useHearAboutUs, useOrganizationIndustry } from '../../services/admin/queries'
import { useFormOneAndTwoMutation } from '../../services/admin/mutation'
import {useQueryClient} from '@tanstack/react-query'
import validateUserData from '../../utilities/validateUserData'
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter'
import displayErrorMessages from '../../components/shared/displayErrorMessages'

export default function FormOneOnboard() {

  let {data:userData,isError, error } = useOutletContext()


    let inputFields = {}


    // website: userData?.website,
    

  
      if(userData){
        inputFields = {
          role: userData?.role,
          address:userData?.address,
          number_of_staff:userData?.number_of_staff,
          
          about: userData?.about,
          industry_id: userData?.industry.code,
          hear_about_us_id: userData?.hear_about_us.code
      
        }
      }else{
         
          return <Error404 status={error.response.status} message={error.response.data.message} desc ={error.message} />
      }
  

    let navigate = useNavigate()
  let [data, setData] = useState(inputFields)

  const handleOnChange = (e) => {

    let {name, value} = e.target

    setData({
      ...data, 
      [name]:value
    })

  }
    



  let {mutate, isPending,isError:isErrors,error:errors, isSuccess} = useFormOneAndTwoMutation()

  let [errMsgs, setErrMsgs] = useState({})
  const queryClient = useQueryClient();
  const handleSubmit =  (e)=>{
      e.preventDefault()
      
      if(validateUserData(data, setErrMsgs )){
        data.website = 
        mutate(data,{
          onSuccess:(response)=>{
         
          
           navigate('/organizationInformation')
          },

          onError:(err)=>{
              displayErrorMessages(err.response.data)
          },
  
          onSettled: async function(){
         
             return queryClient.invalidateQueries({ queryKey: ["mutiStepForm"] });
          
          }
        })
      }else{
        console.log(errMsgs)
      }
     
      
   
  }
 

  // Fetch Industry Information
  let {data:industry} = useOrganizationIndustry()

  //Fetch About Us Information
  let {data:aboutUs} = useHearAboutUs()

  return (
    <div className='bg-white  mt-[1rem] rounded-[4px] px-[1rem] md:px-[2rem] py-[2rem] pb-[0.4rem]'>
        <div className="flex justify-between items-center text-[0.9rem]">
            <h1 className='font-[600]'>Organisation Information</h1>
            <p className='text-[var(--primary-color)] uppercase'>Step 1 / 2</p>
        </div>


        <form onSubmit={handleSubmit} >
        <div className="mt-[3rem]">

          <div className="my-[1rem]">
              <TextField 
                    label={`Whats your role at ${userData.name && userData.name}`}
                    fontSize="text-[0.75rem] font-[600]"
                    type="text"
                    paddingY="py-[0.6rem]"
                    defaultValue={data && data.role}
                    name="role"
                    onChange={handleOnChange}
                    errMsg={errMsgs.role && capitalizeFirstLetter(errMsgs.role)}
                    // errMsg="hjkkj"

                  />
          </div>
          <div className="my-[1rem]">
          <div className='flex flex-col justify-center mt-[-6px]'>
        <label htmlFor='industry' className="font-[600] text-[0.875rem]" >What  industry best describes your organisation?</label>
        <select defaultValue = {data.industry_id} onChange={(e)=>setData({...data, industry_id:e.target.value})}   id='indeustry'  name="industry_id"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.9rem] w-full  transition-[border] duration-[0.4s] rounded-[6px]">
        
            <option disabled >--Select--</option>
            { 
                industry?.map((item, i)=>(
                    <option key={i} value={item.code}  >{item.name}</option>
                ))
            }
            
         
        </select>
    </div>
            
          </div>
          <div className="my-[1rem]">
            <TextField 
                    label="Organisation Address"
                    fontSize="text-[0.75rem] font-[600]"
                    type="textarea"
                    paddingY="py-[0.6rem]"
                    name="address"
                    defaultValue={data && data.address}
                    onChange={handleOnChange}
                    errMsg={errMsgs.address && capitalizeFirstLetter(errMsgs.address)}
                    // errMsg="hjkkj"

                  />
             
          </div>
          <div className="md:grid grid-cols-2 gap-x-[1rem] my-[1rem]">

              <div className="my-[1rem] md:my-0">
              <TextField 
                    label="Number of staffs"
                    fontSize="text-[0.75rem] font-[600]"
                    type="text"
                    paddingY="py-[0.6rem]"
                    name="number_of_staff"
                    defaultValue={data && data.number_of_staff}
                    onChange={handleOnChange}
                    errMsg={errMsgs.number_of_staff && capitalizeFirstLetter(errMsgs.number_of_staff)}
                    // errMsg="hjkkj"

                  />
              </div>
              <div className="my-[1rem] md:my-0">
              <TextField 
                    label="Organisation website"
                    fontSize="text-[0.75rem] font-[600]"
                    type="text"
                    paddingY="py-[0.6rem]"
                    name="website"
                    defaultValue={data && data.website}
                    onChange={handleOnChange}
                    errMsg={errMsgs.website && capitalizeFirstLetter(errMsgs.website)}
                    // errMsg="hjkkj"

                  />
              </div>
             
          </div>

          <div className="my-[1rem]">

          <div className='flex flex-col justify-center mt-[-6px]'>
        <label htmlFor='hear_about_us' className="font-[600] text-[0.875rem]" >How do you get to know about WagePull?</label>
        <select   id='hear_about_us' defaultValue={data.hear_about_us_id} onChange={(e)=>setData({...data, hear_about_us_id:e.target.value})}  name="hear_about_us_id"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.9rem] w-full  transition-[border] duration-[0.4s] rounded-[6px]">
            <option disabled >--Select--</option>
            { 
                aboutUs?.map((item, i)=>(
                    <option key={i} value={item.code}  >{item.name}</option>
                ))
            }
            
         
        </select>
    </div>
            {/* <TextField 
                    label="How do you get to know about WagePull?"
                    fontSize="text-[0.75rem] font-[600]"
                    type="text"
                    paddingY="py-[0.6rem]"
                    name="hear_about_us_id" 
                    defaultValue={data.hear_about_us}
                    // value="No 4 Newway street, Ikeja Lagos, Nigeria"
                    // errMsg="hjkkj"

                  /> */}
             
          </div>
          <div className="my-[1rem]">
            <TextField 
                    label="Tell us a bit about your organisation"
                    fontSize="text-[0.75rem] font-[600]"
                    type="textarea"
                    paddingY="py-[0.6rem]"
                    name="about"
                    defaultValue={data.about}
                    onChange={handleOnChange}
                    errMsg={errMsgs.about && capitalizeFirstLetter(errMsgs.about)}
                    // value="No 4 Newway street, Ikeja Lagos, Nigeria"
                    // errMsg="hjkkj"

                  />
             
          </div>
          <div className="my-[1rem]">
              <Button text={isPending? "Loading..." : "Save & Proceed" } type="submit" padding="py-[0.6rem]" />
             
          </div>
             
        </div>
        </form>
    </div>
  )
}
