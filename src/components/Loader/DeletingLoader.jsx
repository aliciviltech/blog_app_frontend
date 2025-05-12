import React from 'react'
import './DeletingLoader.css'

const DeletingLoader = () => {
    return (
        <div className='deletingLoader w-screen h-screen flex items-center justify-center fixed top-0 left-0'>
            <div className='bg-black w-3/4 sm:w-1/2 h-1/2 rounded-lg flex items-center justify-center'>
                <span class="loader">Deleting</span>
            </div>
        </div>
    )
}

export default DeletingLoader