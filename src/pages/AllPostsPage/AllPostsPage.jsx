import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import SecondaryCard from '../../components/Cards/SecondaryCard';

const AllPostsPage = () => {
  
  const allBlogsRedux = useSelector(state=>state.blogReducer.allBlogs);
  
//   ============================= getting blogs from redux ==========================
  
  
    return (
    <div className='dark:text-gray-500 dark:bg-primaryDarkBg'>
    <Header/>
    <Breadcrumb/>
    <div className='flex flex-col flex-wrap gap-10 justify-center items-center'>
      {
        allBlogsRedux?.map(blog=> 
          <SecondaryCard blog={blog} />
        )
      }
    </div>
  </div>
  )
}

export default AllPostsPage