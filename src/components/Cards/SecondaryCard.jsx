import React from 'react'
import './SecondaryCard.css'
import AuthorTag from '../AuthorTag/AuthorTag'
import { useNavigate } from 'react-router'

const SecondaryCard = ({ blog }) => {
  const navigate = useNavigate()

  return (
    <>
      {
        blog.user_name ?
          <div className='SecondaryCard cursor-pointer hover:shadow-shadow-pr transition-shadow' onClick={()=>navigate(`/${blog._id}`)}>
            <div className="imageContainer">
              <img className='image w-full h-full object-cover rounded-lg' src={blog.thumbnail} alt='cardImage' />
            </div>
            <div className="textSide">
              <h1 className='H5'>{blog.title}</h1>
              <p className='P2'>{blog.summary}</p>
              <AuthorTag authorImage={blog.user_image} authorName={blog.user_name} date={blog.blogDate} />
            </div>
          </div>
          :
          <div className='SecondaryCard'>
            <div className="imageContainer">
              <img className='image w-full h-full object-cover rounded-lg' src={blog.imageURL} alt='cardImage' />
            </div>
            <div className="textSide">
              <h1 className='H5'>{blog.title}</h1>
              <p className='P2'>{blog.description}</p>
              <AuthorTag authorImage={blog.authorImageUrl} authorName={blog.authorName} date={blog.blogDate} />
            </div>
          </div>

}
    </>
  )
}

export default SecondaryCard