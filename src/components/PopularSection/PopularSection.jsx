'use client'
import React, { useEffect, useState } from 'react'
import PrimaryCard from '../Cards/PrimaryCard'
import { Carousel } from 'antd';
import './PopularSection.css'
import { AllBlogsData } from '../../utils/AllBlogsData';

const PopularSection = () => {
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
  return (
    // py-10 px-10 max-w-[1300px] mx-auto flex justify-center gap-[20px] flex-wrap
    <div className='PopularSection py-12 px-2 sm:px-0 max-w-[1300px] mx-auto'>
        <h1 className='H4 my-2'>Popular Posts</h1>
        <Carousel className=' flex gap-[20px] flex-wrap justify-center'
        {...carouselSetting}>
        {
            AllBlogsData.slice(0,4).map((blog, index)=>{
                return(
                    <PrimaryCard blog={blog} />
                  )
                })
        }
        </Carousel>
    </div>
  )
}

export default PopularSection