import { redirect } from "react-router-dom"
import axiosInstance from "../baseURL"


 
// AUTH ENDPOINTS //////////////////////////////////////////////////////////////////

//For Login:  
export const adminLogin = async (credentials)=>{

    const response = await axiosInstance.post('auth/login/', credentials)
    return response.data 
}

// For Forget Password:
export const forgetPassword = async (email)=>{
    const response = await axiosInstance.post('auth/password/forget/', {email:email})
    return response.data 
}
 

// For Verification of Password Token: == FOR RESEND TOKEN UNDER RESET PASSWORD
export const verifyPwdToken = async (token)=>{

    const response = await axiosInstance.post('auth/password/verify/', {token:token})
    return response.data 
}


// For Verification of Email with Token: == FOR REGISTRATION PAGE
export const verifyEmailForRegistration = async (token)=>{

    const response = await axiosInstance.post('auth/email/confirmation/', {token:token})
    return response.data 
}


// For Resend of Email Verification == NOT DONE ->FOR REGISTRATION PAGE == FOR RESEND TOKEN UNDER REG PAGE
export const resendTokenForRegistration = async (email)=>{

    const response = await axiosInstance.post('/auth/email/resend_token/', {email:email})
    return response.data 
}



// For Reset New Password:
export const resetNewPassword= async (data)=>{

    const response = await axiosInstance.post('auth/password/reset/',data)
    return response.data 
}



// For Organization Registration:
export const registerOrganization = async (data)=>{
    const response = await axiosInstance.post('auth/organization/register/',data)
    return response.data 
}



// AUTH ENDPOINTS //






// ONBOARDING / MULTI-STEP FORM  ENDPOINTS //////////////////////////////////////////////////////////////////

//To  Update Content on Form One and Form Two: 
export const updateFormOneAndTwo = async (data)=>{
    
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    if(adminInfo){
        const accessToken ={
            headers:{
                "content-type": "application/json",
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }
    

    const response = await axiosInstance.patch('organization/'+adminInfo.organization.code, data, accessToken)
    return response.data
    }else{
        return redirect("/")
    }
}



//To  Update Content on Form Three (Bank Information): 
export const updateFormThree = async (data)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))

    if(adminInfo){
        const accessToken ={
            headers:{
                "content-type": "application/json",
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }
        
        const response = await axiosInstance.patch('organization/'+adminInfo.organization.code+'/bank/', data, accessToken)
        return response.data
    }else{
        return redirect("/")
    }
   
   
}

// Verify Form Three OTP Code on Modal Box

export const verifyFormThreeOTPCode = async (otpCode)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))

    if(adminInfo){
        const accessToken ={
            headers:{
                "content-type": "application/json",
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }
        
        const response = await axiosInstance.patch('organization/'+adminInfo.organization.code+'/bank/bvn/finalize/', otpCode, accessToken)
        return response.data
    }else{
        return redirect("/")
    }
   
   
}

// ONBOARDING / MULTI-STEP FORM  ENDPOINTS //

















// DASHBOARD ENDPOINTS //////////////////////////////////////////////////////////////////

//For Dashboard: 
export const getDashboardData = async ()=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))

    if(adminInfo){

        const accessToken ={
            headers:{
                "content-type": "application/json",
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }
        const requests = [
            axiosInstance.get('organization/'+adminInfo.organization.code+'/dashboard/overview', accessToken),
            // axiosInstance.get('transaction/organization/'+adminInfo.organization.code+'/wagepull/dashboard',  accessToken),
            axiosInstance.get('analytics/organization/'+adminInfo.organization.code+'/dashboard/overview/',  accessToken),
            axiosInstance.get('analytics/organization/'+adminInfo.organization.code+'/dashboard/graph/?graph_type=weekly',  accessToken),
            axiosInstance.get('analytics/organization/'+adminInfo.organization.code+'/dashboard/graph/?graph_type=monthly',  accessToken),
            axiosInstance.get('analytics/organization/'+adminInfo.organization.code+'/dashboard/graph/?graph_type=yearly',  accessToken)
        ]
    
        const responses = await Promise.all(requests)
        return responses;
    }else{
        return redirect('/')
    }
   
 


}

