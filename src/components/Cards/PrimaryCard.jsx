import React from 'react'
import './PrimaryCard.css'
import AuthorTag from '../AuthorTag/AuthorTag'
import { useNavigate } from 'react-router'
const PrimaryCard = ({blog}) => {
  const navigate = useNavigate()
  return (
    <div className='PrimaryCard' onClick={()=>navigate(`/${blog._id}`)}>
        <div className="imageContainer">
            <img className='image rounded-lg' src={blog.imageURL} alt='cardImage' />
        </div>
        <h1 className='H5'>{blog.title}</h1>
        <p className='P2'>{blog.description}</p>
        <AuthorTag authorImage={blog.authorImageUrl} authorName={blog.authorName} date={blog.blogDate}/>
    </div>
  )
}

export default PrimaryCard