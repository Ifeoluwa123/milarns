import React, { useState } from 'react'
import ComponentLeft from '../../components/admin/ComponentLeft'
import ComponentRight from '../../components/admin/ComponentRight'
import AdminCustomLayout from '../../layouts/AdminCustomLayout'
import OrgnanizationAdminCard from '../../components/admin/OrgnanizationAdminCard'
import orgLogo from '../../assets/images/orgranization_logo.png'
import arrayToObject from '../../utilities/arrayToObject'
import Tab from '../../components/shared/Tab'
import OrganisationProfile from '../../components/admin/OrganisationProfile'
import AdminSalaryAccount from '../../components/admin/AdminSalaryAccount'
import AdminProfile from '../../components/admin/AdminProfile'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useOrgSettingsInfo } from '../../services/admin/queries'
import defaultLogo from '../../assets/images/user.png'



export default function Settings() {

  // const isApproved = JSON.parse(sessionStorage.getItem('userdata'))?.organization.account_status === 'pending'
    
  // if(isApproved ){
  //     return (
  //       <Navigate to="../onboarding_1" />
     
  //     ) 
  //   }else{
  //     return (
  //       <CompletedStatus />
  //     )
  //   }
  return (
          <CompletedStatus />
        )
}



export function CompletedStatus(){
  const tabButton = [
    {
      label:'Organisation profile',
      activeIndex:0,
    },
    // {
    //   label:'Salary account',
    //   activeIndex:1,
    // },
    {
      label:'Administrator profile',
      activeIndex:2,
    }

  ]

  // let [userRecord] = useState(arrayToObject(AllStaffs.filter(item=>item.id == staffId)))
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  


let {data,isLoading,error,isError} = useOrgSettingsInfo()



if(isLoading){
  return <h1>Loading...</h1>
}

if(isError){
  return <h1>{error.message}</h1>
}


  return(
    <AdminCustomLayout>
    {/* LEFT CONTENT */}
        <ComponentLeft>
            <OrgnanizationAdminCard
              logo={data.logo?data.logo: defaultLogo}
              orgName={data.name}
              industry={data.industry.name}
              // onboardDate="14 Sept, 2023"
              status={true}
              bankName={data?.bankinformation.virtual_bank_name? data.bankinformation.virtual_bank_name: "Nil"}
              accNumber={data?.bankinformation.virtual_account_number ? data?.bankinformation.virtual_account_number : 'Nil'}
              accName={data?.bankinformation.virtual_account_name ? data?.bankinformation.virtual_account_name: 'Nil'}


          />
        </ComponentLeft>


      {/* RIGHT CONTENT */}
        <ComponentRight>

          
            {/* Tab Links */}
            <div className=" flex gap-x-[3rem] border-b-[0.5px]  overflow-x-auto no-scrollbar">
                {
                  tabButton.map(({label, activeIndex})=><Tab 
                  key={label}
                  label={label}
                  activeStyle = {` ${activeIndex == activeTab && 'text-[--secondary-color] border-b-[1px] border-[--secondary-color]'}`}
                  handleClick = {()=>handleTabClick(activeIndex)}
                  
                />)
                }
                  
              </div> 
          

          {/* Page Content */}
 
          <div className="mt-[2rem]">
            {
              activeTab === 0 && <OrganisationProfile data={data} />
             
            }
            {/* {
              
              activeTab === 1 && <AdminSalaryAccount data={data.bankinformation} />
              
            } */}
            {
             
              activeTab === 2 && <AdminProfile   />
            }
          </div>

        </ComponentRight> 
  </AdminCustomLayout>
  )
}