import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router'
import Header from '../../components/Header/Header';
import htmlParser from 'html-react-parser'
import AuthorTag from '../../components/AuthorTag/AuthorTag';
import SecondaryLoader from '../../components/Loader/SecondaryLoader';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const BlogDetail = () => {
  const navigate = useNavigate()
  // const params = useParams();
  // const { id } = params;
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id'); 

  // const [currentBlog, setCurrentBlog] = useState();

  //   ========================== getting all blogs from redux ========================
  const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs);
  const currentBlog = allBlogsRedux?.find((blog) => blog._id === id);
  console.log(currentBlog)


  useEffect(()=>{
    !id && navigate('/')
  },[id])


  return (
    <>
      <Header />
      <Breadcrumb/>
      
      <div className='relative'>
      {
        currentBlog ?
          <div className='BlogDetail px-4 sm:px-10 my-10'>
            <h1 className='H1'>{currentBlog.title}</h1>
            <div className="author flex items-center gap-1">
              <AuthorTag authorName={currentBlog.user_name} authorImage={currentBlog.user_image} />
            </div>
            <p className='mt-10'>{htmlParser(currentBlog?.blog_content)}</p>
          </div>
          :
          <div className='absolute top-0 left-0'>
            <SecondaryLoader />
          </div>
      }
      </div>
    </>
  )
}

export default BlogDetail