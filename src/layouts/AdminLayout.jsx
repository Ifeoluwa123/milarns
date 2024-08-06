import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import AdminProviderLayout from './AdminProviderLayout'


export default function AdminLayout() {


  // const adminInfo = localStorage.getItem('adminInfo')
  // const tokenKey = localStorage.getItem('adminToken')

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))

  if(adminInfo){
    try{
     

      if((adminInfo.organization.length === 0 || adminInfo.token.access === null) ){
        return <Navigate to="/" />
      }
      if(adminInfo.token.access !== null && adminInfo.organization.account_status === "pending"  ){
        return <Navigate to="/onboarding" />
     
    }
    }catch(e){

    }

  }else{
    return <Navigate to="/" />
  }



  return<AdminProviderLayout>
      <Outlet />
  </AdminProviderLayout>
}
