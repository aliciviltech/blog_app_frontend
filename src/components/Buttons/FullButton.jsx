import React from 'react'

const FullButton = ({text, bgColor='var(--primaryColor)', textColor='white'}) => {
  return (
    <div className='w-full p-2 rounded-md cursor-pointer text-center' style={{backgroundColor:bgColor, color:textColor}}>
        {text}
    </div>
  )
}

export default FullButton