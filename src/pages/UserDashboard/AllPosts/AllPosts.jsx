import React from 'react'
import { useSelector } from 'react-redux';
import SecondaryCard from '../../../components/Cards/SecondaryCard';

const AllPosts = () => {
    // get blog data from redux
    const allBlogsRedux = useSelector(state=>state.blogReducer.allBlogs);
    console.log(allBlogsRedux)
  return (
    <div className='AllPosts my-10 flex flex-wrap gap-8 justify-center'>
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