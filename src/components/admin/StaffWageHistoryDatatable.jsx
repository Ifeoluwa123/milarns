import React, { useState } from 'react'
import Tab from '../shared/TAb';
import StaffWagePullHistory from './StaffWagePullHistory';
import StaffWageStreamHistory from './StaffWageStreamHistory';



export default function StaffWageHistoryDatatable() {




  const tabButton = [
    {
      label:'Wage pulled history',
      activeIndex:0,
    },
    {
      label:'Wage stream history',
      activeIndex:1,
    },
    
 
  ]

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };



  return (
    <div>
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

          <div className="mt-[2rem] ">
            {
              activeTab === 0 && <StaffWagePullHistory />
            }
            {
              activeTab === 1 && <StaffWageStreamHistory />
            }
          </div>
    </div>
  )
}
