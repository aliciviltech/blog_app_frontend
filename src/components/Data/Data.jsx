import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { storeBlogs } from '../../redux/reducers/blogReducer'
import { storeUser } from '../../redux/reducers/userReducer'
import { getByIdReq, getReq } from '../../api/axios'

const Data = () => {
  
    // ======================= redux functions ===========================
    const dispatch = useDispatch()
    const AllBlogsRedux = useSelector(state=>state.blogReducer.allBlogs);
    const activeUserRedux = useSelector(state=>state.userReducer.activeUser)

  
    // =================== fetch all blogs from mongoDB ====================
    const fetchBlogs = async()=>{
        const allBlogs = await getReq('/blogs')
        console.log(allBlogs)
        dispatch(storeBlogs(allBlogs.data.data))
    }
    useEffect(()=>{
        fetchBlogs()
    },[])

    // =================== fetch active user from mongoDB ====================
    const fetchActiveUser = async()=>{
        const activeUserString = localStorage.getItem('user');
        if(activeUserString && activeUserString !== 'undefined'){
            const activeUser = JSON.parse(activeUserString);
            const user = await getByIdReq(`auth/get_user/${activeUser._id}`)
            dispatch(storeUser(user.data.activeUser))
            localStorage.setItem('user',JSON.stringify(user.data.activeUser));
            console.log(user)
        }
    }
    useEffect(()=>{
        fetchActiveUser()
    },[])    
    
    console.log('this is data component')
  
    return (<></>)
}

export default Data