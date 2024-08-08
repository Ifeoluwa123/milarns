import React, { useEffect, useState } from 'react'
import ChangeUserImage from './ChangeUserImage'
import Button from '../shared/Button'
import Checkbox from '../shared/Checkbox'
import CheckboxWithLabel from './CheckboxWithLabel'
import TextField from '../shared/TextField'
import SelectField from '../shared/SelectField'
import InnerButton from '../shared/InnerButton'
import OutlineButton from '../shared/OutlineButton'
import { IoTrashOutline } from 'react-icons/io5'
import { useQuery, useQueryClient } from '@tanstack/react-query'
// import { getSingleEmployeeRecord, updateSingleEmployeeImage, updateSingleEmployeeRecord } from '../../services/staffListPage'
import { useLoaderData, useParams } from 'react-router-dom'
import Avatar from '../../assets/images/user.png'
import { useBankNames, useCountryLists, useNigeriaState } from '../../services/admin/queries'
import { useUpdateEmployee } from '../../services/admin/mutation'
import AlertMessages from '../shared/AlertMessages'
import displayErrorMessages from '../shared/displayErrorMessages'
export default function StaffAccountProfilePage({data}) {

   

    let {staffId} = useParams()

    const adminInfo = localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null;
   
    let [userImage, setUserImage] = useState(Avatar)
    // {
    //     avatar:data.avatar, 
    //     email:data && data.email,
    //     first_name:data && data.first_name,
    //     last_name:data && data.last_name,
    //     phone_number:data && data.phone_number,
    //     whatsapp_phone_number:data && data.whatsapp_phone_number,
    //     gender:data && data.gender,
    //     home_address:data && data.home_address,
    //     state:data && data.state,
    //     country:data && data.country,
    //     position:data && data.position,
    //     salary_amount:data && data.salary_amount,
    //     work_days_in_month:data && data.work_days_in_month,
    //     work_hour_per_day: data && data.work_hour_per_day,
    //     payslip_type: data && data.payslip_type,
    //     status:data && data.status,
    //     work_shift:data && data.work_shift,
    //     mode_of_identification_number:data && data.mode_of_identification_number,
    //     mode_of_identification:data && data.mode_of_identification,
    //     on_create_accept_terms_and_condition:data && data.on_create_accept_terms_and_condition,
      
    //     workschedule: { 
    //         sunday: data?.workschedule.sunday,
    //         monday: data?.workschedule.monday,
    //         tuesday: data?.workschedule.tuesday,
    //         wednesday: data?.workschedule.wednesday,
    //         thursday: data?.workschedule.thursday,
    //         friday: data?.workschedule.friday,
    //         saturday: data?.workschedule.saturday
    //       },
      

    // }

    let init = {
        email:data && data.email,
        first_name:data && data.first_name,
        last_name:data && data.last_name,
        phone_number:data && data.phone_number,
        whatsapp_phone_number:data && data.whatsapp_phone_number,
        gender:data && data.gender,
        home_address:data && data.home_address,
        state:data && data.state,
        country:data && data.country,
        position:data && data.position,
        salary_amount:data && data.salary_amount,
        work_days_in_month:data && data.work_days_in_month,
        work_hour_per_day:data && data.work_hour_per_day,
        payslip_type:data && data.payslip_type,
        work_shift:data && data.work_shift,
        mode_of_identification_number:data && data.mode_of_identification_number,
        mode_of_identification:data && data.mode_of_identification,
        on_create_accept_terms_and_condition:data && data.on_create_accept_terms_and_condition, 
        // bank_first_name:'',
        // bank_last_name:'',
        // account_number:'',
        // bank_code:'',
        sunday:data?.workschedule.sunday,
        monday:data?.workschedule.monday,
        tuesday:data?.workschedule.tuesday,
        wednesday:data?.workschedule.wednesday,
        thursday:data?.workschedule.thursday,
        saturday:data?.workschedule.saturday,
        friday:data?.workschedule.friday,
        avatar:data.avatar,
        // dob:'',
        // postal_code:'',
        // bvn:''

    }
        // console.log(data)
    const [employeeData, setEmployeeData] = useState(init)

    const queryClient = useQueryClient();
    let imageFile = {
        avatar:userImage
    }


 

        

    useEffect(()=>{

       let changeImage = ()=>  setEmployeeData(prev=>({
            ...prev,
            avatar: userImage
        }))
        changeImage()

        clearInterval(changeImage)

        // console.log(userImage)
        // console.log(employeeData)
    
    },[userImage])
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




  // Function to update workschedule
//   const updateWorkSchedule = (day, checked) => {
//     setEmployeeData(prevEmployeeData => ({
//       ...prevEmployeeData,
//       workschedule: {
//         ...prevEmployeeData.workschedule,
//         [day]: checked
//       }
//     }));
//   };



    // const handleCheckboxChange = (id)=>{
    //     const updatedCheckboxes = workDays.map((checkbox)=>(
    //         checkbox.id === id ? {...checkbox, checked: !checkbox.checked} : checkbox
    //     ))
    //     setWorkDays(updatedCheckboxes)
    //     let selectedDays = updatedCheckboxes.filter((checkbox)=>checkbox.checked).map((checkbox)=>checkbox.label)
    //     setSelectedWorkDays(selectedDays)
    // }


    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setEmployeeData(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };


    // let {bankList, country, state} = useLoaderData()

    let {data:bankList} = useBankNames()
    let {data:country} = useCountryLists()
    let {data:state} = useNigeriaState()
    // console.log(state)


    // let {mutate, isError, isPending, error, isSuccess} = useMutation({
    //     mutationKey:[staffId],
    //     mutationFn:()=>updateSingleEmployeeRecord(staffId, employeeData),
    //     onSuccess:({data})=>{
    //         console.log(data)
    //         queryClient.invalidateQueries(staffId)
    //     },
    //     onError:(data)=>{
    //         console.log(data)
         
          
    //     }
    // })


    // console.log(error, isError)

    // if(isErr){
    //     console.log(error)
    // }
    queryClient.invalidateQueries({ queryKey: ["getSingleDetailsEmployeeData"+staffId] });


   let {mutate, isPending, isSuccess}  = useUpdateEmployee()
    const handleSubmit = (e) => {
        e.preventDefault()
    
         mutate({staffCode:staffId, data:employeeData},{
        //  mutate({staffCode:staffId, data:employeeData},{
            onSuccess:(res)=>{
                console.log(res)
                AlertMessages(" Success", "Record Updated Successfully", "success")
                return  queryClient.invalidateQueries({ queryKey: ["employeesData"] });
            },
            onError:(err)=>{
                displayErrorMessages(err.response.data)
                console.log(err)
            }
         })
        
       
    }

  return (

    <>
        {
            !data? <h1>Loading...</h1>
            :
<div className='mb-[2rem]'>
        
        {/* User Image */}
        <div className="">
            <p className='mb-[0.5rem] font-[600] '>Profile picture</p>
            <ChangeUserImage userImage={employeeData.avatar?employeeData.avatar :  userImage}  setUserImage={setUserImage} />
        </div>
 
        {/* Forms */}

        <div className="">
        <form className="mt-[2rem]  pb-[3rem]">

<div className=" md:grid md:grid-cols-2 lg:grid-cols-3 gap-y-[1rem] md:flex-row items-center w-full md:gap-x-[2rem]">
    <div className=" w-full mb-[2rem] md:mb-0">
    
    <TextField
        label="First name"
        placeholder="e.g.Johnson"
        name="first_name"
        type="text"
        paddingY="py-[0.5rem]"
        fontSize="font-[500]"
        textSize="text-[0.875rem]"
        defaultValue={employeeData.first_name}
        onChange={handleOnChange}
        
    />
  
</div>
  
    <div className=" w-full mb-[2rem] md:mb-0">
    <TextField
        label="Last name"
        placeholder="e.g.Johnson"
        name="last_name"
        type="text"
        paddingY="py-[0.5rem]"
        fontSize="font-[500]"
        textSize="text-[0.875rem]"
        defaultValue={employeeData.last_name}
        onChange={handleOnChange}
    />
    </div>
    <div className=" w-full mb-[2rem] md:mb-0">
    <SelectField
            label="Gender"
            options={["Male", "Female"]}
            name="gender"
            placeholder="Gender"
            fontSize="font-[500]"
            textSize="text-[0.875rem]"
            paddingY="py-[0.5rem]"
            selectedOption={employeeData.gender}
            onChange={handleOnChange}

    />
    </div>

    <div className=" w-full mb-[2rem] md:mb-0">
                <TextField
                                label="Phone Number"
                                placeholder="eg.09001******"
                                name="phone_number"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                // errMsg={errMsg && capitalizeFirstLetter(errMsg.phone_number)}
                                value={employeeData.phone_number}
                                type="text"
                                onChange = {handleOnChange}
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

    /> */}
    </div>
    <div className=" w-full mb-[2rem] md:mb-0">
    <TextField
                                label="Whatsapp Number"
                                placeholder="eg.09001******"
                                name="whatsapp_phone_number"
                                paddingY="py-[0.5rem]"
                                fontSize="font-[500]"
                                textSize="text-[0.875rem]"
                                // errMsg={errMsg && capitalizeFirstLetter(errMsg.phone_number)}
                                value={employeeData.whatsapp_phone_number}
                                type="text"
                                onChange = {handleOnChange}
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
        defaultValue={employeeData.email}
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
        defaultValue={employeeData.home_address}
        onChange={handleOnChange}
    />
    </div>
    <div className=" w-full mb-[3rem] md:mb-0">




 
                                    {/* <label htmlFor='state' className=" text-[0.875rem] " >State</label>
                                    <select   onChange={handleOnChange} defaultValue={employeeData.state}  name="state"  className="focus:input-border outline-none border-[0.9px] mt-[0.5rem] text-[0.85rem] px-[0.6rem]  py-[0.5rem] w-full  transition-[border] duration-[0.4s] rounded-[6px] ">
                                    
                                        <option  >--Select--</option>
                                        { 
                                            state?.map((item, i)=>(
                                                <option key={i} value={item} >{item}</option>
                                            ))
                                        }
                                        
                                    
                                    </select> */}


    <SelectField
            label="State"
            options={state}
            placeholder="Your state"
            fontSize="font-[500]"
            textSize="text-[0.875rem]"
            paddingY="py-[0.5rem]"
            name="state"
            selectedOption={employeeData.state}
            onChange={handleOnChange}
 
           
    />
   
   
    </div>

    <div className=" w-full mb-[3rem] md:mb-0">
    <SelectField
            label="Country"
            options={["nigeria"]}
            name="country"
            placeholder="Country"
            fontSize="font-[500]"
            textSize="text-[0.875rem]"
            paddingY="py-[0.5rem]"
            // selectedOption={capitalizeFirstLetter(employeeData.country) }
            onChange={handleOnChange}


    />
    </div>
    <div className=" w-full mb-[3rem] md:mb-0">
    <SelectField
            label="Identity Card"
            options={["Voter Card","International Passport", "Driver License", "National Identification Number" ]}
            placeholder="your means of Identification"
            fontSize="font-[500]"
            textSize="text-[0.875rem]"
            paddingY="py-[0.5rem]"
            name="mode_of_identification"
            // selectedOption={ capitalizeFirstLetter(employeeData.mode_of_identification.replace(/_/g, " "))}
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
        name="mode_of_identification_number"
        defaultValue={ employeeData.mode_of_identification_number}
        onChange={handleOnChange}
    />
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
        defaultValue={ employeeData.position}
        onChange={handleOnChange}
    />
    </div>
  
    <div className=" w-full mb-[2rem] md:mb-0">
    <TextField
        label="Payslip type"
        placeholder="e.g.3099******"
        // onClick={''}
        type="text"
        paddingY="py-[0.5rem]"
        fontSize="font-[500]"
        textSize="text-[0.875rem]"
        name="payslip_type"
        defaultValue={  employeeData.payslip_type}
        onChange={handleOnChange}
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
            defaultValue={ employeeData.salary_amount}
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
            defaultValue={ employeeData.work_days_in_month}
            onChange={handleOnChange}

    />
    </div>

    <div className=" w-auto mb-[2rem] md:mb-0">
    <TextField
            label="Work hour per day"
            type="text"
            placeholder="e.g.Joy johnson"
            fontSize="font-[500]"
            textSize="text-[0.875rem]"
            paddingY="py-[0.5rem]"
            name="work_hour_per_day"
            defaultValue={  employeeData.work_hour_per_day}
            onChange={handleOnChange}

    />
    </div>

    <div className=" w-full mb-[2rem] md:mb-0">
    <SelectField
            label="Shift"
            options={["Morning","Afternoon","Evening"]}
            placeholder="e.g.Joy johnson"
            fontSize="font-[500]"
            textSize="text-[0.875rem]"
            paddingY="py-[0.5rem]"
            name="work_shift"
            // selectedOption={ capitalizeFirstLetter(employeeData.work_shift) }
            onChange={handleOnChange}
    />
    </div>
    <div className=" w-full mb-[2rem] md:mb-0">
                <SelectField
                                    label="Profile status"
                                    options={["Active", "Deactivate"]}

                                    name="status"
                                    // placeholder="e.g.Joy johnson"
                                    fontSize="font-[500]"
                                    textSize="text-[0.875rem]"
                                    paddingY="py-[0.5rem]"
                                    onChange={handleOnChange}
                                    selectedOption={employeeData.status}
                                    // selectedOption={employeeData.status}
                                    // errMsg={errMsgs. && errMsgs.work_shift}

        />
    </div>

    
    </div>
        

       

        <div className=" w-full mt-[1rem] md:mb-0">
            <p className='text-[0.875rem] mb-[0.5rem]'>Work days</p>
                            {/* {

                Object.entries(employeeData.workschedule).map(([day, checked])=>(
                    <CheckboxWithLabel key={day}  name={day} id={day} onChange={(e)=>updateWorkSchedule(day, e.target.checked)} checked={checked}   label={ day.charAt(0).toUpperCase() + day.slice(1)} />

                    ))

                    // workSchedule.map((item,index)=>(

                    //     <CheckboxWithLabel name="workschedule" key={item} id={item}   label={item} />
                    // ))
                } */}

                                    <CheckboxWithLabel  onChange={handleCheckboxChange} checked={employeeData.sunday} name="sunday" label="Sunday" />
                                    <CheckboxWithLabel  onChange={handleCheckboxChange} checked={employeeData.monday} name="monday" label="Monday" />
                                    <CheckboxWithLabel  onChange={handleCheckboxChange} checked={employeeData.tuesday} name="tuesday" label="Tuesday" />
                                    <CheckboxWithLabel  onChange={handleCheckboxChange} checked={employeeData.wednesday} name="wednesday" label="Wednesday" />
                                    <CheckboxWithLabel  onChange={handleCheckboxChange} checked={employeeData.thursday} name="thursday" label="Thursday" />
                                    <CheckboxWithLabel  onChange={handleCheckboxChange} checked={employeeData.friday} name="friday" label="Friday" />
                                    <CheckboxWithLabel  onChange={handleCheckboxChange} checked={employeeData.saturday} name="saturday" label="Saturday" />
         </div>
       
    
    </div>

    <div className="mt-[3rem]">
    <h1 className='font-[600] text-[1rem]'>Staff confirmation</h1>
    <div className='flex items-center my-[1.5rem] gap-x-[0.5rem]'>
       
    <Checkbox checked={true} 
    onChange={(e)=>setEmployeeData(prevEmployeeData => ({
        ...prevEmployeeData,
        on_create_accept_terms_and_condition:e.target.checked
                                  }))}
    
    />
        <p className='text-[0.85rem] leading-[24px]'>
        {/* We confirm that this person is a staff at Williams Specialist Hospital located at No 14 Roadrid street, Ikeja Lgos, Nigeria and he’s oblige to  be taking salary in-advance through WagePull Inc. */}
        We confirm that this person is a staff at {adminInfo.organization.name} located at  {adminInfo.organization.address}, Nigeria and he’s oblige to  be taking salary in-advance through Milarn.
        </p>
    </div>
    
    {
        !isSuccess? null : <p className='py-[1rem] text-[var(--primary-color)]'>Record updated Successfully</p>
    }
    {/* <p className='text-[var(--secondary-color)] font-[500]'>You need to confirm this staff to proceed</p> */}
    </div>

    <div className=" mt-[3rem]">
        <div className="flex items-start flex-wrap gap-x-[1rem] sm:flex-nowrap gap-y-[1.5rem]">
            <InnerButton onClick={handleSubmit } text={`${isPending? "Loading...": "Update profile"}`}  type="button"  width="w-fit " />
            <OutlineButton text="Delete" icon={<IoTrashOutline size={15} />}  />

            {/* <button type="button" className='p-[14px_28px_14px_28px] hover:bg-[var(--grey-color)]  hover:border-none transition-all duration-[0.3s]  border-[1px] border-[#374151] rounded-[4px]'>Delete</button> */}
        </div>
    </div>
</form>
        </div>


    </div>
        }
    </>
    
  )
}


function capitalizeFirstLetter(string) {
    return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }