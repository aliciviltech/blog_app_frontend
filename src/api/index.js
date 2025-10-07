import axios from 'axios'

// const BASE_URL = process.env.BASE_URL
const apiClient = axios.create({
    // baseURL: 'http://localhost:8080/',
    baseURL: 'https://blog-app-backend-pi.vercel.app/',
    timeout:100000,
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials:true,
})

apiClient.interceptors.response.use((res)=>{
    return res;
}, (error)=>{
    return Promise.reject(error)
})

export default apiClient