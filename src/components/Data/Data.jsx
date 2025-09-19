import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { setBlogLoading, storeBlogs } from '../../redux/reducers/blogReducer'
import { setUserLoading, storeUser } from '../../redux/reducers/userReducer'
import { getByIdReq, getReq } from '../../api/axios'

const Data = () => {
  

    // ======================= redux functions ===========================
    const dispatch = useDispatch()
    const AllBlogsRedux = useSelector(state=>state.blogReducer?.allBlogs);
    const activeUserRedux = useSelector(state=>state.userReducer?.activeUser)

  
    // =================== fetch all blogs from mongoDB ====================
    const fetchBlogs = async()=>{
        try{
            const allBlogs = await getReq('/blogs')
            dispatch(storeBlogs(allBlogs?.data.data))
            dispatch(setBlogLoading(false))
        }catch(err){
            console.log(err)
            
        }
    }
    useEffect(()=>{
        if(AllBlogsRedux.length==0 || activeUserRedux=={}){
            fetchBlogs()
        }else{
            dispatch(setBlogLoading(false))
        }
    },[])

    // =================== fetch active user from mongoDB ====================
    const fetchActiveUser = async()=>{
        const activeUserString = localStorage.getItem('user') || null;
        if(activeUserString && activeUserString !== 'undefined'){
            const activeUser = JSON.parse(activeUserString);
            const user = await getByIdReq(`auth/get_user/${activeUser._id}`)
            user && dispatch(storeUser(user.data.activeUser))
            user && dispatch(setUserLoading(false))
            user &&  localStorage.setItem('user',JSON.stringify(user.data.activeUser));
        }
    }
    useEffect(()=>{
        fetchActiveUser()
    },[])    
    
    return (<></>)
}

export default Data