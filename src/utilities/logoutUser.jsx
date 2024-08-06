import { useQueryClient } from '@tanstack/react-query'



const queryClient = useQueryClient();
const logoutUser = ()=>{
    sessionStorage.clear()
    localStorage.clear()
    queryClient.clear();
    // queryClient.removeQueries("adminData")
 
}

export default logoutUser