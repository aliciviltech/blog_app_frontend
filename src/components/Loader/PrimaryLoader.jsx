import React from 'react'
import './PrimaryLoader.css' 

const PrimaryLoader = () => {
  return (
    <div className='primaryLoader h-screen w-screen bg-black z-30 fixed top-0 left-0 flex justify-center items-center'>
        <span class="loader"></span>
    </div>
  )
}

export default PrimaryLoader