import React, { useEffect, useState } from 'react'
import TextField from '../../shared/TextField'
import Button from '../../shared/Button'
import { Form, Link, useNavigate } from 'react-router-dom'
import validateUserData from '../../../utilities/validateUserData'
import capitalizeFirstLetter from '../../../utilities/capitalizeFirstLetter'
import { useRegOrgMutation } from '../../../services/admin/mutation'
import displayErrorMessages from '../../shared/displayErrorMessages'


export default function RegistrationForm() {

  let navigate = useNavigate()


  const registerField = {
    country_code:'',
    email:'',
    first_name:'',
    last_name:'',
    name:'',
    password:'',
    phone_number:''

} 

  let [userData, setUserData] = useState(registerField)
  let [errMsg, setErrMsg] = useState({})
     
let [confirmPwd, setConfirmPwd] = useState('')
     let handleOnchange = (e)=>{
          let {value, name} = e.target
          setUserData({
            ...userData,
            [name]:value
          })
          
     }

     

let {mutate, isPending} = useRegOrgMutation()
    let handleOnSubmit = (e)=>{
      e.preventDefault()
      if(validateUserData(userData, setErrMsg)){
        return mutate(userData,{
          onSuccess:(result)=>{
            
               return navigate('/verify-otp-reg') 
          },
          onError:(err)=>{
            console.log(err.response.data.message);
            displayErrorMessages(err.response.data)
            setErrMsg({error: err.response.data.message});
          },
          onSettled:(res)=>{
            
            setErrMsg({success: res.message});
            setUserData(registerField)
            sessionStorage.setItem("email", userData.email)
           
          }
        })
      }else{
        console.log(errMsg)
      }
      
    }

     
  return (
    <div>
         <form onSubmit={handleOnSubmit}>
            <div className="my-[1.4rem]">
            {
                errMsg.error && <div className={`${errMsg.error && 'bg-[#FDEAEA] text-[#FE5E55] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{errMsg.error}</div>
               } 
            {
                errMsg.success && <div className={`${ errMsg.success && 'bg-[var(--primary-color)] text-white mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{ errMsg.success}</div>
               } 
            </div>


                          <div className="mt-[1rem] grid md:grid-cols-2 gap-x-[3rem] md:gap-x-[1rem] lg:gap-x-[2rem]">
                            <div className=" mb-[2rem]">
                              <TextField
                                label="First Name"
                                placeholder="Enter your first name"
                                name="first_name"
                                errMsg={errMsg && capitalizeFirstLetter(errMsg.first_name)}
                                value={userData.first_name}
                                type="text"
                                onChange = {handleOnchange}
                              />
                            </div>

 

                            <div className=" mb-[2rem]">
                              {/* <label htmlFor="input-last-name" className='text-[0.875rem] font-[600]'>Last Name</label>
                              <input type="text" id="input-last-name" className=' text-[0.85rem] mt-[0.6rem] border-[0.9px] py-[0.9rem] px-[0.6rem] transition-[border] duration-[0.4s] focus:input-border rounded-[5px] outline-none' placeholder='Enter your last name' />
                                <span className='invisible mt-[0.4rem] ml-[0.2rem] text-[0.8rem]'>Error Message</span>
                             */}
                                <TextField
                                label="Last Name"
                                placeholder="Enter your last name"
                                name="last_name"
                                errMsg={errMsg && capitalizeFirstLetter(errMsg.last_name)}
                                value={userData.last_name}
                                type="text"
                                onChange = {handleOnchange}
                              />
                            
                            
                            
                            </div>
                            <div className=" mb-[2rem]">
                            
                            <TextField
                                label="Email"
                                placeholder="eg. yourname@gmail.com"
                                name="email"
                                errMsg={errMsg && capitalizeFirstLetter(errMsg.email)}
                                value={userData.email}
                                type="text"
                                onChange = {handleOnchange}
                              />
                            
                            </div>
                           
                            <div className=" mb-[2rem]">
                            {/* <label htmlFor="input-phone" className='text-[0.875rem] font-[600] mb-[0.6rem]'>Phone Number</label> */}
                            
                            <TextField
                                label="Phone Number"
                                placeholder="eg.09001******"
                                name="phone_number"
                                errMsg={errMsg && capitalizeFirstLetter(errMsg.phone_number)}
                                value={userData.phone_number}
                                type="number"
                                onChange = {(value, data, event, formattedValue)=>setUserData({...userData, phone_number:value, country_code:data.dialCode})}
                            
                            />
                        
                             
                            </div>
                            <div className=" mb-[2rem]">
                            
                                <TextField
                                label="Password"
                                placeholder="Enter Password "
                                name="password"
                                errMsg={errMsg && capitalizeFirstLetter(errMsg.password)}
                                value={userData.password}
                                type="password"
                                onChange = {handleOnchange}
                              />
                            
                            
                            </div>
                            <div className=" mb-[0.8rem] ">
                             

                            <TextField
                                label="Confirm Password"
                                placeholder="Confirm Password "
                                name="confirmPwd"
                                // errMsg={confirmPwd && "This fiels to be confirmed"}
                                value={confirmPwd}
                                type="password"
                                onChange = {(e)=>setConfirmPwd(e.target.value)}
                              />
                            </div>
                            <div className=" col-span-full mb-[1.6rem] mt-[1rem]">
                            
                            <TextField
                                label="Company or Organization Name"
                                placeholder="Enter Organization Name "
                                name="name"
                                errMsg={errMsg && capitalizeFirstLetter(errMsg.name)}
                                value={userData.name}
                                type="text"
                                onChange = {handleOnchange}
                              />
                            
                            </div>
                            
                          </div>
                         

                              <div>
                                <Button 
                             
                                type="submit"
                                text={isPending? "Loading...":"Create Account" } />
                              </div>

                          <div className='pt-[3rem] pb-[3rem] '>
                            <p className='text-[1rem]'> Have an account with Milarn? <Link to="/" className='text-[var(--secondary-color)]'>Login here</Link></p>
                          </div>
                       </form>
    </div>
  )
}


