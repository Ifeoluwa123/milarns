import React, { useState } from 'react'
import TextField from '../../shared/TextField'
import Button from '../../shared/Button'
import { Link, useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2'

import AlertMessages from '../../shared/AlertMessages'
import Spinner from '../../shared/Spinner'
import { useNewPasswordMutation } from '../../../services/admin/mutation'
import Error404 from '../../../pages/Error404'

export default function SetNewPassword() {


    let [newPwd, setNewPwd] = useState({
        pwd:'',
        confirm:'',
    })
    let [errMsgs, setErrMsgs] = useState({err:'', success:''})

    let {mutate, isPending,  isSuccess, data, isError, error} = useNewPasswordMutation()

    let navigate = useNavigate()
    const handleSubmit =(e) => {
        e.preventDefault()
        setErrMsgs(validate(newPwd))
        const tokens = sessionStorage.getItem('pwdToken')

      
            
        if(newPwd.pwd != '' && newPwd.confirm != ''){
            return mutate({token:tokens, password:newPwd.pwd},{
                onSuccess:(data)=>{
                 
                    if(data.status === 200){
                        setNewPwd({
                            pwd:'',
                            confirm:'',
                        })
                        // setErrMsgs({success: "Password Change Successfull."});
                        sessionStorage.removeItem('pwdToken')
                        return navigate("/",{state:{message:"Password Change Successfully."}})
                    }
                }, 
                onError:(err)=>{
                    console.log(err)
                    setErrMsgs(({confirms:err.response.data.message}))
                }
               
            })
        }

        if(isError){
            return <Error404 desc={error.message} />
        }
    
        // if(Object.keys(errMsgs).length === 0 &&  tokens){
            
        // }
      
        
        // if(newPwd.pwd.trim() === '') {
        //     setErrMsg({
        //         ...errMsg,
        //         pwd:"This field is required"
        //     })
        // }
        // if(newPwd.pwd.trim() !== newPwd.confirm.trim() ){
        //     setErrMsg("Password do not match")
        // }else{

        // }

  
    }

  return (
    <div className='relativ'>
    {/* <Spinner /> */}
    <form onSubmit={handleSubmit} className="mt-[2rem] ">

       {
        errMsgs && <div className={`${errMsgs.confirms && 'bg-[#FDEAEA] text-[#FE5E55] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{errMsgs.confirms}</div>
       } 
         {/* {
     errMsgs.success && <div className={`${ errMsgs.success && 'bg-[var(--primary-color)] text-white mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{ errMsgs.success}</div>
        }  */}
        <div className="mb-[1rem]">
            <TextField
                label="Password"
                type="password"
                placeholder="Enter password"
                name="password"
                value={newPwd.pwd}
                errMsg={errMsgs?.pwd && errMsgs.pwd }
                onChange={(e)=>(setNewPwd({...newPwd, pwd:e.target.value}))}
                // value ={loginData.email}
            />
        </div>  
       
        <div className="mb-[1rem]">
            <TextField
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                name="confirm_password"
                value={newPwd.confirm}
                errMsg={errMsgs?.confirm && errMsgs.confirm }
                onChange={(e)=>(setNewPwd({...newPwd, confirm:e.target.value}))}
          
                
            />
        </div>  
        {/* <div className="mb-[1rem] flex justify-start sm:justify-end">
            <p className='font-[400] text-[1rem] '>Forgot password? <Link to="/reset-password" className='text-[var(--secondary-color)]'> Reset password </Link></p>
        </div>   */}

        <div className="mb-[4rem]">
            <Button text={isPending? "Loading..." : "Set New Password"} type="submit" />

        </div> 

        {/* <div className="mb-[2rem] flex justify-start">
            <p className='font-[400] text-[1rem] '>Don’t have an account? <Link to="/register" className='text-[var(--secondary-color)]'> Create an account </Link></p>
        </div>    */}

        </form>
</div>
  )
}


function validate(obj){
    let errorMsg = {};
    if(obj.pwd.trim() === ''){
        errorMsg.pwd = "This field is required";
    }
    if(obj.confirm.trim() === ''){
        errorMsg.confirm = "This field is required";
    }
    if(obj.pwd.trim() !== '' && obj.confirm.trim() !== '' && obj.pwd !== obj.confirm){
        errorMsg.confirms = "Passwords do not match";
    }
    return errorMsg;
}