// DASHBOARD ENDPOINTS //










// STAFF LIST PAGE ENDPOINTS //////////////////////////////////////////////////////////////////

// To Fetch  all Registered Staffs
export const getAllResgisteredEmployees = async () =>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.get('organization/'+adminInfo.organization.code+'/staff/', accessToken)
     return response.data
}



// To Export  all Registered Staffs in Excel Format
export const exportAllResgisteredEmployees = async () =>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.get('organization/'+adminInfo.organization.code+'/staff/bulk/export/', accessToken)
     return response.data

    // const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    // const excelSheet = URL.createObjectURL(blob);
    // return excelSheet
}





//To Add New Employee to Organization
export const addEmployeeData = async ( data)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            // "content-type": "application/json",
            "Content-Type": "multipart/form-data",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }

    const response = await axiosInstance.post('organization/'+adminInfo.organization.code+'/staff/',data, accessToken)
    return response.data


}

//To Add New Employees in Bulk to Organization
export const addBulkEmployeeData = async ( data)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            // "content-type": "application/json",
            "Content-Type": "multipart/form-data",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }

    const response = await axiosInstance.post('organization/'+adminInfo.organization.code+'/staff/bulk/upload/',data, accessToken)
    return response.data


}





// To Get Single Staff Data
export const getSingleEmployeeData = async (staffCode)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    
    const response = await axiosInstance.get('organization/'+adminInfo.organization.code+'/staff/'+staffCode+'/', accessToken)
    return response.data
}


// To Get Single Staff Analytics Overview
export const getSingleEmployeeAnalyticsOverview = async (staffCode)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    
    const response = await axiosInstance.get('analytics/organization/'+adminInfo.organization.code+'/staff/'+staffCode+"/overview/", accessToken)
    return response.data
  
    
}




// To Get Single Staff Payroll History Data
export const getSingleEmployeePayrollHistory = async (staffCode)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    
    const response = await axiosInstance.get('payroll/organization/'+adminInfo.organization.code+'/staff/'+staffCode+"/salaries/", accessToken)
    return response.data
    
    
}



// To Get Single Staff Payroll History Details
export const getSingleEmployeePayrollHistoryDetails = async (staffCode, payrollCode)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    
    const response = await axiosInstance.get('payroll/organization/'+adminInfo.organization.code+'/staff/'+staffCode+"/salaries/"+payrollCode+"/", accessToken)
    return response.data
    
    
}


// To Get Single Staff Wagepull History Data
export const getSingleEmployeeWagepullHistory = async (staffCode)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    
    const response = await axiosInstance.get('transaction/organization/'+adminInfo.organization.code+'/wagepull/staff/'+staffCode+"/history/", accessToken)
    return response.data
    
}


// To Get Single Staff Wage Stream History Data
export const getSingleEmployeeWageStreamHistory = async (staffCode)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
    
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    
    const response = await axiosInstance.get('transaction/organization/'+adminInfo.organization.code+'/wagestreams/?staff__code='+staffCode, accessToken)
    return response.data
    
}
// {{baseUrl}}/transaction/organization/{{organization_code}}/wagestreams/?staff__code=




// To Update Single Staff Data
export const updateSingleEmployeeData = async ({staffCode,data})=>{
    
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "Content-Type": "multipart/form-data",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.patch('organization/'+adminInfo.organization.code+'/staff/'+staffCode+'/', data,accessToken)
    return response.data

}


