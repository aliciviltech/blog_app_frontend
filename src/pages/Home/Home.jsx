import React from 'react'
import Hero from '../../components/Hero/Hero'
import Header from '../../components/Header/Header'
import NewPosts from '../../components/NewPosts/NewPosts'
import PopularSection from '../../components/PopularSection/PopularSection'

const Home = () => {
  return (
    <div className='Home'>
        <Header/>
        <Hero/>
        <NewPosts/>
        <PopularSection/>
    </div>
  )
}

export default Home