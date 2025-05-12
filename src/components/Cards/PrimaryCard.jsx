import React from 'react'
import './PrimaryCard.css'
import AuthorTag from '../AuthorTag/AuthorTag'
import { useNavigate } from 'react-router'

const PrimaryCard = ({blog}) => {
  const navigate = useNavigate()
  return (
    <div className='PrimaryCard cursor-pointer'  onClick={()=>navigate(`/read-blog?id=${blog._id}`)}>
        <div className="imageContainer w-full text-center">
            <img className='image w-full h-full object-cover rounded-lg' src={blog.thumbnail} alt='cardImage' />
        </div>
        <h1 className='H5'>{blog.title}</h1>
        <p className='P2'>{blog.summary}</p>
              <AuthorTag authorImage={blog.user_image} authorName={blog.user_name} date={new Date(blog.createdAt).toLocaleDateString()} />
    </div>
  )
}

export default PrimaryCard