// To Update Single Staff Bank  Data
export const updateBankEmployeeData = async ({staffCode,data})=>{
  
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
 
    const accessToken ={
        headers:{
          
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.patch('organization/'+adminInfo.organization.code+'/staff/'+staffCode+'/bank/', data,accessToken)
    return response.data
}


// {{baseUrl}}/analytics/organization/{{organization_code}}/staff/{{staff_code}}/graph/?graph_type=yearly

// To Get Single Staff Chart Payroll History Data 
// const getSingleEmployeePayrollChartData = async (staffCode)=>{

//     const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
//     const accessToken ={
//         headers:{
//             "content-type": "application/json",
//             Authorization : 'Bearer ' + adminInfo.token.access
//         }
//     }
//     const response = await axiosInstance.get('analytics/organization/'+adminInfo.organization.code+'/staff/'+staffCode+'/graph/?graph_type=monthly', accessToken)
//     return response.data
// }


// To Get Single Staff Chart Wage History Data 
export const getSingleEmployeeWageChartData = async (staffCode)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }

    if(adminInfo){
        const requests = [

            axiosInstance.get('analytics/organization/'+adminInfo.organization.code+'/staff/'+staffCode+'/graph/?graph_type=weekly', accessToken),
            axiosInstance.get('analytics/organization/'+adminInfo.organization.code+'/staff/'+staffCode+'/graph/?graph_type=monthly', accessToken),
            axiosInstance.get('analytics/organization/'+adminInfo.organization.code+'/staff/'+staffCode+'/graph/?graph_type=yearly', accessToken)
        ]
        const responses = await Promise.all(requests)
        return responses;
    }else{
        redirect("/")
    }
    
    // const response = await axiosInstance.get('analytics/organization/'+adminInfo.organization.code+'/staff/'+staffCode+'/graph/?graph_type=yearly', accessToken)
    // return response.data
}



