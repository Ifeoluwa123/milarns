// context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';



const AuthContext = createContext();

export default function AuthProvider({children}) {
   
    const registerField = {
        country_code:'',
        email:'',
        first_name:'',
        last_name:'',
        name:'',
        password:'',
        phone_number:''

    } 

    const [userLoginData,  setUserLoginData] = useState(null);
    const [isAuthenticated,  setAuthenticated] = useState(false);
    // const [isStatusComplete, setStatusComplete] = useState(false)
    const userdata = JSON.parse(sessionStorage.getItem('userdata'))?.organization.is_profile_completed 
    const [isStatusComplete, setStatusComplete] = useState(userdata || false)
    // console.log(JSON.parse(sessionStorage.getItem('userdata')).organization.is_profile_completed

    // )
    // const [isStatusComplete, setStatusComplete] = useState(!true)
    const [userType, setUserType] = useState(sessionStorage.getItem('user') || null)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const [adminData,  setAdminData] = useState(JSON.parse(localStorage.getItem('adminInfo')) || {});
    const [superadminData,  setSuperadminData] = useState(JSON.parse(sessionStorage.getItem('userdata')) || {user:{user_type:''}});


    const [userRegistrationData, setUserRegistrationData] = useState(registerField)
    let [userRegErr, setUserRegErr] = useState({error:''})
    let [staffCode, setStaffCode] = useState(JSON.parse(sessionStorage.getItem('staffcode')) || null )
    let [errMsg, setErrMsg] = useState(null)
    let [successMsg, setSuccessMsg] = useState(null)
    
    
    const login = (userData)=>{
        setUserLoginData(userData)
    }



    // const [singleUserForm, setSingleUserForm] = useState({
    //     email:null,
    //     first_name:null,
    //     last_name:null,
    //     phone_number:null,
    //     whatsapp_phone_number:null,
    //     gender:null,
    //     home_address:null,
    //     state:null,
    //     country:null,
    //     position:null,
    //     salary_amount:null,
    //     work_days_in_month:null,
    //     work_hour_per_day:null,
    //     payslip_type:null,
    //     work_shift:null,
    //     mode_of_identification_number:null,
    //     mode_of_identification:null,
    //     on_create_accept_terms_and_condition:null,
    //     workschedule:null,
    //     bankinformation:null

    // })

    const values = {
        userLoginData,  setUserLoginData,
        isAuthenticated,  setAuthenticated,
        adminData,  setAdminData,
        superadminData,  setSuperadminData,
        isSideBarOpen, setIsSideBarOpen,
        userRegistrationData, setUserRegistrationData,
        userRegErr, setUserRegErr,
        isStatusComplete, setStatusComplete,
        userType, setUserType,
        staffCode, setStaffCode,
        errMsg, setErrMsg,
        successMsg, setSuccessMsg
        // singleUserForm, setSingleUserForm,
       
       
    }
    
  return (
       <AuthContext.Provider value={values}>
            {children}
       </AuthContext.Provider>
  )
}


export function useAuth(){
    return useContext(AuthContext)
} 