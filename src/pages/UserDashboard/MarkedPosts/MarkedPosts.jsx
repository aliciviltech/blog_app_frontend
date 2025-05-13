import React from 'react'
import { useSelector } from 'react-redux'
import SecondaryCard from '../../../components/Cards/SecondaryCard'

const MarkedPosts = () => {


  const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs)
  const activeUserRedux = useSelector(state=>state.userReducer.activeUser)

  const markedBlogs = allBlogsRedux?.filter((blog) =>
    blog.marked_by.some((mark)=> mark.user_id == activeUserRedux._id)
  )



  return (
    <div className='MarkedPosts my-10 flex flex-wrap gap-8 justify-center'>
      {
        markedBlogs?.map((blog)=>{
          return(
            <SecondaryCard blog={blog} />
          )
        })
      }
    </div>
  )
}

export default MarkedPosts