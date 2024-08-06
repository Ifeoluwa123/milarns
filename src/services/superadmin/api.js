 // AUTH ENDPOINTS //////////////////////////////////////////////////////////////////

//For Login:  

export const superAdminLogin = async (credentials)=>{

    const token =  localStorage.getItem('superAdminToken')
    const response = await axiosInstance.post('auth/superadmin/login/', credentials)
    return response.data 
}

// AUTH ENDPOINTS //