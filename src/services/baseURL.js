import axios from 'axios';
 

const BASEURL = "https://api.wagepull.com/api/v1/";
 
const  axiosInstance = axios.create({
  baseURL: BASEURL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
});

export default axiosInstance
 
