import React from 'react'
import Hero from '../../components/Hero/Hero'
import Header from '../../components/Header/Header'
import NewPosts from '../../components/NewPosts/NewPosts'
import PopularSection from '../../components/PopularSection/PopularSection'
import Data from '../../components/Data/Data'
import PrimaryLoader from '../../components/Loader/PrimaryLoader'
import Weather from '../../components/Weather/Weather'

const Home = () => {
  return (
    <div className='Home'>
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