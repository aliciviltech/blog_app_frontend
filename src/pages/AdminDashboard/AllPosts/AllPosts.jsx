import React from 'react'
import { useSelector } from 'react-redux';
import SecondaryCard from '../../../components/Cards/SecondaryCard';

const AllPosts = () => {
    // get blog data from redux
    const allBlogsRedux = useSelector(state=>state.blogReducer.allBlogs);
    console.log(allBlogsRedux)
  return (
    <div className='AllPosts mt-10 flex flex-col gap-10'>
      {
        allBlogsRedux?.map((blog)=>{
          return(
            <div className="blog">
              <SecondaryCard blog={blog}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default AllPosts