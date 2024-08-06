import React,{ useEffect, useState } from 'react'
import { BsPlus } from "react-icons/bs";
import TextField from '../shared/TextField';
import SelectField from '../shared/SelectField';
import CheckboxWithLabel from './CheckboxWithLabel';
import Checkbox from '../shared/Checkbox';
import Button from '../shared/Button';
import { useLoaderData } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { useAddNewEmployee } from '../../services/admin/mutation';



export default function AddManualOnboardForm() {

 

      const [employeeData, setEmployeeData] = useState({
        avatar:null,
        email:null,
        first_name:null,
        last_name:null, 
        phone_number:null,
        whatsapp_phone_number:null,
        gender:null,
        home_address:null,
        state:null,
        country:null,
        position:null,
        salary_amount:null,
        work_days_in_month:null,
        work_hour_per_day:null,
        payslip_type:null,
        work_shift:null,
        mode_of_identification_number:null,
        mode_of_identification:null,
        on_create_accept_terms_and_condition:false,
        workschedule: {
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false
          },
        bankinformation: {
            first_name: null,
            last_name: null,
            account_number: null,
            bank_code: null
         }

    })
       

    // useEffect(()=>{
    //     setEmployeeData(prevEmployeeData => ({
    //         ...prevEmployeeData,
    //         bankinformation: {
    //           ...prevEmployeeData.bankinformation,
    //         first_name: null || prevEmployeeData.first_name,
    //         last_name: null || prevEmployeeData.last_name,
    // }}));
    // },[employeeData.first_name, employeeData.last_name])
       
        let [previewImage, setPreviewImage] = useState({
            profileImage:null,
            identityImage:null
        })
        console.log(previewImage)

        // const handleCheckboxChange = (id)=>{
        //     const updatedCheckboxes = workDays.map((checkbox)=>(
        //         checkbox.id === id ? {...checkbox, checked: !checkbox.checked} : checkbox
        //     ))
        //     setWorkDays(updatedCheckboxes)
        //     let selectedDays = updatedCheckboxes.filter((checkbox)=>checkbox.checked).map((checkbox)=>checkbox.label)
        //     setSelectedWorkDays(selectedWorkDays)
        //     console.log(selectedWorkDays)
        // }

        // const handleCheckboxChange = (event) => {
        //     const { name, checked } = event.target;
        //     setWorkSchedule(prevSchedule => ({
        //       ...prevSchedule,
        //       [name]: checked
        //     }));
        //   };
        




        

        let handlePreviewImage = (selectedFile)=> {
            
           console.log(selectedFile.files[0])
           setEmployeeData((prev)=>({
            ...prev,
            avatar:selectedFile.files[0]
           }))
            if(selectedFile.id === 'profilePic'){
                   if (selectedFile) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreviewImage({
                        ...previewImage,
                        profileImage:e.target.result
                    });
                };
             
                reader.readAsDataURL(selectedFile.files[0]);
              }

            }
            
            // if(selectedFile.id === 'IdentityImage'){
            //     if (selectedFile) {
            //         const reader = new FileReader();
            //         reader.onload = (e) => {
            //             setPreviewImage({
            //                 ...previewImage,
            //                 identityImage:e.target.result
            //             });
            //         };
            //         reader.readAsDataURL(selectedFile.files[0]);
            //       }
            // }
      
          
        }


    


// const [phoneNo, setPhoneNo] = useState({
//     phone_number:null,
//     whatsapp_phone_number:null

// })


const handlePhoneChange = (value, data, event, formattedValue)=>{
    event.preventDefault()
    setEmployeeData(prev=>({
        ...prev,
        [event.target.name]: value
    }))

    // console.log(event.target.name)
    // console.log(value)
}

const handleOnChange = (e)=>{
    const { name, value } = e.target;
    setEmployeeData(prev=>({
        ...prev,
        [name]: value
    }))
}

  // Function to update bank information
  const updateBankInformation = (fieldName, value) => {
    setEmployeeData(prevEmployeeData => ({
      ...prevEmployeeData,
      bankinformation: {
        ...prevEmployeeData.bankinformation,
        [fieldName]: value
      }
    }));
  };


  // Function to update workschedule
  const updateWorkSchedule = (day, checked) => {
    setEmployeeData(prevEmployeeData => ({
      ...prevEmployeeData,
      workschedule: {
        ...prevEmployeeData.workschedule,
        [day]: checked
      }
    }));
  };

 

  let {mutate, isError,error, isPending} = useAddNewEmployee()

// let data = Object.fromEntries(formData)

const handleSubmit = (e) => {
    e.preventDefault()

    let formDataObj = new FormData()
    for (const key in employeeData) {
        // console.log(key)
        formDataObj.append(key, employeeData[key]);
    }
    // console.log(formDataObj,  employeeData)
    console.log(Object.fromEntries(formDataObj))
   




}

