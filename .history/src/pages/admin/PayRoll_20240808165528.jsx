import React, { useEffect, useState } from 'react'
import AdminCustomLayout from '../../layouts/AdminCustomLayout'
import ComponentLeft from '../../components/admin/ComponentLeft'
import { Component } from 'react'
import ComponentRight from '../../components/admin/ComponentRight'
import PinkPayroll from '../../components/shared/PinkPayroll'
import WhiteCard from '../../components/admin/WhiteCard'
import { TbCurrencyNaira } from 'react-icons/tb'
import NoRecordFound from '../../components/shared/NoRecordFound'
import InnerButton from '../../components/shared/InnerButton'
import { IoAdd } from "react-icons/io5";
import Modals from '../../components/shared/Modals'
import AddPayrollModalBody from '../../components/admin/AddPayrollModalBody'
import PayRollDataTable from '../../components/admin/PayrollDataTable'
import { payrolldata } from '../../utilities/admin/Data'
import { usePayrollOverview } from '../../services/admin/queries'
import getCurrentMonthAndYear from '../../utilities/getCurrentMonthAndYear'
import { useGeneratePayroll } from '../../services/admin/mutation'
import OutlineButton from '../../components/shared/OutlineButton'
import AlertMessages from '../../components/shared/AlertMessages'
import { Datepicker } from 'flowbite-react'


 export default function PayRoll() {



 

  let [isModalOpen, setIsModalOpen] = useState(false)


  let addNewstaffHandler= ()=>{
    setIsModalOpen(true)
  }

  // let [data, setData] = useState(payroll)



  let {data:payrollVerview, isLoading:isOverviewLoading} = usePayrollOverview()

 
  

  let monthAndYear = getCurrentMonthAndYear()

  const [monthYear, setMonthYear] = useState({
    month: monthAndYear.month,
    year: monthAndYear.year
  })

  console.log(monthAndYear)
  const handleDateChange = (date)=>{

    const selectedDate = new Date(date);
    const month = selectedDate.getMonth() + 1; // Adding 1 to get month in number format (1-12)
    const year = selectedDate.getFullYear();
      setMonthYear(prev=>({
      ...prev,
      month : month,
      year : year
    }))
   

    // console.log("Selected month (number format): ", month);
    // console.log("Selected year: ", year);
  }
  // console.log(monthYear)

// if(Object.values.length > 0) {





  // console.log(payroll)
// }

let {error:errorMsg, data:res,mutate, isSuccess } = useGeneratePayroll()




  const handleGenratePayroll = ()=>{
    mutate(monthYear,{
      onSuccess:(res)=>{
        // console.log(res)
        return AlertMessages("Payroll Generated Successfully",res.message, "success")
      },
      onError:(err)=>{
      
        return AlertMessages("Error",err.response.data.message, "error")
      }
    })
  }







  if(isOverviewLoading) {
    return <h1>Loading...</h1>
  }

 



  return (
    <AdminCustomLayout>
       <Modals  isOpens={isModalOpen} setIsopens={setIsModalOpen} title="Payroll action">
                  <AddPayrollModalBody setIsModalOpen={setIsModalOpen} />
          </Modals>
        <ComponentLeft>
            <PinkPayroll
            type={payrollVerview.overview.message && (payrollVerview.overview.message.status === "success"? "green": "pink")}
            text={<>Upcoming salary payment  </>}
            // btnText="Pay Salaries Now"
            // amount="1,200,000"
            amount={payrollVerview?.overview.upcoming_salary}
            notificationText={payrollVerview.overview.message? payrollVerview.overview.message.message : ''}
            // notificationText="14% less than last month"
            // notificationText={payrollVerview.overview.message.message ?  payrollVerview.overview.message.message : null}
            // type="pink" 
            path="pay-salary"
            />

            <div className=" border-[E5E7EB] border-[1px] bg-white h-fit mt-[1rem] rounded-[4px] px-[0.85rem] py-[1rem] ">
                <p className='text-[0.85rem]'>Wallet balance</p>
                <h3 className='flex items-center text-[1.4rem] my-[1.3rem] font-[600] '><span className='text-[2.2rem]'><TbCurrencyNaira  /></span>{payrollVerview.wallet.amount> 0? payrollVerview.wallet.amount : 0}.00</h3>
               
               {
                payrollVerview?.amount_left  > 0 &&   <p className='text-[0.85rem]'>
                Top up <span className="font-[600] ">₦{payrollVerview.wallet.amount_left>0? payrollVerview.wallet.amount_left: 0}.00</span>  to pay salary and wages pulled this month.
                </p> 
               }
               
              
            </div>

              <div className="grid grid-cols-2 gap-[0.7rem] mt-[0.8rem]">
              <WhiteCard label="Total staff onboard" value={payrollVerview.staff_summary.staff_count>0? payrollVerview.staff_summary.staff_count: 0} />
              <div className="p-[0.5rem] bg-[url('../assets/images/bg-vector.png')]  bg-white">
          <p className='font-[600] text-[0.7rem]'>Total staff salary</p>
          <h1 className='font-[600] mt-[1rem] text-[1rem] flex items-center'> <span className="text-[1.3rem]"><TbCurrencyNaira  /></span> {payrollVerview.staff_summary.total_staff_salary>0?payrollVerview.staff_summary.total_staff_salary:0}.00</h1>
    </div>
           
           

              </div>
        </ComponentLeft>
        <ComponentRight>

        {/* <div className="p-[1rem] border-[1px] mt-[1rem] rounded-[4px] my-[2rem] overflow-hidden">
        <NoRecordFound 
                title="No payroll process yet"
                label="Click on the below button to onboard staff on payroll list."
                
              component={<InnerButton text="Add payroll" icon={<IoAdd />} onClick={()=>setIsModalOpen(true)} />} />

        </div> */}

       
        {
          // data?  
          // data.results.length >0? 
          payrollVerview.staff_summary.staff_count >0? 
          <PayRollDataTable
   
          
      
          addNewstaffHandler={addNewstaffHandler}
          handleDateChange={handleDateChange}
          monthYear={monthYear}
         
          
          />
          : 

          <>

           <div className="flex justify-between items-center">
        <Datepicker onSelectedDateChanged={handleDateChange}  defaultValue={monthAndYear}  className='w-[50%] md:w-[20%]'  />
            <OutlineButton type="button" onClick={handleGenratePayroll} text="Generate payroll" style="text-[0.85rem]" />
            </div>
          

        <div className="p-[1rem] border-[1px] mt-[1rem] rounded-[4px] my-[2rem] overflow-hidden">
            
            <NoRecordFound 
                    title="No payroll process yet"
                    label="Click on the 'Generate payroll' button to onboard staff on payroll list."
                    
                  // component={<InnerButton text="Add payroll" icon={<IoAdd />} onClick={()=>setIsModalOpen(true)} />} 
                  />
    
            </div>
          </>
         

        }

       
              
        </ComponentRight>
    </AdminCustomLayout>
  )
} 
