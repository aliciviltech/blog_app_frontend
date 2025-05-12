import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import SecondaryCard from '../../components/Cards/SecondaryCard';

const PopularPosts = () => {
  
  const allBlogsRedux = useSelector(state=>state.blogReducer.allBlogs);
  const popularBlogs = allBlogsRedux.filter((blog)=>blog.section=='popular')
  
//   ============================= getting blogs from redux ==========================
  
  
    return (
    <>
    <Header/>
    <Breadcrumb/>
    <div className='flex flex-col flex-wrap gap-10 justify-center items-center'>
      {
        popularBlogs.map(blog=> 
          <SecondaryCard blog={blog} />
        )
      }
    </div>
  </>
  )
}

export default PopularPosts