// {{baseUrl}}/cards/organization/{{organization_code}}/staff/{{staff_code}}/request/
// To request for card
export const requestCard = async (staffCode)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
  
    const accessToken ={
        headers:{
        
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.patch('/cards/organization/'+adminInfo.organization.code+'/staff/'+staffCode+'/request/',staffCode,accessToken)
    return response.data
}


//====>MENU LIST 

// To Delete Staff Data
export const deleteEmployeeData = async (staffCode)=>{

    console.log(staffCode)
   

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
        
    const accessToken ={
        headers:{
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.delete('organization/'+adminInfo.organization.code+'/staff/', staffCode,accessToken)

    return response.data
}


// To Deactivate Staff Data
export const deactivateSingleEmployeeData = async (staffCode)=>{

   

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
        
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.patch('organization/'+adminInfo.organization.code+'/staff/bulk/deactivate/', staffCode,accessToken)

    return response.data
}



// STAFF LIST PAGE ENDPOINTS //







// PAYROLL PAGE ENDPOINTS //////////////////////////////////////////////////////////////////

// To Fetch  all payroll

export const getAllOrgPayroll = async (monthAndYear)=>{
        // console.log(monthAndYear)
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.get(`payroll/organization/${adminInfo.organization.code}/salaries/?month=${monthAndYear.month}&year=${monthAndYear.year}`, accessToken)
    return response.data
}


// To Generate Payrol

export const getGeneratePayroll = async (monthAndYear)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
  
    const accessToken ={
        headers:{
        
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.post('payroll/organization/'+adminInfo.organization.code+'/generate/',monthAndYear, accessToken)
    return response.data
}





// To Compute Employee Payroll Salary

export const computeEmployeeSalary = async (data)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
  
    const accessToken ={
        headers:{
        
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.post('payroll/organization/'+adminInfo.organization.code+'/compute/',data, accessToken)
    return response.data
}


// To Pay Employee Payroll Salary

export const payEmployeeSalary = async (data)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
  
    const accessToken ={
        headers:{
        
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.post('payroll/organization/'+adminInfo.organization.code+'/payout/',data, accessToken)
    return response.data
}



// To Add Bonus or Deduction

export const addEmployeeBonusOrDeduction = async (data)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
  
    const accessToken ={
        headers:{
        
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.post('payroll/organization/'+adminInfo.organization.code+'/allowances/bulk/',data, accessToken)
    return response.data
}


// To




// FOR  PAYROLL LEFT COMPO
// {{baseUrl}}/payroll/organization/{{organization_code}}/overview/

export const getPayrollOverview = async (monthAndYear)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
  
    const accessToken ={
        headers:{
        
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.get('payroll/organization/'+adminInfo.organization.code+'/overview/', accessToken)
    return response.data
}



// PAYROLL PAGE ENDPOINTS //














// WAGEPULL PAGE ENDPOINTS //////////////////////////////////////////////////////////////////

// To get the overview wagepull 
export const getOrgWagepullOverview = async ()=>{
 
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
 
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.get('analytics/organization/'+adminInfo.organization.code+'/dashboard/overview/', accessToken)
    return response.data
}



// To get all Organizations Wagepull Info
export const getOrgWagePulled = async (monthAndYear)=>{
 
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
 
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.get('transaction/organization/'+adminInfo.organization.code+`/wagepull/?limit=50&page=1&month=${monthAndYear?.month}&year=${monthAndYear?.year}`, accessToken)
    return response.data
}


// To get Recent Organizations Wagepull Info
export const getRecentOrgWagePulled = async ()=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.get('transaction/organization/'+adminInfo.organization.code+'/wagepull/recent/', accessToken)
    return response.data
}




// To Compute Staff Organization Wagepull Info
export const computeStaffWagePulled = async (data)=>{

    console.log(data)
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "Content-Type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.post('transaction/organization/'+adminInfo.organization.code+'/wagepull/repayments/compute/',data, accessToken)
    return response.data
}



// To Pay Staff Organization Wagepull Info
export const payStaffWagePulled = async (staffCode)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.patch('transaction/organization/'+adminInfo.organization.code+'/wagepull/repayments/pay/',staffCode, accessToken)
    return response.data
}








// WAGEPULL PAGE ENDPOINTS //













// FINANCE PAGE ENDPOINTS //////////////////////////////////////////////////////////////////

// To get all Wallet Funding History

export const getWalletFunding = async ()=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.get('/wallet/organization/'+adminInfo.organization.code+'/transactions/', accessToken)
    return response.data
}



// To get all the Payroll History 
export const getPayrollHistory = async ()=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.get('/payroll/organization/'+adminInfo.organization.code+'/transactions/', accessToken)
    return response.data
}


// To get all Repayment History
export const getRepaymentHistory = async ()=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.get('/transaction/organization/'+adminInfo.organization.code+'/wagepull/repayments/', accessToken)
    return response.data
}




// FINANCE PAGE ENDPOINTS //
















// SETTINGS PAGE ENDPOINTS //////////////////////////////////////////////////////////////////

// To get all Organizations Info
export const getOrgSettingsInfo = async ()=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.get('organization/'+adminInfo.organization.code, accessToken)
    return response.data
}



// To Update Org Bank Info
export const updateOrgBankInfo = async (data)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            "content-type": "application/json",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.patch('organization/'+adminInfo.organization.code+"/bank/",data, accessToken)
    return response.data
}

// To Update Org Info
export const updateOrgInfo = async (data)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
 
    const accessToken ={
        headers:{
            // "content-type": "application/json",
            "Content-Type": "multipart/form-data",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.patch('organization/'+adminInfo.organization.code,data, accessToken)
    return response.data
}



// To Update Org Info
export const updateAdminProfile = async (data)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
   
    const accessToken ={
        headers:{
            // "content-type": "application/json",
            "Content-Type":  "multipart/form-data",
            Authorization : 'Bearer ' + adminInfo.token.access
        }
    }
    const response = await axiosInstance.patch('user/',data, accessToken)
    return response.data
}

// {{baseUrl}}/user/


// SETTINGS PAGE ENDPOINTS //









