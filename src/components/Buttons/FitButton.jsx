import React from 'react'

const FitButton = ({text, bgColor='var(--primaryColor)', textColor='white'}) => {
  return (
    <div className='w-fit px-4 py-1 rounded-md cursor-pointer text-center' style={{backgroundColor:bgColor, color:textColor}}>
        {text}
    </div>
  )
}

export default FitButton