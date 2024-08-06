
import {useQuery,useQueries,keepPreviousData,useInfiniteQuery,useQueryClient,} from "@tanstack/react-query";
import { exportAllResgisteredEmployees, getAllOrgPayroll, getAllResgisteredEmployees, getDashboardData, getOrgSettingsInfo, getOrgWagePulled, getPayrollOverview, getSingleEmployeeData, getSingleEmployeePayrollHistory, getSingleEmployeeWagepullHistory,getSingleEmployeeWageChartData, getSingleEmployeeWageStreamHistory, getSingleEmployeeAnalyticsOverview, getSingleEmployeePayrollHistoryDetails, getRecentOrgWagePulled, getWalletFunding, getPayrollHistory, getRepaymentHistory, getOrgWagepullOverview } from "./api";
import { getBankNames, getCountryNames, getHearAboutUs, getNigeriaState, getOrganizationIndustry, getOrganizationInfo } from "../customFetch";

 
 


 
// DASHBOARD ENDPOINTS //////////////////////////////////////////////////////////////////

//For Dashboard: 
export const useDashboardDataDataQuery = ()=>{

    return useQuery({ 
        queryKey:['adminData'],
        queryFn:()=>getDashboardData(),
        // cacheTime:2000,
        // staleTime:3000
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        onError:(err)=>{
            console.log(err)
        }
    })
}

// DASHBOARD ENDPOINTS //





// ONBOARDING / MULTI-STEP FORM  ENDPOINTS //////////////////////////////////////////////////////////////////

