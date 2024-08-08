
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBulkEmployeeData, addEmployeeBonusOrDeduction, addEmployeeData,  adminLogin, computeEmployeeSalary, computeStaffWagePulled, deleteEmployeeData,  forgetPassword, getGeneratePayroll, payEmployeeSalary, payStaffWagePulled, registerOrganization, requestCard, resendTokenForRegistration, resetNewPassword, updateAdminProfile, updateBankEmployeeData, updateFormOneAndTwo, updateFormThree, updateOrgBankInfo, updateOrgInfo, updateSingleEmployeeData, verifyEmailForRegistration, verifyFormThreeOTPCode, verifyPwdToken } from "./api";
import {  useNavigate} from 'react-router-dom'
 
  
// AUTH ENDPOINTS //////////////////////////////////////////////////////////////////

//For Login: 
export function useAdminLoginMutation(){
    const queryClient = useQueryClient();
         
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ['adminData'],
        mutationFn:(data)=>adminLogin(data),
        // staleTime:Infinity,
         onSuccess: (data)=>{
            // const token = data.token.access
            // localStorage.setItem('adminToken',token);
            
            localStorage.setItem('adminInfo', JSON.stringify(data))
            
         },
        
         onSettled: async (data)=>{
            const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
            if (adminInfo) {
      
                if(adminInfo.token.access !==null && adminInfo.organization.account_status === "pending"  ){
                    return navigate('/onboarding')
                }
                if(adminInfo.token.access !==null && adminInfo.organization.account_status ===  "approved" ){
                return navigate('/admin')
                }
                // return  await queryClient.setQueryData("adminData");
              } 

         }
    })
}



// For Forget Password
export function useForgetPasswordMutation(){
    const queryClient = useQueryClient();
    const navigate = useNavigate()


    return useMutation({
        mutationKey:['forgetPassword'],
        mutationFn:(email)=>forgetPassword(email),
     
        onSettled: async (data)=>{
            if (data) {
                if(data.status === 200 ){
                    return navigate('/verify-otp')
                }else{
                    return  await queryClient.invalidateQueries({ queryKey: ["forgetPassword"] });
                }
              } else {
               return  await queryClient.invalidateQueries({ queryKey: ["forgetPassword"] });
              }

         }
    })
         

}


// To Resend OTP code for registration page
export function useResendTokenForRegistration(){

    return useMutation({
        mutationKey:['resendOtpRegistration'],
        mutationFn:(email)=>resendTokenForRegistration(email),
    })
         
}




// For Verification of Password Token 
export function useVerifyPwdTokenMutation(){
    const queryClient = useQueryClient();
    const navigate = useNavigate()


    return useMutation({
        mutationKey:['verifyToken'],
        mutationFn:(token)=>verifyPwdToken(token),
        onSuccess:(res)=>{
            if(res.status === 200 ){
             
              
                return sessionStorage.setItem('pwdToken', res.token)
            }
        },
        onError: (err)=>{
                // console.log(err)
        },
     
        onSettled: async (data)=>{
            if (data) {

                if(data.status === 200 ){
             
                    
                    return navigate('/set-password')
              
                }
              } 

         }
    })
         

}


// To verify email for registration
export function useVerifyEmailForRegistration(){
    const queryClient = useQueryClient();
    const navigate = useNavigate()


    return useMutation({
        mutationKey:['verifyToken'],
        mutationFn:(token)=>verifyEmailForRegistration(token),
        onSuccess:(data)=>{
            if(data.status === 200 ){
             
              console.log(data)
                // return sessionStorage.setItem('pwdToken', res.token)
                localStorage.setItem('adminInfo', JSON.stringify(data))
            }
        },
        onError: (err)=>{
                console.log(err)
        },
     
        onSettled: async (data)=>{
            // if (data) {

            //     if(data.status === 200 ){
             
                    
            //         return navigate('/set-password')
              
            //     }
            //   } 

            const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
            if (adminInfo) {
      
                if(adminInfo.token.access !==null && adminInfo.organization.account_status === "pending"  ){
                    return navigate('/onboarding')
                }
                if(adminInfo.token.access !==null && adminInfo.organization.account_status ===  "approved" ){
                return navigate('/admin')
                }
                // return  await queryClient.setQueryData("adminData");
              } 

         }
    })
         

}


