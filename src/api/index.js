import axios from 'axios'

// const BASE_URL = process.env.BASE_URL
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout:8000,
    headers:{
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.response.use((res)=>{
    return res;
}, (error)=>{
    return Promise.reject(error)
})

export default apiClient