import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Error404 from './pages/Error404'
import AdminLogin from './pages/auth/AdminLogin'
import AdminLayout from './layouts/AdminLayout' 
import PendingRegistrationLayout from './layouts/PendingRegistrationLayout'
import AdminRegistration from './pages/auth/AdminRegistration'
import AdminResetPassword from './pages/auth/AdminResetPassword'
import AdminVerification from './pages/auth/AdminVerification'
import AdminSetNewPassword from './pages/auth/AdminSetNewPassword'
import FormOneOnboard from './pages/admin/FormOneOnboard'
import FormTwoOnboard from './pages/admin/FormTwoOnboard'
import FormThreeOnboard from './pages/admin/FormThreeOnboard'
import FormRegSuccessful from './pages/admin/FormRegSuccessful'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddManualOnboardStaff from './pages/admin/StaffList_AddManualOnboardStaff'
import AddBulkOnboardStaff from './pages/admin/StaffList_AddBulkOnboardStaff'
import EditOnBoardStaff from './pages/admin/StaffList_EditOnBoardStaff'
import PayRoll from './pages/admin/PayRoll';
import PayrollSalary from './pages/admin/PayrollSalary';
import PayrollBonus from './pages/admin/PayrollBonus';
import PayrollDeduction from './pages/admin/PayrollDeduction';
import WagesPulled from './pages/admin/WagesPulled';
import Finance from './pages/admin/Finance';
import Settings from './pages/admin/Settings';
import StaffList from './pages/admin/StaffList'
 


import AdminRegistrationOTPVerification from './pages/auth/AdminRegistrationOTPVerification'









export default function App() {



    let routes = createBrowserRouter([
        {
            path:'/',
            errorElement:<Error404 />,
            element:<AdminLogin />
        },
      
        {
            path:'/register',
            errorElement:<Error404 />,
            element:<AdminRegistration />
        },
        {
            path:'/reset-password',
            errorElement:<Error404 />,
            element:<AdminResetPassword />
        },
        {
            path:'/verify-otp',
            element:<AdminVerification />
        },
        {
            path:'/verify-otp-reg',
            element:<AdminRegistrationOTPVerification />
        },
        {
            path:'/set-password',
            element:<AdminSetNewPassword />
        },
         // ADMIN ROUTE 
         {
            path:'/',
            element:<AdminLayout />, // Condtionally render the admin based on isAuthenticated && isUserRole -> AdminLayout or Admin Login
            errorElement:<Error404 />, 
            children:[
                {
                    index:true,
                    path:'/admin/*',
                    element:<AdminDashboard  />
                },
                {
                    path:'staff-list',
                    element:<StaffList />
                   
                },
                {   
                           
                    path:'staff-list/add-single-staff',
                    element:<AddManualOnboardStaff />
                }, 
                 {
                    path:'staff-list/add-bulk-staff',
                    element:<AddBulkOnboardStaff />
                },
                {
                    path:'staff-list/:staffId',
                    element:<EditOnBoardStaff />
                },
                {
                    path:'payroll',
                    element:<PayRoll />
                },
                {
                    path:'payroll/pay-salary',
                    element:<PayrollSalary />
                },
                {
                    path:'payroll/add-bonus',
                    element:<PayrollBonus />
                },
                {
                    path:'payroll/add-deduction',
                    element:<PayrollDeduction />
                },
                {
                    path:'wages',
                    element:<WagesPulled />
                },
                {
                    path:'finance',
                    element:<Finance />
                },
                {
                    path:'settings',
                    element:<Settings />,
                
                },

            ]
         },



          //  PENGING REGISTRATION
          {
            path:'/', 
            // index:false,
            element:<PendingRegistrationLayout />,
            errorElement:<Error404 />,
            children:[
                {
                    path:'/onboarding',  
                    element:<FormOneOnboard />
                },
                {
                    path:'/organizationInformation',  
                    element:<FormTwoOnboard />
                },
                {
                    path:'/salaryAccount',  
                    element:<FormThreeOnboard />
                },
                {
                    path:'/success',
                    element:<FormRegSuccessful />
                },
            ]

            },


              // SUPERADMIN ROUTE
             


            

// ])
], {basename:"/milarn"})













    return <RouterProvider   router={routes} />
}
