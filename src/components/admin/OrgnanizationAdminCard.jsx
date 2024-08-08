import React from 'react'
import { GoDotFill } from 'react-icons/go'
import { IoCopyOutline } from "react-icons/io5";


export default function OrgnanizationAdminCard({logo,status, orgName, industry, onboardDate, bankName, accNumber, accName }) {
  return (
    <div className="h-fit bg-white px-[0.6rem] py-[1rem] rounded-[4px] border-[1px] overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="w-[30%] h-[30%] overflow-hidden">
          <img src={logo} className="w-full" alt="" />
        </div>
        <div className=" bg-gray-100 px-[0.6rem] border-[1px] py-[0.4rem] rounded-[5px] text-[0.85rem]">
          <span
            className={`flex items-center    ${
              status ? "text-green-800" : "text-red-800"
            }`}
          >
            <GoDotFill />{" "}
            <span className="text-black">
              {status ? "Active account" : "Inactive account"}
            </span>{" "}
          </span>
          {/* <Dot */}
        </div>
      </div>

      <div className="mt-[1rem]">
        <h2 className="font-[600] text-[1.2rem]">{orgName}</h2>
        <p className="text-[#374151] text-[0.86rem] mt-[1rem]">
          {industry} Organisation
        </p>
        {/* <p className='text-[0.85rem] mt-[1rem]'>Onboard date:  <span className="font-[600]">{onboardDate}</span></p> */}
      </div>

      <div className="mt-[2rem] overflow-hidden">
        <h4>Company virtual account</h4>
        <div className="mt-[1.5rem] ">
          <p className="text-[0.8rem] mt-[1rem] flex justify-between items-center">
            <span className="whitespace-nowrap min-w-[7rem] md:min-w-[6.5rem]">
              Bank name:
            </span>{" "}
            <span className="font-[600] md:max-w-[120px] w-full lg:max-w-[125px]">
              {bankName}
            </span>{" "}
            <span className="text-[#65CCCC]">
              <IoCopyOutline />
            </span>
          </p>
          <p className="text-[0.8rem] mt-[1rem] flex justify-between items-center">
            <span className="whitespace-nowrap min-w-[7rem] md:min-w-[6.5rem]">
              Account number:
            </span>{" "}
            <span className="font-[600] md:max-w-[120px] w-full lg:max-w-[125px]">
              {accNumber}
            </span>{" "}
            <span className="text-[#65CCCC]">
              <IoCopyOutline />
            </span>
          </p>
          <p className="text-[0.8rem] mt-[1rem] flex justify-between items-start">
            <span className="whitespace-nowrap min-w-[7rem] md:min-w-[6.5rem] ">
              Account name:
            </span>{" "}
            <span className="font-[600] md:max-w-[120px] w-full lg:max-w-[125px]">
              {accName}
            </span>{" "}
            <span className="text-[#65CCCC]">
              <IoCopyOutline />
            </span>
          </p>
        </div>
      </div>
    </div>

    //     <div className="h-fit bg-white px-[0.6rem] py-[1rem] rounded-[4px] border-[1px] overflow-hidden">
    //         <div className="flex items-start justify-between">
    //             <div className="w-[30%] overflow-hidden">
    //                 <img src={image} className='w-full' alt="" />
    //             </div>
    //             <div className=" bg-gray-100 px-[0.6rem] py-[0.4rem] rounded-[5px] text-[0.85rem]">
    //               <span className={`flex items-center   ${status? 'text-green-800': 'text-red-800'}`}><GoDotFill /> <span className='text-black'>{status? 'Active': 'Inactive'}</span> </span>
    //                 {/* <Dot */}
    //             </div>
    //         </div>

    //         <div className=" mt-[1rem] leading-[2rem]">
    //             <h1 className='font-[600]'>{name}</h1>
    //             <p className='text-[0.85rem] text-gray-500'>{position}</p>
    //             <p className='text-[0.8rem]'>Onboard date: 14 Sept, 2023</p>
    //         </div>
    //     </div>
    //   )
  );
}


 