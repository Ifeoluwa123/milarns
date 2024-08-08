import axiosInstance from "./baseURL"
import {redirect} from "react-router-dom"
 
//To fetch default values for Oraganization / Administrator
 export const getOrganizationInfo = async ()=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    console.log(adminInfo)
    if(adminInfo){
       
        const options =  {
            headers:{
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }
        const response = await axiosInstance?.get('organization/'+adminInfo.organization.code, options )
        console.log(response)
        return response.data 
    }
    else{
       return redirect('/')
    }
 }



//To fetch Hear-About-Us
 export const getHearAboutUs = async ()=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    if(adminInfo){
       
        const options =  {
            headers:{
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }
        const response = await axiosInstance.get('core/mediums/', options )
        return response.data 
    }
    else{
       return redirect('/')
    }
 }


//To fetch Industry
 export const getOrganizationIndustry = async ()=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    if(adminInfo){
       
        const options =  {
            headers:{
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }
        const response = await axiosInstance.get('core/industry/', options )
        return response.data 
    }
    else{
       return redirect('/')
    }
 }



//To fetch Bank Names
 export const getBankNames = async ()=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    if(adminInfo){
       
        const options =  {
            headers:{
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }
        const response = await axiosInstance.get('core/banks', options )
        return response.data 
    }
    else{
       return redirect('/')
    }
 }



//To fetch Country
 export const getCountryNames = async (orgCode)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    if(adminInfo){
       
        const options =  {
            headers:{
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }
        const response = await axiosInstance.get('core/countries/', options )
        return response.data 
    }
    else{
       return redirect('/')
    }
 }


//To fetch All States in Nigeria
 export const getNigeriaState = async ()=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    if(adminInfo){
       
        const options =  {
            headers:{
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }
        const response = await axiosInstance.get('/core/states/234/', options )
        return response.data 
    }
    else{
       return redirect('/')
    }
 }


//  Delete Items

const deleteItem = async (url)=>{

    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    if(adminInfo){
       
        const options =  {
            headers:{
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }
        const response = await axiosInstance.delete(url, options )
        return response.data 

    }else{
        return redirect('/')
    }
}



//  Deactivate Items

const deactiveItem = async (url)=>{

     const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    if(adminInfo){
       
        const options =  {
            headers:{
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }

        const response = await axiosInstance.delete(url, options )
        return response.data 

    }else{
        return redirect('/')
    }
}




// Update Items
const updateItem = async (url, data)=>{


     const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    if(adminInfo){
       
        const options =  {
            headers:{
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }

        const response = await axiosInstance.patch(url,data, options )
        return response.data 

    }else{
        return redirect('/')
    }
}


// Add Items
const addItem = async (url,data)=>{


     const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    if(adminInfo){
       
        const options =  {
            headers:{
                Authorization : 'Bearer ' + adminInfo.token.access
            }
        }

        const response = await axiosInstance.post(url,data, options )
        return response.data 

    }else{
        return redirect('/')
    }
}