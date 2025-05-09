import React from 'react'
import Hero from '../../components/Hero/Hero'
import Header from '../../components/Header/Header'
import NewPosts from '../../components/NewPosts/NewPosts'
import PopularSection from '../../components/PopularSection/PopularSection'
import Data from '../../components/Data/Data'
import PrimaryLoader from '../../components/Loader/PrimaryLoader'

const Home = () => {
  return (
    <div className='Home'>
        <Data/>
        <Header/>
        <Hero/>
        <NewPosts/>
        <PopularSection/>
    </div>
  )
}

export default Home