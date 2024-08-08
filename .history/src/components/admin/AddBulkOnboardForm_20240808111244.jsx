import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Checkbox from '../shared/Checkbox'
import Button from '../shared/Button'
import { BsPlus } from 'react-icons/bs'
import { useAddBulkEmployee } from '../../services/admin/mutation'
import AlertMessages from '../shared/AlertMessages'

export default function AddBulkOnboardForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [checkBox, setCheckbox] = useState(false);

    const adminInfo = localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null;


    let handleFileChange = (e)=>{
        setSelectedFile(e.target.files[0]); 
     
    }

      let navigate = useNavigate()

    let {mutate, isPending} = useAddBulkEmployee()
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        mutate(formData,{
          onSuccess:(success)=>{
              // console.log(success)
              setSelectedFile(null)
              navigate("/staff-list")
              AlertMessages("Successful",success.message,"success")
          },
          onError:(error)=>{
              // console.log(error)
              AlertMessages("Error",error.response.data.message,"error")
          }
        })
        // try {
        //   const response = await axios.post('/upload', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //     onUploadProgress: (progressEvent) => {
        //       const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        //       setUploadPercentage(progress);
        //     },
        //   });
    
        //   console.log('File uploaded successfully:', response.data);
        // } catch (error) {
        //   console.error('Error uploading file:', error);
        // }
      };
  return (
    <div className="mt-[2rem]">
              {/* <p className='text-[0.85rem] mb-[1rem]'>Download <Link to="#" className='text-[var(--secondary-color)] font-[600] leading-[24px]'>Staff Bulk Onboard Template</Link> you can follow to onboard staff data.</p> */}

              <div className="mt-[1rem]">

                    
                            <div onClick={()=>document.getElementById("excelFile").click()}   className={`flex flex-col hover:cursor-pointer justify-center items-center ${selectedFile? ' w-full overflow-hidden'  : 'border-2 border-dashed w-full    md:w-full  '} md:max-w-[1111px] h-[180px]  border-[#6B7280] bg-[var(--grey-color)]   rounded-[5px]`}>
                            <input type="file" onChange={handleFileChange}  id="excelFile" className='hidden' />
                                    
                                   
                                    {
                                        selectedFile ? 
                                        selectedFile.name
                                        
                                        :

                                        <>
                                         <span className='text-[1.5rem]'><BsPlus /></span>
                                                <p className='text-[0.85rem]'>Upload staff data</p>
                                                <p className='text-[0.85rem] mt-[0.5rem]'>Only csv & xml file is allowed</p>
                                        </>

                          }
                            </div>
                            </div>





        <div className="">
        <div className="mt-[3rem]">
                            <h1 className='font-[600] text-[1rem]'>Staff confirmation</h1>
                            <div className='flex items-center my-[1.5rem] gap-x-[0.5rem]'>
                                <Checkbox onChange={()=>setCheckbox(prev=>!prev)} />
                                <p className='text-[0.85rem] leading-[24px]'>

        We confirm that this person is a staff at {adminInfo.organization.name} located at  {adminInfo.organization.address}, Nigeria and he’s oblige to  be taking salary in-advance through Milarn Inc.
        </p>
                            </div>

                            {/* <p className='text-[var(--secondary-color)] font-[500]'>You need to confirm this staff to proceed</p> */}
                            </div>

                            <div className=" mt-[3rem]">
                                <div className="flex items-start flex-wrap gap-x-[1rem] sm:flex-nowrap gap-y-[1.5rem]">
                                    <Button disabled={!checkBox} bgColor={`${!checkBox ? 'bg-grey-500 text-black cursor-not-allowed' : 'bg-[var(--secondary-color)] text-white'}`} text={`${isPending? "Loading...": "Onboard new staffs"}`} onClick={handleUpload}  type="button" width="w-fit " padding="px-[2rem] py-[1rem]" />

                                    {/* <button type="button" className='p-[14px_28px_14px_28px] hover:bg-[var(--grey-color)]  hover:border-none transition-all duration-[0.3s]  border-[1px] border-[#374151] rounded-[4px]'>Cancel</button> */}
                                </div>
                            </div>
        </div>
    </div>
  )
}
