import React, { useState } from 'react'
import TextField from '../shared/TextField'
import { SlCloudUpload } from "react-icons/sl";
import InnerButton from '../shared/InnerButton';
import SelectField from '../shared/SelectField';
import { useOrganizationIndustry } from '../../services/admin/queries';
import { useUpdateOrgInfo } from '../../services/admin/mutation';
import validateUserData from '../../utilities/validateUserData';
import capitalizeFirstLetter from '../../utilities/capitalizeFirstLetter';
import AlertMessages from '../shared/AlertMessages';

export default function OrganisationProfile({data}) {
   let {mutate, isPending} = useUpdateOrgInfo()

  let initialValues = {
      name:data && data.name,
       email: data && data.email,
       director_name: data && data.director_name,
       director_phone_number: data && data.director_phone_number,
       address: data && data.address,
       role: data && data.role,
       industry_id: data && data.industry.code,
       country: data && data.country,
      //  state: data && data.state,
       number_of_staff: data && data.number_of_staff,
       website: data && data.website,
       lowest_paid_salary: data && data.lowest_paid_salary,
       highest_paid_salary: data && data.highest_paid_salary,
      logo: data && data.logo 

     
      // address: data && data.address,
      // location: data && data.location,
      // phone_no: data && data.phone,
      // website: data && data.website,
      // ceo_name: data,
      // ceo_no:'07034567896',
      // staff_no:21,
      // lowest_salary:' ₦30,000.00',
      // highest_salary:' ₦450,000.00',
      // logo:''
  }

// console.log(data)

  let [userData, setUserData] = useState(initialValues)
  let [userImage, setUserImage] = useState('')



  let handlePreviewImage = (e)=> {
      const selectedFile = e.target
         // console.log(selectedFile.files[0])
         //    formData.append("logo", selectedFile.files)

         // mutate(formData,
         //    {
         //       onSuccess:(success)=>{
         //             console.log(success)
         //       },
         //       onError:(error)=>{
         //             console.log(error)
         //       }
         //    }
         
         // )

      //  console.log(selectedFile.files[0])

      if(selectedFile){

         


             if (true) {
          const reader = new FileReader();
          reader.onload = (e) => {
          
            setUserData(prevState=>({
               ...prevState,
               logo:selectedFile.files[0]
            }))
              setUserImage(e.target.result)
          };
          reader.readAsDataURL(selectedFile.files[0]);
        }

      }
  }
  
//   console.log(userImage)
 
  const handleOnChange = (e)=>{
   let {name, value} = e.target
 
   setUserData(prev=>({
     ...prev,
     [name]:value
   }))
 }
  
  
  
  let {data:inDustryNames} = useOrganizationIndustry()


  
 
  let [errMsg, setErrMsg] = useState({})
  const handleSubmit = (e) => {
 
         e.preventDefault()
        
         const formData = new FormData();
         
         // Append each key-value pair to the FormData object
         Object.entries(userData).forEach(([key, value]) => {
            formData.append(key, value);
         }); 


console.log(userData)
      if(validateUserData(userData, setErrMsg)){
         
         mutate(formData, {
            onSuccess:(success)=>{
               // console.log(success)
               setErrMsg({success:"Record Updated successfully"});
               AlertMessages("Success","Record Updated successfully","success")
            },
            onError:(error)=>{
               console.log(error)
               return setErrMsg({error: error.response.data.message})
            }
         })
      }
   // console.log(userData)
  

  }
  



  return (
   <div className="pb-[6rem]">
        <p className='mb-[0.5rem] font-[600] '>Organisation profile details</p>

        

          <form encType='multipart/form-data' onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-[340px_340px] gap-x-[5rem] gap-y-[1rem]">
                <TextField
                   label="Organisation name"
                    value={userData.name}
                   // onClick={''}
                   type="text"
                   paddingY="py-[0.5rem]"
                   fontSize="font-[500] bg-grey-500 cursor-not-allowed"
                   textSize="text-[0.875rem] "
                   onChange={handleOnChange}
                   name="name"
                   errMsg={capitalizeFirstLetter(errMsg.name) }
                   disabled={true}


                />
                {/* <TextField
                   label="Industry"
                   value={userData.industry_id}
                  
                   // onClick={''}
                   type="text"
                   paddingY="py-[0.5rem]"
                   fontSize="font-[500]"
                   textSize="text-[0.875rem]"

                /> */}
                <SelectField
                label="Industry"
                options={inDustryNames}
                key1={"code"}
                key2={"name"}
                selectedOption={userData.industry_id}
                onChange={handleOnChange}
                name="industry_id"
                errMsg={capitalizeFirstLetter(errMsg.industry_id) }
                paddingY="py-[0.5rem]"
                fontSize="font-[400] text-[0.85rem]"
               />

                
                <TextField
                   label="Organisation email"
                   value={userData.email}
                  
                   // onClick={''}
                   type="text"
                   paddingY="py-[0.5rem]"
                   fontSize="font-[500]"
                   textSize="text-[0.875rem]"
                   name="email"
                   onChange={handleOnChange}
                   errMsg={capitalizeFirstLetter(errMsg.email) }

                />
                <TextField
                   label="Official organisation address"
                   value={userData.address}
                  
                   // onClick={''}
                   type="text"
                   name="address"
                   paddingY="py-[0.5rem]"
                   fontSize="font-[500]"
                   textSize="text-[0.875rem]"
                   onChange={handleOnChange}
                   errMsg={capitalizeFirstLetter(errMsg.address) }

                />
                {/* <TextField
                   label="Organization location"
                  
                  
                   // onClick={''}
                   type="text"
                   paddingY="py-[0.5rem]"
                   fontSize="font-[500]"
                   textSize="text-[0.875rem]"

                  //  onChange={handleOnChange}

                /> */}
                {/* <TextField
                   label="Organisation phone Number"
                  //  value={userData.phone_no}
                   name="phone_no"
                  //  value={userData.director_phone_number}
                  
                   // onClick={''}
                   type="text" 
                   paddingY="py-[0.5rem]"
                   fontSize="font-[500]"
                   textSize="text-[0.875rem]"
                  //  onChange={handleOnChange}

                   

                /> */}
                <TextField
                   label="Organisation website"
                   value={userData.website}
                   name="website"
                   // onClick={''}
                   type="text"
                   paddingY="py-[0.5rem]"
                   fontSize="font-[500]"
                   textSize="text-[0.875rem]"
                   onChange={handleOnChange}
                   errMsg={capitalizeFirstLetter(errMsg.website) }


                />
                <TextField
                   label="CEO's name"
                   value={userData.director_name}
                   name="director_name"
                   // onClick={''}
                   type="text"
                   paddingY="py-[0.5rem]"
                   fontSize="font-[500]"
                   textSize="text-[0.875rem]"
                   onChange={handleOnChange}
                   errMsg={capitalizeFirstLetter(errMsg.director_name) }


                />
                <TextField
                   label="CEO’s phone Number"
                   value={userData.director_phone_number}
                   name="director_phone_number"
                   // onClick={''}
                   type="text"
                   paddingY="py-[0.5rem]"
                   fontSize="font-[500]"
                   textSize="text-[0.875rem]"
                   onChange={handleOnChange}
                   errMsg={capitalizeFirstLetter(errMsg.director_phone_number) }


                />
                <TextField
                   label="Staff number"
                   value={userData.number_of_staff}
                     name="number_of_staff"
                   // onClick={''}
                   type="text"
                   paddingY="py-[0.5rem]"
                   fontSize="font-[500]"
                   textSize="text-[0.875rem]"
                   onChange={handleOnChange}
                   errMsg={capitalizeFirstLetter(errMsg.number_of_staff) }

                />

                <div className="relative">
                <TextField
                   label="Lowest paid salary to staff"
                   value={userData.lowest_paid_salary}
                   name="lowest_paid_salary"
                   // onClick={''}
                   type="text"
                   paddingY="py-[0.5rem]"
                   fontSize="font-[500]"
                   textSize="text-[0.875rem]"
                   onChange={handleOnChange}
                   errMsg={capitalizeFirstLetter(errMsg.lowest_paid_salary) }


                />
                  <p className='absolute right-[10%] top-[53%] text-[0.8rem]'>per month</p>
                </div>

                <div className="relative">
 
                <TextField
                   label="Highest paid salary to staff"
                   value={userData.highest_paid_salary}
                     name="highest_paid_salary"
                   // onClick={''}
                   type="text"
                   paddingY="py-[0.5rem]"
                   fontSize="font-[500]"
                   textSize="text-[0.875rem]"
                   onChange={handleOnChange}
                   errMsg={capitalizeFirstLetter(errMsg.highest_paid_salary) }


                />

<p className='absolute right-[10%] top-[53%] text-[0.8rem]'>per month</p>
                </div>
               
          </div>


      <div className="mt-[2rem] relative">
        <p>Logo</p>

       
        <input type="file" onChange={handlePreviewImage} className='logo invisible absolute' />
        
        
      <div onClick={()=>document.querySelector('.logo').click()} className={`rounded-[4px] hover:cursor-pointer  ${userData.logo != ''? '':'  justify-center h-[180px]  items-center' } mt-[0.4rem] text-[#6B7280] flex   flex-col max-w-[160px] w-full  border-2`}>
           
           {
            userData.logo != '' ? 
            <div className="flex ">
                  <img src={userImage?userImage: userData.logo}  alt="" />
                  {/* <img src={ userImage}  alt="" /> */}
            </div>

     
            :

            <>
             <span className="text-[3rem] ">
            <SlCloudUpload />
            </span>
            <p>Upload logo</p>
            </>
           }
           
           
          </div>
      </div>
      <div className="">
              {
                        errMsg.success ?  <p>{errMsg.success}</p> : errMsg.error && <p>{errMsg.error}</p>
              }
         </div>
      <div className="mt-[4rem]">
           <InnerButton type="submit" text={isPending? "Loading...": "Update profile" } width="w-fit"   />
      </div>
         
          </form>

      
   </div>
  )
}
