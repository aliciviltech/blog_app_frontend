
import React, { useEffect, useState } from 'react'
import SecondaryCard from '../Cards/SecondaryCard'
import { AllBlogsData } from '../../utils/AllBlogsData'
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

const NewPosts = () => {



  // ================ get all blogs from redux ================
  const skeletonArray = [1, 2, 3,4];
  const [allBlogs, setAllBlogs] = useState(skeletonArray)
  const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs)
  useEffect(() => {
    allBlogsRedux?.length > 0 && setAllBlogs(allBlogsRedux)
  }, [allBlogsRedux])



  return (
    <div className='NewPosts max-w-[1300px] mx-auto px-2 py-12 sm:px-0'>
      <h1 className='H4 my-2'>New Posts</h1>
      <div className='  flex flex-wrap justify-center gap-5 '>
        {
          allBlogs.map((blog) => {
            return (
              blog.title ?
              <SecondaryCard blog={blog} />
              :
              <div className='SecondaryCard'>
                <Skeleton highlightColor='#cccccc'  containerClassName='skeletonContainer' className='skeleton'/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default NewPosts