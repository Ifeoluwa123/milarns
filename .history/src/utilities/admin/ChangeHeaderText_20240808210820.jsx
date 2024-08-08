import React from 'react'
import { useAuth } from '../../context/AuthContext'

function ChangeHeaderText(useEffect, useLocation, setUrlPath) {
    let {pathname}= useLocation()
    let {isStatusComplete} = useAuth()
    window.scrollTo({
        top:0
    })
    useEffect(()=>{
       
        pathname.includes('admin') && (setUrlPath('Dashboard'), document.title="Admin Dashboard | Wagepull")
        pathname.includes('staff') && (setUrlPath('Staff List'), document.title="Admin Staff List | Wagepull")
        pathname.includes('staff-list/') && (setUrlPath('Staff Account'), document.title="Admin Staff Account | Wagepull")
        pathname.includes('payroll') && (setUrlPath('Payroll Board'), document.title="Admin Payroll Board | Wagepull")
        pathname.includes('wages') && (setUrlPath('Wages Pulled'), document.title="Admin Wages Pulled | Wagepull")
        pathname.includes('finance') && (setUrlPath('Finance Board'), document.title="Admin Finance Board | Wagepull")
        pathname.includes('setting') && (setUrlPath('Account Settings'), document.title="Admin Account Settings | Wagepull")
        pathname.includes('setting') && !isStatusComplete && (setUrlPath('Onboarding'), document.title="Admin Account Settings | Wagepull")
        pathname.includes('add-single-staff') && (setUrlPath('Add new staff'), document.title="Admin Add New Staff | Wagepull")
        pathname.includes('add-bulk-staff') && (setUrlPath('Add new staff'), document.title="Admin Add New Staff | Wagepull")


        // SUPERADMIN ROUTES
        // pathname.includes('overview') && (setUrlPath('Dashboard'), document.title="Superadmin Overview | Wagepull")
        // pathname.includes('organizations') && (setUrlPath('Organization'), document.title="Superadmin Organization | Wagepull")
        // pathname.length >= 18 && (setUrlPath('Staff Details'), document.title="Superadmin for Staff Details | Wagepull") 
        // pathname.includes('superadmin-payroll') && (setUrlPath('Payroll'), document.title="Superadmin Payroll | Wagepull")
        // pathname.includes('superadmin-payroll/') && (setUrlPath('Payroll Details'), document.title="Superadmin Payroll Details | Wagepull")
        // pathname.includes('superadmin-card') && (setUrlPath('Cards'), document.title="Superadmin Card | Wagepull")
        // pathname.includes('superadmin-card/') && (setUrlPath('Staff Card Details'), document.title="Superadmin for Staff Card Details | Wagepull")
        // pathname.includes('superadmin-finance') && (setUrlPath('Finance'), document.title="Superadmin Finance | Wagepull")
        // pathname.includes('superadmin-activity-log') && (setUrlPath('Activity Log'), document.title="Superadmin Activity Log | Wagepull")
        // pathname.includes('superadmin-notification') && (setUrlPath('Notification'), document.title="Superadmin Notification | Wagepull")
        // pathname.includes('organizations/add-new-organization') && (setUrlPath('Add New Organization'), document.title="Superadmin Add New Organization | Wagepull")
    //    console.log(pathname.length, pathname.length >= 18)
    },[pathname])
}

export default ChangeHeaderText