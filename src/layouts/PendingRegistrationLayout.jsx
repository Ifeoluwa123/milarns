import React from 'react'
import {Navigate, Outlet, useLocation, Link} from 'react-router-dom'
import SubheaderForm from '../components/shared/SubheaderForm'

import HelloHand from '../assets/images/hand.png'
import CheckIcon from '../assets/images/checkbox.png'
import { useFormOneAndTwoDataQuery } from '../services/admin/queries'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function PendingRegistrationLayout() {

    let {pathname} = useLocation()
    const queryClient = useQueryClient();



    // const adminInfo = localStorage.getItem('adminInfo')
    // const tokenKey = localStorage.getItem('adminToken')
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))


    if(adminInfo){
        try {
            const adminData = JSON.parse(adminInfo)

            if((adminInfo.organization.length === 0 || adminInfo.token.access === null) ){
                    return <Navigate to="/" />
                }
 
                if(adminInfo.token.access !== null && adminInfo.organization.account_status === "approved" ){
                    return <Navigate to="/admin" />
                    }


            
        } catch(e) {

        }

    }else{
        return <Navigate to="/" />
    }

    // console.log(JSON.parse(adminInfo).code)
    let {data, isLoading, isError, error} = useFormOneAndTwoDataQuery(adminInfo.organization.code)
 

    // console.log(data)
    if(isLoading) {
        return <h1>Loading...</h1>
    }
    
   
    const logout = ()=> {
        localStorage.clear();
        sessionStorage.clear()
        queryClient.clear()
        // queryClient.removeQueries("mutiStepForm")
        // queryClient.removeQueries("hearAboutUs")
        // queryClient.removeQueries("orgIndustry")
        // queryClient.removeQueries("adminData")
    }
  return (
    <div className='bg-[var(--grey-color)]  pb-[3rem] flex flex-col justify-center items-center'>
     <div className="pt-[1.5rem] pr-[1rem] hover:cursor-pointer w-full text-right">
            <Link onClick={logout}>Logout</Link>
        </div>
    
    <div className="h-full mt-[1.5rem] px-[1rem] text-center">
    <SubheaderForm img={  pathname === '/onbording_success' ?CheckIcon : HelloHand} label={pathname === '/onbording_success'? 'Congratulations! You have successfully onboard.': ` Welcome onboard ${name} `} desc={pathname === '/onbording_success'? 'Thank you for asking our onboarding questions': "Complete these simple steps to get your organization up and running on Milarn"} />
    {/* <SubheaderForm img={HelloHand} label={`Welcome onboard ${name} `} desc="Complete these simple steps to get your organization up and running on WagePull" /> */}
    
    <div className="text-left">
       
    <Outlet context={{data:data,isError:isError,error: error}} />
    </div>
    </div>
</div>
  )
}
