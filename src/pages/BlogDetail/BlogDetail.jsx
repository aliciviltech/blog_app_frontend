import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import Header from '../../components/Header/Header';
import htmlParser from 'html-react-parser'
import AuthorTag from '../../components/AuthorTag/AuthorTag';

const BlogDetail = () => {
  const params = useParams();
  const {id} = params;

  // const [currentBlog, setCurrentBlog] = useState();
  
//   ========================== getting all blogs from redux ========================
const allBlogsRedux = useSelector(state=>state.blogReducer.allBlogs);
const currentBlog = allBlogsRedux?.find((blog)=>blog._id===id);
console.log(currentBlog)
    return (
        <>
        <Header/>
    
    {
      currentBlog &&
      <div className='BlogDetail px-4 sm:px-10 my-10'>      
          <h1 className='H1'>{currentBlog.title}</h1>
          <div className="author flex items-center gap-1">
          <AuthorTag authorName={currentBlog.user_name} authorImage={currentBlog.user_image}/>
          </div>
          <p className='mt-10'>{htmlParser(currentBlog?.blog_content)}</p>
      </div>
    }
    </>
  )
}

export default BlogDetail