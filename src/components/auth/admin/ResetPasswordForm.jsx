import React, { useEffect, useState } from 'react'
import TextField from '../../shared/TextField'
import Button from '../../shared/Button'
import { Link } from 'react-router-dom'



import { useForgetPasswordMutation } from '../../../services/admin/mutation'
import Error404 from '../../../pages/Error404'


export default function ResetPassword() {
  
  const [userEmail, setUserEmail] = useState('')
  const [errMsg, setErrMsg] = useState(null)



  let  { mutate, error, isPending, data,  isError } = useForgetPasswordMutation()


  // console.log(error?.response.data.message)


    const handleSubmitEmail  = (e) => {
        e.preventDefault()
        setErrMsg(null)
        if (!userEmail.trim()) {
          setErrMsg('This field is required');
        } else if (!/^\S+@\S+\.\S+$/.test(userEmail)) {
          setErrMsg('Invalid email address');
        }
        else{
          sessionStorage.setItem('email', userEmail);
          return mutate(userEmail)
        }

        

      
    }
   

    if(isError){
      return <Error404 desc={error.message} />
  }


  return ( 
    <div>


     
          <form  className="mt-[1rem] ">
          
          {
         error?.response.data.message && 
          <div className={`bg-[#FDEAEA] text-[#FE5E55] mb-[1rem]  rounded-[4px] w-fit p-[4px_20px_4px_20px]`}>
                {/* Error: {error?.response.data.message} */}
              {error?.response.data.message}
        </div>
         }

          <div className="mb-[2rem]">
              <TextField
                  label="Email"
                  type="text"
                  placeholder="eg. yourname@gmail.com"
                  name='email'
                  errMsg={errMsg && errMsg}
                  onChange= {(e)=>(setUserEmail(e.target.value))}
                  
              />
            </div>  



          <div className="mb-[4rem]">
              <Button type="button"  onClick={handleSubmitEmail } text={isPending? "Loading..." : "Reset password"}
             
              />
              {/* <Button onPress={onOpen}>Open Modal</Button> */}
            </div> 

            <div className="mb-[2rem] flex justify-start ">
              <p className='font-[400] text-[1rem] '>Don’t have an account with WagePull? <Link to="/register" className='text-[var(--secondary-color)]'> Create an account </Link></p>
            </div>   

          </form>
    </div>
  )
}
