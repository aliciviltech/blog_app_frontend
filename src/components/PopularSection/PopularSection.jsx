'use client'
import React, { useEffect, useState } from 'react'
import PrimaryCard from '../Cards/PrimaryCard'
import { Carousel } from 'antd';
import './PopularSection.css'
import { AllBlogsData } from '../../utils/AllBlogsData';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router';

const PopularSection = () => {


  // ============== carousel settings ==================
  const [carouselSetting, setCarouselSetting] = useState({slidesToShow: 1, arrows:true,});
  // const [screen, setScreen] = useState(window.innerWidth);
  const checkScreenF = ()=>{
    if(window.innerWidth > 1150){
      setCarouselSetting({...carouselSetting, slidesToShow: 4,})
    } else if(window.innerWidth > 900){
      setCarouselSetting({...carouselSetting, slidesToShow: 3,})
    } else if(window.innerWidth > 600 ){
      setCarouselSetting({...carouselSetting, slidesToShow:2 })
    } else {
      setCarouselSetting({...carouselSetting, slidesToShow:1 })
    }
  }
  useEffect(()=>{
    checkScreenF()
    window.addEventListener('resize', checkScreenF)
  },[])




   // ================ get all blogs from redux ================
   const skeletonArray = [1, 2, 3,4];
   const [allBlogs, setAllBlogs] = useState(skeletonArray)
   const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs)
   useEffect(() => {
     allBlogsRedux?.length > 0 && setAllBlogs(allBlogsRedux)
   }, [allBlogsRedux])
 



  return (
    // py-10 px-10 max-w-[1300px] mx-auto flex justify-center gap-[20px] flex-wrap
    <div className='PopularSection py-12 px-2 sm:px-0 max-w-[1300px] mx-auto'>
        <div className='my-2 flex justify-between items-center'>
        <h1 className='H4'>Popular Posts</h1>
        <Link to={'/popular-posts'} className='underline'>See all</Link>
        </div>
        <Carousel className=' flex gap-[20px] flex-wrap justify-center'
        {...carouselSetting}>
        {
            allBlogs.map((blog, index)=>{
                return(

                    blog.title ?
                    <PrimaryCard key={index} blog={blog} />
                    :
                    <div key={index} className='PrimaryCard'>
                      <Skeleton highlightColor='#cccccc'  containerClassName='skeletonContainer' className='skeleton'/>
                    </div>

                  )
                })
        }
        </Carousel>
    </div>
  )
}

export default PopularSection