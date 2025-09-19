import React from 'react'

const CommentCards = ({user, comment, className}) => {
  return (
    <div className={`p-4 rounded-md bg-[var(--bgPrimary)] dark:bg-[#1b1b1b] flex flex-col gap-2 ${className}`}>
        <h1 className='H5'>{comment.name}</h1>
        <p className='P3 dark:text-gray-400'>{comment.comment}</p>
    </div>
  )
}

export default CommentCards