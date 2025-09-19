import React from 'react'

const FullButton = ({text, className='text-white bg-primaryColor', type='button'}) => {
  return (
    <button type={type} className={`w-full p-2 rounded-md cursor-pointer text-center font-medium shadow-md hover:bg-primaryDarkColor active:scale-95 transition duration-200 ${className}`} >
        {text}
    </button>
  )
}

export default FullButton