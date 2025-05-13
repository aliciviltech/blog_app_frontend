
import React, { useEffect, useState } from 'react'
import SecondaryCard from '../Cards/SecondaryCard'
import { AllBlogsData } from '../../utils/AllBlogsData'
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router';

const NewPosts = () => {



  // ================ get all blogs from redux ================
  const skeletonArray = [1, 2, 3, 4];
  const [allBlogs, setAllBlogs] = useState(skeletonArray)
  const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs)
  const newPosts = [...allBlogsRedux]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  useEffect(() => {
    newPosts?.length > 0 && setAllBlogs(newPosts)
  }, [allBlogsRedux])



  return (
    <div className='NewPosts max-w-[1300px] mx-auto px-2 py-12 sm:px-0'>
        <div className='my-2 flex justify-between items-center'>
        <h1 className='H4 my-2'>New Posts</h1>
        <Link to={'/all-posts'} className='underline'>See all posts</Link>
      </div>
      <div className='  flex flex-wrap justify-center gap-5 '>
        {
          allBlogs?.slice(0, 4).map((blog, index) => {
            return (
              blog.title ?
                <SecondaryCard key={index} blog={blog} />
                :
                <div key={index} className='SecondaryCard'>
                  <Skeleton highlightColor='#cccccc' containerClassName='skeletonContainer' className='skeleton' />
                </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default NewPosts