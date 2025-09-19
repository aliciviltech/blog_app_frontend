import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import SecondaryCard from '../../components/Cards/SecondaryCard';

const PopularPosts = () => {
  
  const {allBlogs, loading} = useSelector(state=>state.blogReducer);
  const popularBlogs = allBlogs.filter((blog)=>blog.section=='popular')
  
//   ============================= getting blogs from redux ==========================
  
  // if(loading) return 'Loading...'
    return (
    <div className='dark:text-gray-500 dark:bg-primaryDarkBg'>
    <Header/>
    <Breadcrumb/>
    <div className='flex flex-col flex-wrap gap-10 justify-center items-center'>
      {
        popularBlogs.map(blog=> 
          <SecondaryCard blog={blog} />
        )
      }
    </div>
  </div>
  )
}

export default PopularPosts