import { useState } from 'react'
import {createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Registration from './pages/auth/Registration';
import ResetPassword from './pages/auth/ResetPassword';
import SetNewPassword from './pages/auth/SetNewPassword';
import AdminDashboard from './pages/admin/Dashboard';
import Error404 from './pages/Error404';
import StaffList from './pages/admin/StaffList';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import AdminLayout from './layouts/AdminLayout';
import SuperAdminLayout from './layouts/SuperAdminLayout';
import AddBulkOnboardStaff from './pages/admin/StaffList_AddBulkOnboardStaff';
import AddManualOnboardStaff from './pages/admin/StaffList_AddManualOnboardStaff';
import TokenVerification from './pages/auth/TokenVerification';
import EditOnBoardStaff from './pages/admin/StaffList_EditOnBoardStaff';
import PayRoll from './pages/admin/PayRoll';
import WagesPulled from './pages/admin/WagesPulled';
import Finance from './pages/admin/Finance';
import Settings from './pages/admin/Settings';
import {loginAuthAction, registerAuthAction, setNewPasswordAction} from './services/Auth'
import { useAuth } from './context/AuthContext';
import FormOneOnboard from './pages/admin/FormOneOnboard';
import FormTwoOnboard from './pages/admin/FormTwoOnboard';
import OnboardingLayout from './layouts/OnboardingLayout';
import FormThreeOnboarding from './pages/admin/FormThreeOnboarding';
import { formOneAction, formThreeAction, formTwoAction } from './services/multistepForm';
import SuperAdminLogin from './pages/auth/SuperAdminLogin';
import AllOrganization from './pages/superadmin/AllOrganization';
import SuperAdminPayRoll from './pages/superadmin/SuperAdminPayRoll';
import AllOrganizationCards from './pages/superadmin/AllOrganizationCards';
import SuperAdminFinance from './pages/superadmin/SuperAdminFinance';
import AllActivityLog from './pages/superadmin/AllActivityLog';
import AllNotificationLog from './pages/superadmin/AllNotificationLog';
import AddNewOrganization from './pages/superadmin/AddNewOrganization';
import { superadminLoginAuthAction } from './services/superadmin/auth';
import fetchAllOrganizationData from './services/fetchAllOrgData';
import PayrollSalary from './pages/admin/PayrollSalary';
import PayrollBonus from './pages/admin/PayrollBonus';
import PayrollDeduction from './pages/admin/PayrollDeduction';
import OrganizationDetails from './pages/superadmin/OrganizationDetails';
import AdminStaffDetails from './components/superadmin/adminTabContent/AdminStaffDetails';
import AdminStaffDebitCard from './pages/superadmin/AdminStaffDebitCard';
import AdminStaffPayroll from './pages/superadmin/AdminStaffPayroll';
import AdminStaffAccount from './pages/superadmin/AdminStaffAccount';
import FormRegSuccessful from './pages/admin/FormRegSuccessful';
import dashboardPage from './services/dashboardPage';
import staffListPage from './services/staffListPage';
// import { useAuth } from "../context/AuthContext"


function App() {

        const appContext = useAuth()
    //    sessionStorage.clear()
    

    let routes = createBrowserRouter([
                {
                    path:'/',
                    errorElement:<Error404 />,
                    action:loginAuthAction(appContext),
                    element:<Login />
                },
                {
                    path:'/my-superadmin',
                    action:superadminLoginAuthAction(appContext),
                    errorElement:<Error404 />,
                    element:<SuperAdminLogin />
                },
                {
                    path:'/register',
                    errorElement:<Error404 />,
                    action:registerAuthAction(appContext),
                    element:<Registration />
                },
                {
                    path:'/reset-password',
                    element:<ResetPassword />
                },
                {
                    path:'/verify-otp',
                    element:<TokenVerification />
                },
                {
                    path:'/set-password',
                    action:setNewPasswordAction,
                    element:<SetNewPassword />
                },
                // ADMIN ROUTE 
                {
                    path:'/',
                    element:<AdminLayout />,
                    loader:()=>appContext.organisationData,
                    errorElement:<Error404 />,
                    children:[
                        {
                            index:true,
                            path:'/admin/*',
                            loader:dashboardPage,
                            element:<AdminDashboard />
                        },
                        {
                            path:'staff-list',
                            loader:staffListPage,
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
                        {
                            path:'/', 
                            element:<OnboardingLayout />,
                            errorElement:<Error404 />,
                            children:[
                                {
                                    path:'/settings',
                                    loader:fetchAllOrganizationData,
                                    action:formOneAction,
                                    index:true,    
                                    element:<FormOneOnboard  />
                                },
                            
                                {
                                    path:'/settings/2',
                                    loader:fetchAllOrganizationData,
                                    action:formTwoAction,
                                    element:<FormTwoOnboard  />
                                },
                                {
                                    path:'/settings/3',
                                    loader:fetchAllOrganizationData,
                                    action:formThreeAction,
                                    element:<FormThreeOnboarding />
                                },
                                {
                                    path:'/settings/success',
                                    element:<FormRegSuccessful />
                                },
                            ]
                        }
                        
                        
                    ]
                },
                // SUPERADMIN ROUTE
                {
                    path:'/',
                    element:<SuperAdminLayout />,
                    children:[
                        {
                            index:true,
                            path:'/overview/*',
                            // loader:()=>"Ife",
                            element:<SuperAdminDashboard />
                        },
                        {
                            path:'organizations',
                            element:<AllOrganization />
                        },
                        {
                            path:'organizations/add-new-organization',
                            element:<AddNewOrganization />
                        },
                        {
                            path:'organizations/:id',
                            element:<OrganizationDetails />
                        },
                        {
                            path:'organizations/:id/:staffid',
                            element:<AdminStaffDetails />
                        },
                        {
                            path:'superadmin-payroll',
                            element:<SuperAdminPayRoll />
                        },
                        {
                            path:'superadmin-payroll/:orgcode',
                            element:<AdminStaffPayroll />
                        },
                        {
                            path:'superadmin-payroll/:orgcode/:staffid',
                            element:<AdminStaffAccount />
                        },
                        {
                            path:'superadmin-card',
                            element:<AllOrganizationCards />
                        },
                        {
                            path:'superadmin-card/:orgcode',
                            element:<AdminStaffDebitCard />
                        },
                        {
                            path:'superadmin-finance',
                            element:<SuperAdminFinance />
                        },
                        {
                            path:'superadmin-activity-log',
                            element:<AllActivityLog />
                        },
                        {
                            path:'superadmin-notification',
                            element:<AllNotificationLog />
                        },
                    ]
                }, 
                // {
                //     path:'*',
                //     element:<Error404 />
                // }
    ])
    // ], {basename:'/'})

    return <RouterProvider  router={routes} />

}

export default App
    // const routes = useRoutes([
    //     {
    //         path:'/',
    //         element:<Login />
    //     },
    //     {
    //         path:'/register',
    //         element:<Registration />
    //     },
    //     {
    //         path:'/reset-password',
    //         element:<ResetPassword />
    //     },
    //     {
    //         path:'/verify-otp',
    //         element:<TokenVerification />
    //     },
    //     // ADMIN ROUTE 
    //     {
    //         path:'/',
    //         element:<AdminLayout />,
    //         errorElement:<Error404 />,
    //         children:[
    //             {
    //                 index:true,
    //                 path:'/admin/*',
    //                 element:<AdminDashboard />
    //             },
    //             {
    //                 path:'staff-list',
    //                 element:<StaffList />
                   
    //             },
    //             {   
                           
    //                 path:'staff-list/add-single-staff',
    //                 element:<AddManualOnboardStaff />
    //             },
    //             {
    //                 path:'staff-list/add-bulk-staff',
    //                 element:<AddBulkOnboardStaff />
    //             },
    //             {
    //                 path:'staff-list/:staffId',
    //                 element:<EditOnBoardStaff />
    //             },
                
                
    //         ]
    //     },
    //     // SUPERADMIN ROUTE
    //     {
    //         path:'/',
    //         element:<SuperAdminLayout />,
    //         children:[
    //             {
    //                 index:true,
    //                 path:'/superadmin/*',
    //                 element:<SuperAdminDashboard />
    //             },
    //             {
    //                 path:'staff-list',
    //                 element:<StaffList />
    //             },
    //         ]
    //     }, 
    //     {
    //         path:'*',
    //         element:<Error404 />
    //     }
    // ])
 
    // return routes

// return 
//   return (
//        <Routes>
//             <Route path='/' element={<Login />} />
//             <Route path='/register' element={<Registration />} />
//             <Route path='/reset-password' element={<ResetPassword />} />
//             <Route path='/token-verification' element={<ResetPassword />} />
//             <Route path='/new-password' element={<SetNewPassword />} />

//             <Route path='/admin/*'  element={<PrivateRoute/>} >
//                     <Route index path='/admin/*'  element={<AdminDashboard />} />
//                     <Route path="users" element={<Login />} />
//             </Route>
//             <Route path='/*' element={<Error404  />} />


//        </Routes>
//   )

