import React, { useEffect, useState } from 'react'
import SecondaryCard from '../../../components/Cards/SecondaryCard';
import { useSelector } from 'react-redux';

const MyPosts = () => {



//   ========================== getting active user from redux ========================
const activeUserRedux = useSelector(state=>state.userReducer.activeUser);

//   ========================== getting all blogs from redux ========================
  const allBlogsRedux = useSelector(state=>state.blogReducer.allBlogs);
  const myBlogs = allBlogsRedux?.filter((blog)=>blog.user_id===activeUserRedux._id);
  console.log(myBlogs)
  
  

  return (
    <div className='MyPosts my-10 flex flex-wrap gap-8 justify-center content-start'>
      {
        myBlogs?.length>0 ?
        myBlogs.map((blog)=>{
          return(
            <div className="blog">
              <SecondaryCard blog={blog}/>
            </div>
          )
        })
        :
        <h1>No posts yet</h1>
      }
    </div>
  )
}

export default MyPosts