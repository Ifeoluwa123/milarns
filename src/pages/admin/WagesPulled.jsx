import React, { useEffect, useState } from 'react'
import ComponentLeft from '../../components/admin/ComponentLeft'
import ComponentRight from '../../components/admin/ComponentRight'
import AdminCustomLayout from '../../layouts/AdminCustomLayout'
import PinkPayroll from '../../components/shared/PinkPayroll'
import WhiteCard from '../../components/admin/WhiteCard'
import { TbCurrencyNaira } from 'react-icons/tb'
import Modals from '../../components/shared/Modals'
import { RiErrorWarningLine } from 'react-icons/ri'
import InnerButton from '../../components/shared/InnerButton'
import WagedPulledDataTable from '../../components/admin/WagedPulledDataTable'
import { payrolldata } from '../../utilities/admin/Data'
import { useGetOrgWagepullOverview , useOrgWagePulled } from '../../services/admin/queries'
import NoRecordFound from '../../components/shared/NoRecordFound'
import { useComputeStaffWagePulled } from '../../services/admin/mutation'
import getCurrentMonthAndYear from '../../utilities/getCurrentMonthAndYear'
import { Datepicker } from 'flowbite-react'
import { useQueryClient } from '@tanstack/react-query'

export default function WagesPulled() {
  const [isOpen, setIsOpen] = useState(false)

  let [isModalOpen, setIsModalOpen] = useState(false)
  let [data, setData] = useState(payrolldata)
 
  let addNewstaffHandler= ()=>{ 
    setIsModalOpen(true)
  }

  let queryClient = useQueryClient()




  let {data:payrollVerview, isLoading:isOverviewLoading} = useGetOrgWagepullOverview()










  
  let [monthAndYear, setMonthAndYear] = useState(getCurrentMonthAndYear())


  const handleDateChange = (date)=>{

    const selectedDate = new Date(date);
    const month = selectedDate.getMonth() + 1; // Adding 1 to get month in number format (1-12)
    const year = selectedDate.getFullYear();
  
    setMonthAndYear({month:month, year:year})
    // console.log("Selected month (number format): ", month);
    // console.log("Selected year: ", year);
   
  }


  let {mutate:computeMutation, isPending:isComputationLoading} = useComputeStaffWagePulled()

  const handleOnclick  = ()=>{
    // let monthAndYear = getCurrentMonthAndYear()
    setIsOpen(true)

    // monthAndYear.codes = [userId]
    console.log(monthAndYear)

    computeMutation(monthAndYear,{
        onSuccess:(success)=>{
            // console.log(success)
        },
        onError:(error)=>{
          // console.log(error)
        }
    })
  }






  let {data:wagePullData, isLoading, isError, error, refetch} = useOrgWagePulled(monthAndYear)

  // console.log(wagePullData)

  useEffect(()=>{
    // let res = ()=>queryClient.invalidateQueries({ queryKey: ["getOrgWagePullInfo"] });
    let res = ()=>refetch()
      res()

      clearInterval(res )
  },[monthAndYear])

  if(isLoading){
      return <h1>Loading...</h1>
  }
   
  if(isError){
  
      return <h1>{error.message}</h1>
  }
  return (

                          <>
                          {/* MODAL START */} 
                          <Modals setIsopens={setIsOpen} isOpens={isOpen} title="Repay Wage">


                      {
                        isComputationLoading? "Loading...":
                        <>


                      <div className="p-[1rem] border-[1px] rounded-[4px] my-[2rem] overflow-hidden">
                        <NoRecordFound
                      title="You don't have enough money to perform this transaction"
                      label="Fund your account"
                      // component={<InnerButton text="Add new staff"  icon={<IoAdd />} onClick={addNewstaffHandler} />}
                      // component={<InnerButton text="Add new staff"  icon={<IoAdd />} onClick={addNewstaffHandler} />}

                      />

                      </div>
                          {/* <div className=" bg-[var(--primary-color)] text-white rounded-[4px] flex flex-col items-center py-[1rem]">
                            <h2 className='font-[700]  flex items-center justify-center text-[1.8rem]'><span className="text-[2.2rem]"><TbCurrencyNaira /></span>700,000.00</h2>
                            <p className="text-[0.88rem]">Wages pulled from 01 Sep to 18 Sep</p>
                      </div>

                      <div className="py-[1rem] px-[1rem] bg-[#F5F5F5] text-black rounded-[4px] ">
                          <p className='flex items-start justify-between gap-x-[0.7rem]'>
                            <span className="text-[var(--secondary-color)] block text-[1.2rem] justify-between"><RiErrorWarningLine /></span>
                            <span className=' block text-[0.85rem]'>
                            Note! Total wage pulled include salaries taken in-advance by 24 staffs from 01 Sep to 18 Sep, 2023.
                            </span>
                          </p>

                          <h5 className='mt-[1.6rem]'>
                            <p className='flex text-[0.85rem] mb-[1rem]'><span className="max-w-[180px] block w-full text-[#6B7280]">Total wages pulled:</span> <span className="flex items-center font-[600]"><TbCurrencyNaira /> 700,000</span> <span className="font-[600]">.00</span></p>

                          </h5>
                      </div>

                      <div className="py-[1rem] px-[1rem] bg-[#FDEAEA] text-black rounded-[4px]">
                        <p className='font-[600] text-[0.85rem]'>Not enough fund in your wallet</p>
                        <p className=" text-[0.85rem] mt-[0.6rem]">
                        Topup current balance of <span className='font-[600]'>₦40,000.00</span>   in your wallet before you make payment. &nbsp;
                        <a href="#"  className="text-[var(--secondary-color)] underline">Topup wallet fund</a> 
                        </p>
                      </div>


                      <div className="">
                        <InnerButton text="Make payment now" width="flex justify-center w-full" />
                      </div> */}
                        </>

                      }




</Modals>


    <AdminCustomLayout>
        <ComponentLeft>
          {/* PINK CARD */}
          <PinkPayroll
              // type={payrollVerview?.overview.message && (payrollVerview?.overview.message.status === "success"? "green": "pink")}
              // amount="0"
              amount={payrollVerview?.current_wage_pulled ? payrollVerview?.current_wage_pulled:0}
              btnText="Repay pulled wages"
              text="Total wages pulled this month"
              // notificationText={payrollVerview?.overview.message? payrollVerview?.overview.message.message : ''}
              notificationText="0% more than last month"
              type="green"
              handleOnclick ={handleOnclick}
          
           />

           <div className="grid grid-cols-2 gap-[0.7rem] mt-[0.8rem]">
           <div className="p-[0.5rem] bg-[url('../assets/images/bg-vector.png')]  bg-white">
              <p className='font-[600] text-[0.7rem]'>Unpaid wages pulled</p>
              <h1 className='font-[600] mt-[1rem] text-[1rem] flex items-center'> <span className="text-[1.3rem]"><TbCurrencyNaira  /></span>{payrollVerview?.unpaid_overdue_wage_pulled? payrollVerview?.unpaid_overdue_wage_pulled : 0}.00</h1>
          </div>
           <WhiteCard label="Staff on advance" value={payrollVerview?.total_staff_on_advance?payrollVerview?.total_staff_on_advance:0 } />
           </div>


        </ComponentLeft>

        <ComponentRight>
        {/* <Datepicker onSelectedDateChanged={handleDateChange}    /> */}


        <>

        

        {
            wagePullData.results.length > 0? 
            <WagedPulledDataTable 
            data={wagePullData.results} 
            itemsPerPage={6}
            setMonthAndYear={setMonthAndYear}
            addNewstaffHandler={addNewstaffHandler}
            handleDateChange={handleDateChange}
            monthAndYear={monthAndYear}
      
    
          />
          :

          <>
           <Datepicker onSelectedDateChanged={handleDateChange}  defaultValue={monthAndYear}  className='w-[50%] md:w-[30%]'  />
          <div className="p-[1rem] border-[1px] rounded-[4px] my-[2rem] overflow-hidden">
           
                    <NoRecordFound
                  title="No recent wages pulled yet"
                  label="Oblige your employees to download WagePull app to access their salary in-advance"
                
                />

                  </div>
        </>
          }
        
        
        </>
   
        
        
        </ComponentRight>
    </AdminCustomLayout>
    
    
    </>
    
  )
}
