
import React from 'react'
import SecondaryCard from '../Cards/SecondaryCard'
import { AllBlogsData } from '../../utils/AllBlogsData'

const NewPosts = () => {
  return (
    <div className='NewPosts max-w-[1300px] mx-auto px-2 py-12 sm:px-0'>
        <h1 className='H4 my-2'>New Posts</h1>
      <div className='  flex flex-wrap justify-center gap-5 '>
        {
            AllBlogsData.map((blog)=>{
                return(
                    <SecondaryCard blog={blog}/>
                )
            })
        }
      </div>
    </div>
  )
}

export default NewPosts