// let {bankList, country, state} = useLoaderData()
// console.log(bankList)



  return (
    <div className="mt-[2rem]">
              <p className='text-[0.85rem] mb-[1rem]'>Profile picture</p>
              <div className="">

                    
                  

                  <form onSubmit={handleSubmit} className="mt-[2rem]  pb-[3rem]">


                  <div onClick={()=>document.getElementById("profilePic").click()}  htmlFor="profilePic" className={`mb-[2rem] flex flex-col hover:cursor-pointer justify-center items-center ${ previewImage.profileImage? 'max-w-[150px] border-none w-full overflow-hidden' : 'bg-[var(--grey-color)]   w-[110px]   md:w-[160px]  '} h-[110px] md:h-[160px] border-2 border-dashed border-[#6B7280]  rounded-[5px]`}>
                  <input type="file" onChange={(e)=>handlePreviewImage(e.target)}  id="profilePic" className='hidden' />
                          {
                            previewImage.profileImage ? 
                            <img src={previewImage.profileImage} className='object-cover w-full block' /> :

                            <>
                            <span><BsPlus /></span>
                            
                            <p className='text-[0.85rem]'>Upload profile</p>
                            </>

                          }
                          
                  </div>






                        <div className=" md:grid md:grid-cols-2 lg:grid-cols-3 gap-y-[1rem] md:flex-row items-center w-full md:gap-x-[2rem]">
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="First name"
                                placeholder="e.g.Joy"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name="first_name"
                                onChange={handleOnChange}
                            />
                            </div>
                          
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Last name"
                                placeholder="e.g.Johnson"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name="last_name"
                                onChange={handleOnChange}
                            />
                            </div>
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <SelectField
                                    label="Gender"
                                    options= {["male", "female"]}
                                    selectedOption="male"
                                    value={employeeData}
                                    placeholder="gender--"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="gender"
                                    onChange={handleOnChange}

                            />
                            </div>

                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Phone Number"
                                placeholder="e.g.09066******"
                                // onClick={''}
                                type="number"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name="phone_number"
                                onChange={handlePhoneChange}
                                value={employeeData.phone_number}
                               
                            />
                            </div>
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Whatsapp Number"
                                placeholder="e.g.09066******"
                                // onClick={''}
                                type="number"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name= "whatsapp_phone_number"
                                onChange={handlePhoneChange}
                                value={employeeData.whatsapp_phone_number}
                            />
                            </div>
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Email"
                                placeholder="e.g.yourname@gmail.com"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name="email"
                                onChange={handleOnChange}

                            />
                            </div>
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Home address"
                                placeholder="e.g.No. 4....."
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name="home_address"
                                onChange={handleOnChange}
                            />
                            </div>



                            {/* <div className='flex flex-col mb-[2rem] justify-center md:mb-[0.4rem]'>
                                    <label htmlFor='bank_name' className=" text-[0.875rem] " >State</label>
                                    <select   onChange={handleOnChange}    name="state"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.7rem] w-full  transition-[border] duration-[0.4s] rounded-[6px] ">
                                    
                                        <option disabled >--Select--</option>
                                        { 
                                            state?.map((item, i)=>(
                                                <option key={i} value={item}  >{item}</option>
                                            ))
                                        } 
                                    </select>

                            </div> */}




                            {/* <div className=" w-full mb-[3rem] md:mb-0">
                            <TextField
                                label="State"
                                placeholder="e.g.Lagos"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name="state"
                                onChange={handleOnChange}
                            />
                            </div> */}


                            {/* <div className='flex flex-col mb-[2rem] justify-center md:mb-[0.4rem]'>
                                    <label htmlFor='bank_name' className=" text-[0.875rem] " >Country</label>
                                    <select   onChange={handleOnChange}    name="country"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.7rem] w-full  transition-[border] duration-[0.4s] rounded-[6px] ">
                                    
                                        <option  >--Select--</option>
                                        { 
                                            ["Nigeria"].map((item, i)=>(
                                                <option key={i} value='234'  >{item}</option>
                                            ))
                                        }
                                        
                                    
                                    </select>

                            </div> */}

                            {/* <div className=" w-full mb-[3rem] md:mb-0">
                            <SelectField
                                    label="Country"
                                    options={["Nigeria", ]}
                                    value=''
                                    placeholder="Country"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="country"
                                    onChange={handleOnChange}

                            />
                            </div> */}

{/* 
                            <div className='flex flex-col mb-[2rem] justify-center md:mb-[0.4rem]'>
                                    <label htmlFor='bmode_of_identification' className=" text-[0.875rem] " >Identity Card</label>
                                    <select   onChange={handleOnChange}    name="mode_of_identification"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.7rem] w-full  transition-[border] duration-[0.4s] rounded-[6px] ">
                                    
                                        <option  >--Select--</option>
                                        { 
                                            ["Voter Card","International Passport", "Drivers License" ].map((item, i)=>(
                                                <option key={i} value={item}  >{item}</option>
                                            ))
                                        }
                                        
                                    
                                    </select>

                            </div> */}



                            <div className=" w-full mb-[3rem] md:mb-0">
                            <SelectField
                                    label="Identity Card"
                                    options={["Voter Card","International Passport", "Drivers License" ]}
                                    value=''
                                    placeholder="your means of Identification"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="mode_of_identification"
                                    onChange={handleOnChange}

                            />
                            </div>

                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="ID Number"
                                placeholder="e.g.4567******"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name= "mode_of_identification_number"
                                onChange={handleOnChange}
                            />
                            </div>


                            


                            
                           
{/* 
                        <TextField
                            label="Email"
                            type="text"
                            placeholder="eg. yourname@gmail.com"
                            onChange={handleOnchange}
                            errMsg={errMsg && errMsg.email}
                            name="email"
                            value ={loginData.email}
                        /> */}
                        </div>

                        {/* <div className="mt-[2rem]">
                            <p className='text-[0.85rem] mb-[1rem]'>Picture of the ID</p>

                    
                            <div onClick={()=>document.getElementById("IdentityImage").click()}   className={`flex flex-col hover:cursor-pointer justify-center items-center ${previewImage.identityImage? 'md:max-w-[728px] w-full overflow-hidden'  : 'border-2 border-dashed w-full   md:max-w-[728px] md:w-full  '} h-[180px]  border-[#6B7280] bg-[var(--grey-color)]   rounded-[5px]`}>
                            <input type="file" onChange={(e)=>handlePreviewImage(e.target)}  id="IdentityImage" className='hidden' />
                                    
                                   
                                    {
                                        previewImage.identityImage ? 
                                        <img src={ previewImage.identityImage} className='object-cover w-full block' /> :

                                        <>
                                        <span className='text-[1.5rem]'><BsPlus /></span>
                                                <p className='text-[0.85rem]'>Upload ID picture</p>
                                                <p className='text-[0.85rem] mt-[0.5rem]'>Only JPG, PNG, PDF is allowed</p>
                                        </>

                          }
                            </div>
                            </div> */}

                            <div className="mt-[3rem]">
                            <h1 className='font-[600] text-[1rem]'>Provide staff bank details</h1>

                            <div className=" mt-[1.5rem] md:grid md:grid-cols-2 lg:grid-cols-3 gap-y-[1rem] md:flex-row items-center w-full md:gap-x-[2rem]">
                            
                            
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="First Name"
                                placeholder="e.g.John"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                onChange={(e) => updateBankInformation('first_name', e.target.value)}
                            />
                            </div> 


                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Last Name"
                                placeholder="e.g.Lawrence"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                onChange={(e) => updateBankInformation('last_name', e.target.value)}
                            />
                            </div> 
                            
                            
                            
                            
                            
{/*                             
                            <div className='flex flex-col mb-[2rem] justify-center md:mb-[0.4rem]'>
                                    <label htmlFor='bank_name' className=" text-[0.875rem] " >Bank name</label>
                                    <select  onChange={(e)=>updateBankInformation('bank_code', e.target.value)}   id='bank_name'  name="bank_code"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.7rem] w-full  transition-[border] duration-[0.4s] rounded-[6px] ">
                                    
                                        <option disabled >--Select--</option>
                                        { 
                                            bankList?.map((item, i)=>(
                                                <option key={i} value={item.code}  >{item.name}</option>
                                            ))
                                        }
                                        
                                    
                                    </select>

                            </div> */}
                            
                            {/* <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Bank name"
                                placeholder="e.g.First bank"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                onChange={(e) => updateBankInformation('first_name', e.target.value)}
                            />
                            </div> */}
                          
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Account number"
                                placeholder="e.g.3099******"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                onChange={(e) => updateBankInformation('account_number', e.target.value)}
                            />
                            </div>
                            {/* <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                    label="Account name"
                                    type="text"
                                    placeholder="e.g.Joy johnson"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"

                            />
                            </div> */}
                            </div>
                            </div>


                            <div className="mt-[3rem]">
                            <h1 className='font-[600] text-[1rem]'>Provide staff pay & schedule</h1>

                            <div className=" mt-[1.5rem] md:grid md:grid-cols-2 lg:grid-cols-3 gap-y-[1rem] md:flex-row items-center w-full md:gap-x-[2rem]">
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Position held"
                                placeholder="e.g.First bank"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name="position"
                                onChange={handleOnChange}
                            />
                            </div>

                            <div className=" w-full mb-[2rem] md:mb-[-1.3rem]">
                            <SelectField
                                    label="Payslip type"
                                    options={["none", "Wages", "Monthly pay"]}
                                    value=''
                                    placeholder="e.g.Joy johnson"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="payslip_type"
                                    onChange={handleOnChange}

                            />
                            </div>
                          
                            {/* <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Payslip type"
                                placeholder="e.g.3099******"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name="payslip_type"
                                onChange={handleOnChange}
                            />
                            </div> */}
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                    label="Monthly pay"
                                    type="text"
                                    placeholder="e.g.Joy johnson"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="salary_amount"
                                    onChange={handleOnChange}

                            />
                            </div>
                            
                          
                            
                            
                            </div>



                            <div className="md:flex gap-x-[2rem] md:items-center mt-[1rem] w-full">

                            <div className=" md:max-w-[200px] w-full mb-[2rem] md:mb-0">
                            <TextField
                                    label="Number of work days in a month"
                                    type="text"
                                    placeholder="e.g.Joy johnson"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="work_days_in_month"
                                    onChange={handleOnChange}

                            />
                            </div>

                            <div className=" w-auto mb-[2rem] md:mb-[-1.3rem]">
                            <TextField
                                    label="Work hour per day"
                                    type="text"
                                    placeholder="e.g.Joy johnson"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name= "work_hour_per_day"
                                    onChange={handleOnChange}

                            />
                            </div>

                            <div className=" w-full mb-[2rem] md:mb-[-1.3rem]">
                            <SelectField
                                    label="Shift"
                                    options={["none", "Morning", "Evening", "Night"]}
                                    value=''
                                    placeholder="e.g.Joy johnson"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="work_shift"
                                    onChange={handleOnChange}

                            />
                            </div>
                            <div className=" w-full mb-[2rem] md:mb-[-1.3rem]">
                            <SelectField
                                    label="Profile status"
                                    options={["Active"]}
                                    value=''
                                    placeholder="e.g.Joy johnson"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    onChange={handleOnChange}

                            />
                            </div>

                            
                            </div>
                                

                               

                                <div className=" w-full mt-[1rem] md:mb-0">
                                    <p className='text-[0.875rem] mb-[0.5rem]'>Work days</p>
                                    {

                                    Object.entries(employeeData.workschedule).map(([day, checked])=>(
                                        <CheckboxWithLabel key={day} id={day} onChange={(e)=>updateWorkSchedule(day, e.target.checked)} checked={checked}   label={ day.charAt(0).toUpperCase() + day.slice(1)} />
                                   
                                        ))

                                        // workSchedule.map((item,index)=>(

                                        //     <CheckboxWithLabel name="workschedule" key={item} id={item}   label={item} />
                                        // ))
                                    }
                                 </div>
                               
                            
                            </div>

                            <div className="mt-[3rem]">
                            <h1 className='font-[600] text-[1rem]'>Staff confirmation</h1>
                            <div className='flex items-center my-[1.5rem] gap-x-[0.5rem]'>
                                <Checkbox name="on_create_accept_terms_and_condition" checked={employeeData.on_create_accept_terms_and_condition} onChange={(e)=>setEmployeeData(prevEmployeeData => ({
      ...prevEmployeeData,
      on_create_accept_terms_and_condition:e.target.checked
                                }))}
    />
                                <p className='text-[0.85rem] leading-[24px]'>
                                We confirm that this person is a staff at Williams Specialist Hospital located at No 14 Roadrid street, Ikeja Lgos, Nigeria and he’s oblige to  be taking salary in-advance through WagePull Inc.
                                </p>
                            </div>
                            
                            <p className='text-[var(--secondary-color)] font-[500]'>You need to confirm this staff to proceed</p>
                          
                                {/* <p className={`mt-[2rem] ${error? 'text-red-600': null}`}>{error ? error?.response.data : null}</p> */}
                            </div>

                            <div className=" mt-[3rem]">
                                <div className="flex items-start flex-wrap gap-x-[1rem] sm:flex-nowrap gap-y-[1.5rem]">
                                    <Button bgColor={`${!employeeData.on_create_accept_terms_and_condition ? 'bg-grey-500 text-black' : 'bg-[var(--secondary-color)] text-white'}`} disabled={!employeeData.on_create_accept_terms_and_condition} type="submit" text="Save & add another staff"  width="w-fit " />

                                    <button type="button" className='p-[14px_28px_14px_28px] hover:bg-[var(--grey-color)]  hover:border-none transition-all duration-[0.3s]  border-[1px] border-[#374151] rounded-[4px]'>Save</button>
                                </div>
                            </div>
                  </form>
              </div>
    </div>
  )
}
