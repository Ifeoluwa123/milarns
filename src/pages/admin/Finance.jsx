import React, { useState } from 'react'
import AdminCustomLayout from '../../layouts/AdminCustomLayout'
import ComponentLeft from '../../components/admin/ComponentLeft'
import ComponentRight from '../../components/admin/ComponentRight'
import Tab from '../../components/shared/TAb';
import PinkPayroll from '../../components/shared/PinkPayroll';
import WhiteCard from '../../components/admin/WhiteCard';
import { TbCurrencyNaira } from 'react-icons/tb';
import FinanceWalletFunding from '../../components/admin/FinanceWalletFunding';
import FinancePayrollHistory from '../../components/admin/FinancePayrollHistory';
import FinanceRepaymentHistory from '../../components/admin/FinanceRepaymentHistory';
import { useGetOrgWagepullOverview } from '../../services/admin/queries';


export default function Finance() {

  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false)

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleOnclick  = ()=>{
    setIsOpen(true)
  }
  const tabButton = [
    {
      label:'Wallet funding',
      activeIndex:0,
    },
    {
      label:'Payroll history',
      activeIndex:1,
    },
    {
      label:'Repayment history',
      activeIndex:2,
    }

  ]

  let {data:payrollVerview, isLoading:isOverviewLoading} = useGetOrgWagepullOverview()



  



  return (
    <AdminCustomLayout>
        <ComponentLeft>
          {/* PINK CARD */}
          <PinkPayroll
              type="green"
              // amount="700,000"
              amount={payrollVerview?.current_wage_pulled? payrollVerview?.current_wage_pulled : 0}
              // btnText="Repay pulled wages"
              text="Total wages pulled this month"
              // notificationText="8% more than last month"
              // handleOnclick ={handleOnclick}
           />

           <div className="grid grid-cols-2 gap-[0.7rem] mt-[0.8rem]">
           <div className="p-[0.5rem] bg-[url('../assets/images/bg-vector.png')]  bg-white">
              <p className='font-[600] text-[0.7rem]'>Unpaid wages pulled</p>
              <h1 className='font-[600] mt-[1rem] text-[1rem] flex items-center'> <span className="text-[1.3rem]"><TbCurrencyNaira  /></span>{payrollVerview?.unpaid_overdue_wage_pulled? payrollVerview?.unpaid_overdue_wage_pulled : 0}.00</h1>
          </div>
           <WhiteCard label="Staff on advance" value={payrollVerview?.total_staff_on_advance ? payrollVerview?.total_staff_on_advance:0 } />
           </div>

        </ComponentLeft>

        <ComponentRight>

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
              activeTab === 0 && <FinanceWalletFunding />
              
            }
            {
              
              activeTab === 1 && <FinancePayrollHistory />
              
            }
            {
             
              activeTab === 2 && <FinanceRepaymentHistory />
            }
          </div>

        </ComponentRight>
    </AdminCustomLayout>
  )
}
 