// To New Password for Admin 
export function useNewPasswordMutation(){
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    return useMutation({
        mutationKey:['setNewPassword'],
        mutationFn:(data)=>resetNewPassword(data),
        // onSuccess:async (res)=>{
        //     console.log(res)

        // },
        // onSettled: async (err)=>{
        //         console.log(err)
        // }
     

    })
         

}










//For Registrations

export function useRegOrgMutation(){
    const queryClient = useQueryClient();
    const navigate = useNavigate()


    return useMutation({
        mutationKey:['registerOrg'],
        mutationFn:(data)=>registerOrganization(data),
        onSuccess: (data)=>{
            localStorage.setItem('adminInfo', JSON.stringify(data))
        },
     
        onSettled: async (data)=>{
            if (data) {

                if(data.status === 200 ){
                   
                   console.log(data.message);
                    // return navigate('/set-password')
                }else{
                    return  await queryClient.invalidateQueries({ queryKey: ["employeesData"] });
                }
              } else {
               return  await queryClient.invalidateQueries({ queryKey: ["employeesData"] });
              }

         }
    })
         

}


// AUTH ENDPOINTS //


// ONBOARDING / MULTI-STEP FORM  ENDPOINTS //////////////////////////////////////////////////////////////////

//To  Update Content on Form One and Form Two: 
export function useFormOneAndTwoMutation(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['updateFormAndTwo'],
        mutationFn:(data)=>updateFormOneAndTwo(data),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["mutiStepForm"] });
        },
        onError:(error)=>{
            
            // console.log(error);
        }
        
        
    })
         

}


//To  Update Content on Form Three (Bank Information)
export function useFormThree(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['updateFormThree'],
        mutationFn:(data)=>updateFormThree(data),

        
        
    })
         

}


export function useVerifyFormThreeOTPCode(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['verifyFormThreeOTPCode'],
        mutationFn:(otpCode)=>verifyFormThreeOTPCode(otpCode),

     
        
    })
         

}




// ONBOARDING / MULTI-STEP FORM  ENDPOINTS //




// STAFF LIST PAGE //////////////////////////////////////////////////////////////////

// To Add new staffs
export function useAddNewEmployee(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['addNewStaff'],
        mutationFn:(data)=>addEmployeeData( data),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["employeesData"] });
        },
        onError:(error)=>{
            console.log(error);
          
        }
        
        
    })
         

}


// To Add Bulk staffs
export function useAddBulkEmployee(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['addBulkStaff'],
        mutationFn:(data)=>addBulkEmployeeData( data),

        onSuccess:async (success)=>{
            
          
        },
        onError:(error)=>{
            console.log(error);
          
        },
        onSettled:async ()=>{
            return  await queryClient.invalidateQueries({ queryKey: ["employeesData"] });
        }
        
        
    })
         

}



// To Update staffs
export function useUpdateEmployee(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['updateEmployee'],
        mutationFn:(staffCode, data)=>updateSingleEmployeeData(staffCode, data),

        // onSuccess:async (success)=>{
            
        //     return  await queryClient.invalidateQueries({ queryKey: ["employeesData"] });
        // },
        onError:(error)=>{
            console.log(error);
           
        },
        onSettled:()=>{
            return  queryClient.invalidateQueries({ queryKey: ["employeesData"] });
        }
        
        
    })
         

}


// To Update staff Bank Account
export function useUpdateBankEmployeeData(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['updateBankEmployeeData'],
        mutationFn:(staffCode, data)=>updateBankEmployeeData(staffCode, data),

        // onSuccess:async (success)=>{
            
        //     return  await queryClient.invalidateQueries({ queryKey: ["employeesData"] });
        // },
        onError:(error)=>{
            console.log(error);
           
        },
        onSettled:()=>{
            return  queryClient.invalidateQueries({ queryKey: ["employeesData"] });
        }
        
        
    })
         

}
// To Delete staffs
export function useDeleteEmployee(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['deleteStaff'],
        mutationFn:(staffCode)=>deleteEmployeeData(staffCode),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["employeesData"] });
        },
        onError:(error)=>{
            console.log(error);
           
        }
        
        
    })
         

}


