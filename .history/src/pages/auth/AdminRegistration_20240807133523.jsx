import React from 'react'
import HeaderForm from '../../components/shared/HeaderForm'
import SubheaderForm from '../../components/shared/SubheaderForm'
import RegistrationForm from '../../components/auth/admin/RegistrationForm'
import Testimonial from '../../components/admin/Testimonial'
 
export default function AdminRegistration() {
  return (
    <div className='containers pb-[3rem]'>
    <HeaderForm text='Have an account? ' linkText='Login here' path="/" />


        <div className="md:grid md:grid-cols-[55%_38%] md:gap-x-[3rem] lg:grid-cols-[55%_30%] lg:gap-x-[9rem] containers  mt-[3rem] ">

            <div>
                <SubheaderForm label="Register on Milarn today" desc="Get started with creating account first." />
        
                <RegistrationForm />  

            </div>
  

            <Testimonial />

        </div>
  

</div>
  )
}
