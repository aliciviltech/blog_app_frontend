import React from 'react'

const FitButton = ({children, text, className='bg-primaryColor hover:bg-primaryDarkColor text-white'}) => {
  return (
    <div className={`w-fit px-4 py-1 rounded-md cursor-pointer text-center font-medium shadow-md active:scale-95 transition duration-200 ${className}`}>
        {text}
        {children}
    </div>
  )
}

export default FitButton