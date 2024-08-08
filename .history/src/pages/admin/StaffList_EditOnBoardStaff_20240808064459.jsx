import React, { useEffect, useState } from 'react'
import AdminCustomLayout from "../../layouts/AdminCustomLayout";
import ComponentRight from "../../components/admin/ComponentRight";
import ComponentLeft from "../../components/admin/ComponentLeft";
import UserCard from '../../components/admin/UserCard';
import { Navigate, useParams } from 'react-router-dom';
import AllStaffs from '../../utilities/admin/AllStaffs';
import arrayToObject from '../../utilities/arrayToObject';
import { TbCurrencyNaira } from 'react-icons/tb';
import WalletImg from '../../assets/images/solar_wallet-money-linear.png'
import PinkAlert from '../../components/admin/PinkCard';
import Tab from '../../components/shared/TAb';
import StaffAccountProfilePage from '../../components/admin/StaffAccountProfilePage';
import StaffAccountSalaryPage from '../../components/admin/StaffAccountSalaryPage';
import StaffAccountCardPage from '../../components/admin/StaffAccountCardPage';

import { useQueryClient} from '@tanstack/react-query';
import StaffPayrollHistory from '../../components/admin/StaffPayrollHistory';
import StaffWageHistory from '../../components/admin/StaffWageHistory';
import { useGetSingleEmployeeAnalyticsOverview, useSingleEmployeeData } from '../../services/admin/queries';
import formatDate from '../../utilities/formatDate';

// import { DatePicker } from "@tremor/react";

export default function EditOnBoardStaff() {


  let {staffId} = useParams() 

  // console.log(staffId)
  
  const {data:response, isLoading, isError, error, isSuccess} = useSingleEmployeeData(staffId)
  const {data:res} = useGetSingleEmployeeAnalyticsOverview(staffId)
  
    const queryClient = useQueryClient();
    if(isError){
      return <h1>error.message</h1>
    }

    // console.log(res)

    // if(response){
    //    queryClient.invalidateQueries({ queryKey: ["employeesData"] });
    // }

    // useEffect(()=>{
    //   queryClient.invalidateQueries({ queryKey: ["getSingleDetailsEmployeeData"+staffId] });
  
    // },[response])

    // queryClient.invalidateQueries({ queryKey: ["getSingleDetailsEmployeeData"+staffId] });
  const tabButton = [
    {
      label:'Staff profile',
      activeIndex:0,
    },
    {
      label:'Salary account',
      activeIndex:1,
    },
    {
      label:'Debit Card',
      activeIndex:2,
    },
    {
      label:'Payroll history',
      activeIndex:3,
    },
    {
      label:'Wage history',
      activeIndex:4,
    },
 
  ]
 
  let [userRecord] = useState(arrayToObject(AllStaffs.filter(item=>item.id == staffId)))
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  

  return (

    <>
    
      {
        isLoading? (<h1>Loading...</h1>)
        :
<div className="">
        <AdminCustomLayout>
   
          {/* LEFT CONTENT */}
          <ComponentLeft>
            
                <UserCard
                    image={response?.avatar}
                    name={response?.first_name+" "+response?.last_name}
                    position={response?.position}
                    onboardDate={formatDate(response?.onboard_date)} 
                    status={response?.status}
                />
         
  
            {/* <div className="bg-[#FDEAEA] bg-[url('../assets/images/bg-vector.png')] h-fit mt-[1rem] rounded-[4px] px-[0.6rem] py-[1.5rem] flex flex-col justify-center items-center">
                <p className='text-center font-[560] text-[0.9rem]'>Wage pulled this month</p>
                <div className="flex items-center justify-center">
                    <div className="w-[2.5rem] rotate-[-33deg]">
                      <img src={WalletImg} className='w-full' alt="" />
                    </div>
                <h3 className='flex items-center text-[1.7rem] my-[0.5rem] font-[600] justify-center'><span className='text-[2.2rem]'><TbCurrencyNaira  /></span> {res?.monthly_summary.total?res?.monthly_summary.total : 0 }.00</h3>
                </div>
  
                <div className="text-[#21C45D] bg-[#DEFCE9] rounded-[4px] w-fit mx-auto px-[0.4rem]">
                      <p>8% more than last month</p>
                </div>
            </div> */}
  
            {/* <div className="grid grid-cols-2 mt-[1rem] gap-x-[0.5rem]">
                  
                      <PinkAlert 
                          label="Monthly salary of this staff"
                          value={res?.salary}
                      />
                 
                  <PinkAlert 
                          label="Net salary to receive this month"
                          value={res?.net_salary}
                      />
                 
            </div> */}
  
          </ComponentLeft>
  
  
  
          {/* RIGHT CONTENT */}
          <ComponentRight>
                <div className="">
                  {/* Tab button */}
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
                      activeTab === 0 &&
                       <StaffAccountProfilePage 
                       data={response}
                      //  image={userRecord.image}
                      //  name={userRecord.name} 
                      //  position={userRecord.position}
                      />
                    } 
                    {
                      activeTab === 1 && <StaffAccountSalaryPage  data={response} />
                    }
                    {
                      activeTab === 2 && <StaffAccountCardPage  data={response} />
                    }
                    {
                      activeTab === 3 && <StaffPayrollHistory  />
                    }
                    {
                      activeTab === 4 && <StaffWageHistory data={response} />
                    }
                    </div>
  
  
                </div>
  
  
  
  
          </ComponentRight>
  
        </AdminCustomLayout>
      </div>

      }
    </>
    
        
   
  )}

{/* <DatePicker className="h-full" /> */}