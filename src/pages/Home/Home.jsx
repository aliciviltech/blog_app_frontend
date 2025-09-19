import React from 'react'
import Hero from '../../components/Hero/Hero'
import Header from '../../components/Header/Header'
import NewPosts from '../../components/NewPosts/NewPosts'
import PopularSection from '../../components/PopularSection/PopularSection'
import Data from '../../components/Data/Data'
import PrimaryLoader from '../../components/Loader/PrimaryLoader'
import Weather from '../../components/Weather/Weather'
import Footer from '../../components/Footer/Footer'
import { getReq } from '../../api/axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {

  const { allBlogs, loading } = useSelector(state => state.blogReducer);
  
  

  const checkProfile = async()=>{
    try{
      const response = await getReq('/auth/profile');
      console.log('profile check',response)
    }catch(error){
      console.log('profile check Error',error)
    }
  }

  useEffect(()=>{
    checkProfile()
  },[])
  

  if(loading) return <PrimaryLoader/>

  return (
    <div className='Home dark:bg-primaryDarkBg transition-all'>
        <Data/>
        <Header/>
        <Hero/>
        <NewPosts/>
        <Weather/>
        <PopularSection/>
    </div>
  )
}

export default Home