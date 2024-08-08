import React,{ useEffect, useState } from 'react'
import { BsPlus } from "react-icons/bs";
import TextField from '../shared/TextField';
import SelectField from '../shared/SelectField';
import CheckboxWithLabel from './CheckboxWithLabel';
import Checkbox from '../shared/Checkbox';
import Button from '../shared/Button';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { useAddNewEmployee} from '../../services/admin/mutation';
import { useBankNames, useNigeriaState } from '../../services/admin/queries';
import { avatar } from '@nextui-org/react';
import validateUserData from '../../utilities/validateUserData';
import AlertMessages from '../shared/AlertMessages';
import displayErrorMessages from '../shared/displayErrorMessages';



export default function AddManualOnboardForm() {

    let navigate = useNavigate()
    let {errMsg, successMsg ,setErrMsg,setSuccessMsg} = useAuth()
    const queryClient = useQueryClient();

    let init = {
        email:'',
        first_name:'',
        last_name:'',
        phone_number:'',
        whatsapp_phone_number:'',
        gender:'',
        home_address:'',
        state:'',
        country:'',
        position:'',
        salary_amount:'',
        work_days_in_month:'',
        work_hour_per_day:'',
        payslip_type:'',
        work_shift:'',
        mode_of_identification_number:'',
        mode_of_identification:'',
        on_create_accept_terms_and_condition:'', 
        bank_first_name:'',
        bank_last_name:'',
        account_number:'',
        bank_code:'',
        sunday:false,
        monday:false,
        tuesday:false,
        wednesday:false,
        thursday:false,
        saturday:false,
        friday:false,
        avatar:'',
        dob:'',
        postal_code:'',
        bvn:''

    }
    const [employeeData, setEmployeeData] = useState(init)

    let [previewImage, setPreviewImage] = useState({
        profileImage:null,
        // identityImage:null
    })
    let handlePreviewImage = (selectedFile)=> {
            
        //    console.log(selectedFile.files)
           
            // setImageFile(selectedFile.files)
        
             
            if(selectedFile.id === 'profilePic'){

                    // console.log(selectedFile.files[0])

                    setEmployeeData(prevState => ({
                        ...prevState,
                        avatar: selectedFile.files[0]
                    }));
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
        }


        // const handlePhoneChange = (value, data, event, formattedValue)=>{
        //     event.preventDefault()
        //     // console.log(value.slice(3))
        //     setEmployeeData(prev=>({
        //         ...prev,
        //         [event.target.name]: value.slice(3)
        //     }))
        
        //     // console.log(event.target.name)
        //     // console.log(value)
        // }



        const handleOnChange = (e)=>{
            const { name, value } = e.target;
            setEmployeeData(prev=>({
                ...prev,
                [name]: value
            }))
        }
        
        const handleCheckboxChange = (event) => {
            const { name, checked } = event.target;
            setEmployeeData(prevState => ({
                ...prevState,
                [name]: checked
            }));
        };







let {mutate, isError,error,  isPending} = useAddNewEmployee()
let [errMsgs, setErrMsgs] = useState({})

const handleSubmit = (e) => {
   e.preventDefault()
        // console.log(employeeData)


    //   if(validateUserData(employeeData, setErrMsgs)){
    //     mutate(employeeData,{
    //         onError: (err) =>{
    //             console.log(err)
    //             setErrMsgs({error:err.response.data.message})
    //         },
           
           
    //        })
    //   }
  
   

    const formData = new FormData();
    
    // Append each key-value pair to the FormData object
    Object.entries(employeeData).forEach(([key, value]) => {
        formData.append(key, value);
    });

    // console.log(formData);
    mutate(formData,{
        onSuccess:(success)=>{
                // console.log(success)
                navigate("/staff-list")
                 queryClient.invalidateQueries({ queryKey: ["employeesData"] })
                AlertMessages("Record Created Successfully","Sccessfull", "success")

        },
            onError: (err) =>{
                console.log(err)

                displayErrorMessages(err.response.data)
                setErrMsgs({error:err.response.data.message})
            }
})
           


}

       

 let {data:BankNames} = useBankNames()
 let {data:ListState} = useNigeriaState()


  return (
    <div className="mt-[2rem]">
              <p className='text-[0.85rem] mb-[1rem]'>Profile picture</p>
              <div className="">

                    
                  

                  <form onSubmit={handleSubmit}  className="mt-[2rem]  pb-[3rem]">


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



{/* 
                  {
                errMsgs.error && <div className={`${errMsgs.error && 'bg-[#FDEAEA] text-[#FE5E55] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{errMsgs.error}</div>
               } 
            {
                errMsgs.success && <div className={`${ errMsgs.success && 'bg-[var(--primary-color)] text-white mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{ errMsgs.success}</div>
               }  */}

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
                                errMsg={errMsgs.first_name && errMsgs.first_name}
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
                                errMsg={errMsgs.last_name && errMsgs.last_name}
                            />
                            </div>
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <SelectField
                                    label="Gender"
                                    options= {[" ","Male", "Female"]}
                                    // selectedOption="male"
                                    // value={employeeData.gender}
                                    placeholder="gender--"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="gender"
                                    onChange={handleOnChange}
                                    errMsg={errMsgs.gender && errMsgs.gender}

                            />
                            </div>

                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Phone Number"
                                placeholder="e.g.09066******"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name="phone_number"
                                onChange={handleOnChange}
                                value={employeeData.phone_number}
                                errMsg={errMsgs.phone_number && errMsgs.phone_number}
                            />
                            {/* <TextField
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
                                errMsg={errMsgs.phone_number && errMsgs.phone_number}
                               
                            /> */}
                            </div>
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Whatsapp Number"
                                placeholder="e.g.09066******"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name="whatsapp_phone_number"
                                onChange={handleOnChange}
                                value={employeeData.whatsapp_phone_number}
                                errMsg={errMsgs.whatsapp_phone_number && errMsgs.whatsapp_phone_number}
                            />
                            {/* <TextField
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
                                errMsg={errMsgs.whatsapp_phone_number && errMsgs.whatsapp_phone_number}
                            /> */}
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
                                errMsg={errMsgs.email && errMsgs.email}

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
                                errMsg={errMsgs.home_address && errMsgs.home_address}
                            />
                            </div>



                            <div className='flex flex-col mb-[2rem] justify-center md:mb-[0.4rem]'>
                                    <label htmlFor='state' className=" text-[0.875rem] " >State</label>
                                    <select   onChange={handleOnChange} value={employeeData.state}    name="state"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.7rem] w-full  transition-[border] duration-[0.4s] rounded-[6px] ">
                                    
                                        <option value="" >--Select--</option>
                                        { 
                                            ListState?.map((item, i)=>(
                                                <option key={i} value={item}  >{item}</option>
                                            ))
                                        } 
                                    </select>

                            </div>




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


                            <div className='flex flex-col mb-[2rem] justify-center md:mb-[0.4rem]'>
                                    <label htmlFor='country' className=" text-[0.875rem] " >Country</label>
                                    <select   onChange={handleOnChange}    name="country"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.7rem] w-full  transition-[border] duration-[0.4s] rounded-[6px] ">
                                    
                                        <option  >--Select--</option>
                                        { 
                                            ["Nigeria"].map((item, i)=>(
                                                <option key={i} value='234'  >{item}</option>
                                            ))
                                        }
                                        
                                    
                                    </select>

                            </div>

                          




                            <div className=" w-full mb-[3rem] md:mb-0">
                            <SelectField
                                    label="Identity Card"
                                    options={["","Voter Card","International Passport", "Driver License","National Identification Number" ]}
                                    value=''
                                    placeholder="your means of Identification"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="mode_of_identification"
                                    onChange={handleOnChange}
                                    errMsg={errMsgs.mode_of_identification && errMsgs.mode_of_identification}

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
                                errMsg={errMsgs.mode_of_identification_number && errMsgs.mode_of_identification_number}
                            />
                            </div>


                            


                            
                           

                        </div>

                       

                            <div className="mt-[3rem]">
                            <h1 className='font-[600] text-[1rem]'>Provide staff bank details</h1>

                            <div className=" mt-[1.5rem] md:grid md:grid-cols-2 lg:grid-cols-3 gap-y-[1rem] md:flex-row items-center w-full md:gap-x-[2rem]">
                            
                            
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="First Name"
                                placeholder="e.g.John"
                                // onClick={''}
                                name="bank_first_name"
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                onChange={handleOnChange}
                                errMsg={errMsgs.bank_first_name && errMsgs.bank_first_name}
                            />
                            </div> 


                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Last Name"
                                placeholder="e.g.Lawrence"
                                // onClick={''}
                                type="text"
                                name="bank_last_name"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                onChange={handleOnChange}
                                errMsg={errMsgs.bank_last_name && errMsgs.bank_last_name}
                            />
                            </div> 
                            
                            
                            
                            
                            
                            
                            <div className='flex flex-col mb-[2rem] justify-center md:mb-[0.4rem]'>
                                    <label htmlFor='bank_name' className=" text-[0.875rem] " >Bank name</label>
                                    <select  onChange={handleOnChange}   id='bank_name'  name="bank_code"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.7rem] w-full  transition-[border] duration-[0.4s] rounded-[6px] ">
                                    
                                        <option value="" >--Select--</option>
                                        { 
                                            BankNames?.map((item, i)=>(
                                                <option key={i} value={item.code}  >{item.name}</option>
                                            ))
                                        }
                                        
                                    
                                    </select>

                            </div>
                            
                           
                          
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="Account number"
                                placeholder="e.g.3099******"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                name="account_number"
                                onChange={handleOnChange}
                                errMsg={errMsgs.account_number&& errMsgs.account_number}
                             
                            />
                            </div>


                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                label="BVN"
                                placeholder="e.g.3099******"
                                // onClick={''}
                                type="text"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                name="bvn"
                                onChange={handleOnChange}
                                errMsg={errMsgs.bvn && errMsgs.bvn}
                            />
                            </div>
                           
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                    label="D.O.B"
                                    type="date"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="dob"
                                    onChange={handleOnChange}
                                    errMsg={errMsgs.dob && errMsgs.dob}

                            />
                            </div>
                            <div className=" w-full mb-[2rem] md:mb-0">
                            <TextField
                                    label="Postal Code"
                                    type="text"
                                    placeholder="e.g.2****"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="postal_code"
                                    onChange={handleOnChange}
                                    errMsg={errMsgs.postal_code && errMsgs.postal_code}

                            />
                            </div>
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
                                errMsg={errMsgs.position && errMsgs.position}
                            />
                            </div>

                            <div className=" w-full mb-[2rem] md:mb-[-1.3rem]">
                            <SelectField
                                    label="Payslip type"
                                    options={["", "Wages", "Monthly pay"]}
                                    value=''
                                    placeholder="e.g.Joy johnson"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="payslip_type"
                                    onChange={handleOnChange}
                                    errMsg={errMsgs.payslip_type && errMsgs.payslip_type}

                            />
                            </div>
                          
                          
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
                                    errMsg={errMsgs.salary_amount && errMsgs.salary_amount}

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
                                    errMsg={errMsgs.work_days_in_month && errMsgs.work_days_in_month}

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
                                    errMsg={errMsgs.work_hour_per_day && errMsgs.work_hour_per_day}

                            />
                            </div>

                            <div className=" w-full mb-[2rem] md:mb-[-1.3rem]">
                            <SelectField
                                    label="Shift"
                                    options={["", "Morning","Afternoon",  "Night"]}
                                    value=''
                                    placeholder="e.g.Joy johnson"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    name="work_shift"
                                    onChange={handleOnChange}
                                    errMsg={errMsgs.work_shift && errMsgs.work_shift}

                            />
                            </div>
                            <div className=" w-full mb-[2rem] md:mb-[-1.3rem]">
                            <SelectField
                                    label="Profile status"
                                    options={["","Active"]}
                                    value=''
                                    // placeholder="e.g.Joy johnson"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    onChange={handleOnChange}
                                    // errMsg={errMsgs. && errMsgs.work_shift}

                            />
                            </div>

                            
                            </div>
                                

                               

                                <div className=" w-full mt-[1rem] md:mb-0">
                                    <p className='text-[0.875rem] mb-[0.5rem]'>Work days</p>
                                    {/* {

                                    Object.entries(employeeData.workschedule).map(([day, checked])=>(
                                        <CheckboxWithLabel key={day} id={day} onChange={(e)=>updateWorkSchedule(day, e.target.checked)} checked={checked}   label={ day.charAt(0).toUpperCase() + day.slice(1)} />
                                   
                                        ))

                                       
                                    } */}

                                    <CheckboxWithLabel onChange={handleCheckboxChange} checked={employeeData.sunday} name="sunday" label="Sunday" />
                                    <CheckboxWithLabel onChange={handleCheckboxChange} checked={employeeData.monday} name="monday" label="Monday" />
                                    <CheckboxWithLabel onChange={handleCheckboxChange} checked={employeeData.tuesday} name="tuesday" label="Tuesday" />
                                    <CheckboxWithLabel onChange={handleCheckboxChange} checked={employeeData.wednesday} name="wednesday" label="Wednesday" />
                                    <CheckboxWithLabel onChange={handleCheckboxChange} checked={employeeData.thursday} name="thursday" label="Thursday" />
                                    <CheckboxWithLabel onChange={handleCheckboxChange} checked={employeeData.friday} name="friday" label="Friday" />
                                    <CheckboxWithLabel onChange={handleCheckboxChange} checked={employeeData.saturday} name="saturday" label="Saturday" />
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
                                {/* <p className='text-[0.85rem] leading-[24px]'>
                                We confirm that this person is a staff at Williams Specialist Hospital located at No 14 Roadrid street, Ikeja Lgos, Nigeria and he’s oblige to  be taking salary in-advance through WagePull Inc.
                                </p> */}
                            </div>
                            
                            <p className='text-[var(--secondary-color)] font-[500]'>You need to confirm this staff to proceed</p>
                          
                                {/* <p className={`mt-[2rem] ${error? 'text-red-600': null}`}>{error ? error?.response.data : null}</p> */}
                                
                  {
                error && <div className={`${errMsgs.error && 'bg-[#FDEAEA] mt-[1rem]  text-[#FE5E55] mb-[1rem] rounded-[4px] w-fit p-[4px_20px_4px_20px]' }`}>{errMsgs.error}</div>
               } 
           
                            </div>

                            <div className=" mt-[3rem]">
                                <div className="flex items-start flex-wrap gap-x-[1rem] sm:flex-nowrap gap-y-[1.5rem]">
                                    <Button bgColor={`${!employeeData.on_create_accept_terms_and_condition ? 'bg-grey-500 text-black cursor-not-allowed' : 'bg-[var(--secondary-color)] text-white'}`} disabled={!employeeData.on_create_accept_terms_and_condition}  type="submit" text={isPending? "Loading...":"Save & add another staff"}  width="w-fit " />

                                    <button type="button" className='p-[14px_28px_14px_28px] hover:bg-[var(--grey-color)]  hover:border-none transition-all duration-[0.3s]  border-[1px] border-[#374151] rounded-[4px]'>Save</button>
                                </div>
                            </div>
                  </form>
              </div>
    </div>
  )
}
