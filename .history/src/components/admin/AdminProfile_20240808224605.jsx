import React, { useEffect, useState } from 'react'
import ChangeUserImage from './ChangeUserImage'
import TextField from '../shared/TextField'
import SelectField from '../shared/SelectField'
import InnerButton from '../shared/InnerButton'
import { useCountryLists, useNigeriaState } from '../../services/admin/queries'
import Avatar from '../../assets/images/user.png'
import { useUpdateAdminProfile } from '../../services/admin/mutation'
import AlertMessages from '../shared/AlertMessages'


 
export default function AdminProfile() {

    let [userImage, setUserImage] = useState(Avatar)



    // let imageFile = {
    //     avatar:userImage
    // }


 

        

    

    let userData = localStorage.getItem("adminInfo")
    let user ={}
    if(userData ){
         user = JSON.parse(localStorage.getItem("adminInfo")).user
    }
   
    let initials = {
        first_name:user && user.first_name,
        last_name:user && user.last_name,
        gender:user && user.gender,
        phone_number:user && user.phone_number,
        whatsapp_number:user && user.whatsapp_number,
        email:user && user.email,
        home_address:user && user.home_address,
        state:user && user.state,
        country_code:user && user.country_code,
        avatar:user && user.avatar,

    }

    let [userInfo, setUserInfo] = useState(initials)
    
    let {data:country} = useCountryLists()
    let {data:state} = useNigeriaState()


    //  let imageFile = {
    //     avatar:userImage
    // }
    useEffect(()=>{

        let changeImage = ()=>  setUserInfo(prev=>({
             ...prev,
             avatar: userImage
         }))
         changeImage()
 
         clearInterval(changeImage)
 
        //  console.log(userImage)
        //  console.log(employeeData)
     
     },[userImage])




    const handleOnChange = (e)=>{
        const { name, value } = e.target;
        setUserInfo(prev=>({
            ...prev,
            [name]: value
        }))
    }


    const handlePhoneChange = (value, data, event, formattedValue)=>{
        event.preventDefault()
        setUserInfo(prev=>({
            ...prev,
            [event.target.name]: value
        }))
    
        // console.log(event.target.name)
        // console.log(value)
    }

    // console.log(userInfo)
    let {mutate, isPending} = useUpdateAdminProfile()
    let handleSubmit = ()=>{
      
        
        
        const formData = new FormData();
         
        // Append each key-value pair to the FormData object
        Object.entries(userInfo).forEach(([key, value]) => {
           formData.append(key, value);
        }); 

        mutate(formData,{
            onSuccess:(success)=>{
                    console.log(success)
                    AlertMessages("Success","Record Updated Successfully","success")
            },
            onError:(error)=>{
                displayErrorMessages(error.response.data)
                // console.log(error)
            }
        })

    }

  return (
    <div className=""> 
        <p className='mb-[0.5rem] font-[600]'>Profile picture</p>
        <div className=""> 
            <ChangeUserImage  userImage={userInfo.avatar?userInfo.avatar :  userImage}  setUserImage={setUserImage} />
            {/* <ChangeUserImage   /> */}
        </div>

        <div className=" grid gap-y-[1rem] md:grid-cols-2  lg:grid-cols-3 gap-x-[2rem] mt-[1rem] ">
            <TextField 
                label="First name"
                type="text"
                name="first_name"
                paddingY="py-[0.5rem]"
                fontSize="font-[500]"
                textSize="text-[0.875rem]"
                value={userInfo.first_name}
                onChange={handleOnChange}
            />
            <TextField
                label="Last name"
                type="text"
                name="flast_name"
                paddingY="py-[0.5rem]"
                fontSize="font-[500]"
                textSize="text-[0.875rem]"
                value={userInfo.last_name}
                onChange={handleOnChange}
            />

            
            <SelectField 
                options={["","Male","Female"]} 
                paddingY="py-[0.6rem] lg:mt-[0.5rem]"
                fontSize="font-[500]"
                textSize="text-[0.875rem]"
                label="Gender"
                name="gender"
                value={userInfo.gender}
                onChange={handleOnChange}
            />
             <TextField
                label="Phone number"
                type="text"
                name="phone_number"
                paddingY="py-[0.5rem]"
                fontSize="font-[500]"
                textSize="text-[0.875rem]"
                value={userInfo.phone_number}
                onChange={handlePhoneChange}
            />
             <TextField
                label="Whatsapp number"
                type="text"
                name="whatsapp_number"
                paddingY="py-[1.3rem]"
                fontSize="font-[500]"
                textSize="text-[0.875rem]"
                value={userInfo.whatsapp_number}
                onChange={handlePhoneChange}
            />
             <TextField
                label="Email"
                type="text"
                name="email"
                paddingY="py-[0.47rem] "
                fontSize="font-[500]"
                textSize="text-[0.875rem]"
                value={userInfo.email}
                onChange={handleOnChange}
            />
             <TextField
                label="Home address"
                type="text"
                placeholder="e.g. no 4"
                name="home_address"
                paddingY="py-[0.47rem] "
                fontSize="font-[500]"
                textSize="text-[0.875rem]"
                value={userInfo.home_address}
                onChange={handleOnChange}
            />
             {/* <TextField
                label="State"
                type="text"
                placeholder="e.g. Lagos"
                name="state"
                paddingY="py-[0.47rem] "
                fontSize="font-[500]"
                textSize="text-[0.875rem]"
                value={userInfo.state}
                onChange={handleOnChange}
            /> */}
            <SelectField 
            options={state} 
            paddingY="py-[0.6rem] lg:mt-[0.5rem]"
            fontSize="font-[500]"
            textSize="text-[0.875rem]"
            label="State"
            name="state"
            value={userInfo.state}
            onChange={handleOnChange}
            />
            <SelectField 
            options={["","Nigeria","Spain"]} 
            paddingY="py-[0.6rem] lg:mt-[0.5rem]"
            fontSize="font-[500]"
            textSize="text-[0.875rem]"
            label="Country"
            name="country"
            value={userInfo.country_code}
            onChange={handleOnChange}
            />
        </div>

        <div className="mb-[9rem]">
                 {/* <InnerButton onClick={handleSubmit } text={`${isPending? "Loading...": "Update profile"}`}  type="button"  width="w-fit " /> */}
                 <InnerButton onClick={handleSubmit } text={isPending? "Loading...":"Update" }  type="button"  width="w-fit " />
        </div>
    </div>
  )
}
