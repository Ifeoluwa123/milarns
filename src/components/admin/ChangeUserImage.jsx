import React, { useEffect, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'

export default function ChangeUserImage({userImage, setUserImage}) {
    

  const [displayImage, setDisplayImage] = useState(userImage)

    let handlePreviewImage = (selectedFile)=> {
            
           
        if(selectedFile.id === 'profilePic'){
               if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                
                setUserImage(selectedFile.files[0])
                // setUserImage(e.target.result)
                setDisplayImage(e.target.result)
            };
            reader.readAsDataURL(selectedFile.files[0]);
          }

        }
    }
  return (
    <div className=''>
        <div className=" w-[160px] h-[160px] md:w-[200px] overflow-hidden max-h-[200px] md:h-auto  border-[1px] border-[#D1D5DB] rounded-[4px]">
            <img src={displayImage} className='w-full' alt="" />
            <input accept="image/*" onChange={(e)=>handlePreviewImage(e.target)} id="profilePic"  type="file" className='invisible profileImg'  />
        </div>

        <button onClick={()=>document.querySelector('.profileImg').click()} className='bg-[#F5F5F5] border-[1px] border-[#D1D5DB] flex items-center gap-[10px] mt-[1rem] rounded-[4px] p-[6px]'><span><FiEdit2 /></span> Change </button>
    </div>
  )
}