//For Form one and Form Two: 
export const useFormOneAndTwoDataQuery =  ()=>{
//    const queryClient =  useQueryClient()
    return useQuery({ 
        queryKey:["mutiStepForm"],
        queryFn:()=>getOrganizationInfo(),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
}

//ONBOARDING / MULTI-STEP FORM  ENDPOINTS //




// FOR CUSTOM FETCH ONLY ENDPOINTS  //////////////////////////////////////////////////////////////////

//For Hear-About-Us: 
export const useHearAboutUs =  ()=>{
    return useQuery({ 
        queryKey:["hearAboutUs"],
        queryFn:()=>getHearAboutUs(),
        // staleTime:Infinity,
        cacheTime:4000,
        
    })
}


//For All Industries : 
export const useOrganizationIndustry =  ()=>{
    return useQuery({ 
        queryKey:["orgIndustry"],
        queryFn:()=>getOrganizationIndustry(),
        // staleTime:Infinity,
        cacheTime:4000,
        
    })
}


//For List  of Banks: 
export const useBankNames =  ()=>{
    return useQuery({ 
        queryKey:["bankNames"],
        queryFn:()=>getBankNames(),
        // staleTime:Infinity,
        cacheTime:4000,
        
    })
}


//For List of Countries: 
export const useCountryLists =  ()=>{
    return useQuery({ 
        queryKey:["countryList"],
        queryFn:()=>getCountryNames(),
        // staleTime:Infinity,
        cacheTime:4000,
        
    })
}


//For List of States in Nigeria: 
export const useNigeriaState =  ()=>{
    return useQuery({ 
        queryKey:["NigeriaState"],
        queryFn:()=>getNigeriaState(),
        // staleTime:Infinity,
        cacheTime:4000,
        
    })
}

//FOR CUSTOM FETCH ONLY ENDPOINTS //





// STAFF PAGE ENDPOINT QUERIES  //////////////////////////////////////////////////////////////////

//To Fetch All Staffs : 
export const useAllResgisteredEmployees = ()=>{

    return useQuery({ 
        queryKey:['employeesData'],
        queryFn:()=>getAllResgisteredEmployees(),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
}


//To export All Staffs : 
export const useExportAllResgisteredEmployees = ()=>{

    return useQuery({ 
        queryKey:['exportEmployeeData'],
        queryFn:()=>exportAllResgisteredEmployees(),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}
//To fetch Single Staffs Information : 
export const useSingleEmployeeData = (staffCode)=>{

    return useQuery({ 
        queryKey:['getSingleDetailsEmployeeData'+staffCode],
        queryFn:()=>getSingleEmployeeData(staffCode),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}




//To Get Single Staff Analytics Overview
export const useGetSingleEmployeeAnalyticsOverview = (staffCode)=>{

    return useQuery({ 
        queryKey:['getSingleEmployeeAnalyticsOverview'+staffCode],
        queryFn:()=>getSingleEmployeeAnalyticsOverview(staffCode),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
    
  
}

//To Get Single Staff Payroll History : 
export const useGetSingleEmployeePayrollHistory = (staffCode)=>{

    return useQuery({ 
        queryKey:['getSingleEmployeePayrollHistoryData'+staffCode],
        queryFn:()=>getSingleEmployeePayrollHistory(staffCode),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
 
  
}


// To Get Single Staff Payroll History Details
export const useGetSingleEmployeePayrollHistoryDetails = (staffCode, payrollCode)=>{

    return useQuery({ 
        queryKey:['getSingleEmployeePayrollHistoryData'+staffCode+" "+ payrollCode],
        queryFn:()=>getSingleEmployeePayrollHistoryDetails(staffCode,  payrollCode),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
 
  
}


//To Get Single Staff Wagepull History : 
export const useGetSingleEmployeeWagepullHistory = (staffCode)=>{

    return useQuery({ 
        queryKey:['getSingleEmployeeWagepullHistoryData'+staffCode],
        queryFn:()=>getSingleEmployeeWagepullHistory(staffCode),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}

//To Get Single Staff Wage Stream History : 
export const useGetSingleEmployeeWageStreamHistory = (staffCode)=>{

    return useQuery({ 
        queryKey:['getSingleEmployeeWageStreamHistoryData'+staffCode],
        queryFn:()=>getSingleEmployeeWageStreamHistory(staffCode),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}




export const useGetSingleEmployeeWageChartData = (staffCode)=>{

    return useQuery({ 
        queryKey:['getSingleEmployeeWageChartData'+staffCode],
        queryFn:()=>getSingleEmployeeWageChartData(staffCode),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}

// STAFF PAGE ENDPOINT QUERIES  //
// vickylove5223@gmail.com, gggtttthgd@ASD123







// PAYROLL PAGE ENDPOINT QUERIES //////////////////////////////////////////////////////////////////

//To fetch All Payroll : 
export const useAllOrgPayroll  = (monthAndYear)=>{

    return useQuery({ 
        queryKey:["fetchAllOrgPayroll"],
        queryFn:()=>getAllOrgPayroll(monthAndYear),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}

//To fetch Overview Payroll : 
export const usePayrollOverview  = ()=>{

    return useQuery({ 
        queryKey:["fetchPayrollOverview"],
        queryFn:()=>getPayrollOverview(),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}





// PAYROLL PAGE ENDPOINT QUERIES //






// WAGEPULL PAGE ENDPOINTS //////////////////////////////////////////////////////////////////

// To get all Organizations Wagepull Info

export const useGetOrgWagepullOverview  = ()=>{

    return useQuery({ 
        queryKey:["getOrgWagepullOverview"],
        queryFn:()=>getOrgWagepullOverview(),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}


// To get all Organizations Wagepull Info

export const useOrgWagePulled  = (monthAndYear)=>{

    return useQuery({ 
        queryKey:["getOrgWagePullInfo"],
        queryFn:()=>getOrgWagePulled(monthAndYear),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}


// To get Recent Organizations Wagepull Info
export const useGetRecentOrgWagePulled  = ()=>{

    return useQuery({ 
        queryKey:["getRecentOrgWagePulled"],
        queryFn:()=>getRecentOrgWagePulled(),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}



// WAGEPULL PAGE ENDPOINTS //






// FINANCE PAGE ENDPOINTS //////////////////////////////////////////////////////////////////

// To get all Wallet Funding Data
export const useGetWalletFunding  = ()=>{

    return useQuery({ 
        queryKey:["getFinanceWalletFunding"],
        queryFn:()=>getWalletFunding(),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}



// To get all the Payroll History 
export const useGetPayrollHistory  = ()=>{

    return useQuery({ 
        queryKey:["getFinancePayrollHistory"],
        queryFn:()=>getPayrollHistory(),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}



// To get all Repayment History

export const useGetRepaymentHistory  = ()=>{

    return useQuery({ 
        queryKey:["getFinanceRepaymentHistory"],
        queryFn:()=>getRepaymentHistory(),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}





// FINANCE PAGE ENDPOINTS //






















// SETTINGS PAGE ENDPOINTS //////////////////////////////////////////////////////////////////

// To get all Organizations Info

export const useOrgSettingsInfo = ()=>{

    return useQuery({ 
        queryKey:["fetchAllOrgStettings"],
        queryFn:()=>getOrgSettingsInfo(),
        // staleTime:1000 * 3,
        cacheTime:4000,
        // refetchInterval: 2000 
        
    })
   
  
}



// SETTINGS PAGE ENDPOINTS //