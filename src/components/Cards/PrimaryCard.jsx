import React from 'react'
import './PrimaryCard.css'
import AuthorTag from '../AuthorTag/AuthorTag'
import { useNavigate } from 'react-router'

const PrimaryCard = ({blog}) => {
  const navigate = useNavigate()
  return (
    <div className='PrimaryCard cursor-pointer' onClick={()=>navigate(`/${blog._id}`)}>
        <div className="imageContainer ">
            <img className='image w-full h-full object-cover rounded-lg' src={blog.thumbnail} alt='cardImage' />
        </div>
        <h1 className='H5'>{blog.title}</h1>
        <p className='P2'>{blog.summary}</p>
              <AuthorTag authorImage={blog.user_image} authorName={blog.user_name} date={blog.blogDate} />
    </div>
  )
}

export default PrimaryCard