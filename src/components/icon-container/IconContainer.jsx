import { Twitter } from 'lucide-react'
import React from 'react'

const IconContainer = ({className='', iconSize=16, iconColor='black'}  ) => {
  return (
    <div className={`p-2 rounded-md border border-gray-300 ${className}`}>
        <Twitter color={iconColor} size={iconSize}/>
    </div>
  )
}

export default IconContainer