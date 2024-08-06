import React from 'react'
import TextField from '../../shared/TextField'
import Button from '../../shared/Button'
import { useState } from 'react'


export default function SuperAdminLoginForm() {
    let [loginCredentials, setLoginCredentials] = useState({
        email:'',
        password:''
    })
       
    const  handleOnchange = (e) => {   
        let {value, name} = e.target
        setLoginCredentials({
            ...loginCredentials,
            [name]:value
        })
        setErrMsg(null)
    }


  return (
    <div className=''>
        <form  >

{/* {
 response && <div className={`${response.error && 'bg-[#FDEAEA] text-[#FE5E55] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{response.error}</div>
}  */}
 <div className="mb-[1rem]">
     <TextField
         label="Email"
         type="text"
         placeholder="e.g. yourname@gmail.com"
         name="email"
         paddingY="py-[0.7rem] md:py-[0.5rem]"
        //  errMsg={response && response.email }
         // value ={loginData.email}
     />
 </div>  

 <div className="mb-[1rem]">
     <TextField
         label="Password"
         type="password"
         placeholder="Enter password"
         name="password"
         paddingY="py-[0.7rem] md:py-[0.5rem]"
        //  errMsg={response && response.password }
   
         
     />
 </div>  
 {/* <div className="mb-[1rem] flex justify-start sm:justify-end">
     <p className='font-[400] text-[1rem] '>Forgot password? <Link to="/reset-password" className='text-[var(--secondary-color)]'> Reset password </Link></p>
 </div>   */}

 <div >
     <Button text="Login" type="submit"   padding="py-[0.5rem] text-center"/>

 </div> 

 {/* <div className="mb-[2rem] flex justify-start">
     <p className='font-[400] text-[1rem] '>Don’t have an account? <Link to="/register" className='text-[var(--secondary-color)]'> Create an account </Link></p>
 </div>    */}

 </form>
    </div>
  )
}