// To request for card

export function useRequestCard(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['requestCard'],
        mutationFn:(staffCode)=>requestCard(staffCode),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["employeesData"] });
        },
        onError:(error)=>{
            console.log(error);
           
        }
        
        
    })
         

}

// To Delete Staff Record


// To Activate Staff 


// To Deativate Staff 



// STAFF LIST PAGE //




// PAYROLL PAGE ENDPOINTS //////////////////////////////////////////////////////////////////

// To generate Payroll 
export function useGeneratePayroll(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['generatePayroll'],
        mutationFn:(monthAndYear)=>getGeneratePayroll(monthAndYear),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["fetchAllOrgPayroll"] });
        },
        onError:(error)=>{
            console.log(error);
           
        }
        
        
    })
         

}




//To fetch All Payroll : 


export function useAllOrgPayroll(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['generatePayroll'],
        mutationFn:(monthAndYear)=>getGeneratePayroll(monthAndYear),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["fetchAllOrgPayroll"] });
        },
        onError:(error)=>{
            console.log(error);
           
        }
        
        
    })
         

}



//To Compute Employee Payroll Salary : 


export function useComputeEmployeeSalary(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['computeEmployeeSalary'],
        mutationFn:(data)=>computeEmployeeSalary(data),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["fetchAllOrgPayroll"] });
        },
        onError:(error)=>{
            console.log(error);
           
        }
        
        
    })
         

}
//To Payout Employee Salary : 


export function usePayEmployeeSalary(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['payEmployeeSalary'],
        mutationFn:(data)=>payEmployeeSalary(data),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["fetchAllOrgPayroll"] });
        },
        onError:(error)=>{
            console.log(error);
           
        }
        
        
    })
         

}



//To Add Employee Bonus or Deduction: 


export function useAddEmployeeBonusOrDeduction(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['payEmployeeSalary'],
        mutationFn:(data)=>addEmployeeBonusOrDeduction(data),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["fetchAllOrgPayroll"] });
        },
        onError:(error)=>{
            console.log(error);
           
        }
        
        
    })
         

}





// PAYROLL PAGE ENDPOINTS //



// WAGEPULL PAGE ENDPOINTS //////////////////////////////////////////////////////////////////

// To Compute Staff Organization Wagepull 

export function useComputeStaffWagePulled(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['computeStaffWagePulled'],
        mutationFn:(data)=>computeStaffWagePulled(data),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["getOrgWagePullInfo"] });
        },
        onError:(error)=>{
            console.log(error);
           
        }
        
        
    })
         

}
// To Pay Staff Organization Wagepull 

export function usePayStaffWagePulled(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['payStaffWagePulled'],
        mutationFn:(staffCode)=>payStaffWagePulled(staffCode),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["getOrgWagePullInfo"] });
        },
        onError:(error)=>{
            console.log(error);
           
        }
        
        
    })
         

}



// WAGEPULL PAGE ENDPOINTS //






// SETTINGS PAGE ENDPOINTS //////////////////////////////////////////////////////////////////

// To Update Org Bank Info

export function useUpdateOrgBankInfo(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['updateOrgBankInfo'],
        mutationFn:(data)=>updateOrgBankInfo(data),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["fetchAllOrgStettings"] });
        },
        onError:(error)=>{
            console.log(error);
           
        }
        
        
    })
         

}



// To Update Org Info

export function useUpdateOrgInfo(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['updateOrgInfo'],
        mutationFn:(data)=>updateOrgInfo(data),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["fetchAllOrgStettings"] });
        },
        onError:(error)=>{
            console.log(error);
           
        }
        
        
    })
         

}
// To Update Org Info

export function useUpdateAdminProfile(){

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['updateAdminInfo'],
        mutationFn:(data)=>updateAdminProfile(data),

        onSuccess:async (success)=>{
            
            return  await queryClient.invalidateQueries({ queryKey: ["adminData"] });
        },
        onError:(error)=>{
            console.log(error);
           
        }
        
        
    })
         

}


// SETTINGS PAGE ENDPOINTS //