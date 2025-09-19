import React, { useEffect, useState } from 'react'
import './SecondaryCard.css'
import AuthorTag from '../AuthorTag/AuthorTag'
import { useNavigate } from 'react-router'
import { Bookmark, BookmarkCheck, Heart, ThumbsUp } from 'lucide-react'
import { getReq, putReq } from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { storeBlogs } from '../../redux/reducers/blogReducer'
import MarkButton from '../MarkButton/MarkButton'

const SecondaryCard = ({ blog }) => {
  const navigate = useNavigate()


  return (
    <>

          <div className='SecondaryCard bg-white dark:bg-cardDarkBg dark:text-white cursor-pointer hover:shadow-shadow-pr transition-shadow' onClick={() => navigate(`/read-blog?id=${blog._id}`)}>
            <div className="imageContainer">
              <img className='image w-full h-full object-cover rounded-lg' src={blog.thumbnail} alt='cardImage' />
            </div>
            <div className="textSide mt-2">
              <h1 className='H5'>{blog.title}</h1>
              <p className='P2 dark:text-gray-400 my-2'>{blog.summary}</p>
              <div className='flex justify-between items-center pr-4'>
                <AuthorTag authorImage={blog.user_image} authorName={blog.user_name} date={new Date(blog.createdAt).toLocaleDateString()} />
                <MarkButton blog={blog}/>
              </div>
              {/* <div className='text-right black50 flex gap-2 justify-end items-center'> {likesCount} people like</div> */}
            </div>
          </div>
        
    </>
  )
}

export default SecondaryCard