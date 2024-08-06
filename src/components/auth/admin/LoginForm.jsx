import React, { useState } from 'react'

import Button from '../../shared/Button' 
import {  Link, useLocation} from 'react-router-dom'
import Swal from 'sweetalert2'


import Spinner from '../../shared/Spinner'
import TextField from '../../shared/TextField'
import { useAdminLoginMutation } from '../../../services/admin/mutation'
import removeEmptyValues from '../../../utilities/removeEmptyValues'
import getKeysWithEmptyValues from '../../../utilities/getKeysWithEmptyValues'
import Error404 from '../../../pages/Error404'


export default function LoginForm() {
     
    let [adminCredentials, setAdminCredentials] = useState({
        email:'',
        password:''
    })
    let [errMsg, setErrMsg] = useState(null)
    let {isError, error, isPending, mutateAsync} = useAdminLoginMutation()

    const  handleOnchange = (e) => {   
        let {value, name} = e.target
        setAdminCredentials({
            ...adminCredentials,
            [name]:value
        })
        setErrMsg(null)
    }

    if(isError && !error.response.data.message){
        return <Error404 message={error.message} desc="Please check your network connection" />
    }

const handleSubmit = (e)=>{
    e.preventDefault()
    setErrMsg(validate(adminCredentials))

    if(!errMsg){
        return mutateAsync(adminCredentials,{
            onError:(err)=>{
                console.log(err)
            }
        })
    }
  
   
    
}


let {state} = useLocation()



        return (
            <div className='relativ'>
                {/* {isPending?  <Spinner /> : null} */}
            
            <form onSubmit={handleSubmit}  className="mt-[2rem] ">

               {
                error  && <div className={`${error?.response.data.message && 'bg-[#FDEAEA] text-[#FE5E55] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{error?.response.data.message}</div>
               } 

                  {
     state && <div className={`${ state.message && 'bg-[#F2FDF5] text-[#21C45D] font-[600] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{ state.message}</div>
        } 
                <div className="mb-[1rem]">
                    <TextField
                        label="Email"
                        type="text"
                        placeholder="eg. yourname@gmail.com"
                        value={adminCredentials.email}
                        onChange={handleOnchange}
                        // errMsg={error && error?.response.data.errors.email}
                        errMsg={errMsg && errMsg.email}
                        name="email"
                        // value ={loginData.email}
                    />
                </div>  
              
                <div className="mb-[1rem]">
                    <TextField
                        label="Password"
                        type="password"
                        placeholder="Enter Password"
                        value={adminCredentials.password}
                        onChange={handleOnchange}
                        errMsg={errMsg && errMsg.password}
                       
                        name="password"
                        // value ={loginData.password}
                        
                    />
                </div>  
                <div className="mb-[1rem] flex justify-start sm:justify-end">
                    <p className='font-[400] text-[1rem] '>Forgot password? <Link to="/reset-password" className='text-[var(--secondary-color)]'> Reset password </Link></p>
                </div>  
    
                <div className="mb-[4rem]">
                    <Button text={isPending? "Loading...": "Login"} type="submit" />
                    {/* <Button text={<span>Loading...</span>} type="submit" onClick={handleSubmit}/> */}
                    {/* <Button text="Login" type="internal-link" path="/admin-dashboard"/> */}
                </div> 
    
                <div className="mb-[2rem] flex justify-start">
                    <p className='font-[400] text-[1rem] '>Don’t have an account? <Link to="/register" className='text-[var(--secondary-color)]'> Create an account </Link></p>
                </div>   
    
                </form>
        </div>
          )

    }
 



const validate = (obj) => {
    const errorMsg = {}

    if (!obj.email.trim()) {
        errorMsg.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(obj.email)) {
        errorMsg.email = 'Invalid email address';
      }

      if (!obj.password.trim()) {
        errorMsg.password = 'Password is required';
      }

    if(!Object.keys(errorMsg).length > 0){
            return false
    }
       
    return errorMsg
    
}