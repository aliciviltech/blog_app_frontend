import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router'
import Header from '../../components/Header/Header';
import htmlParser from 'html-react-parser'
import AuthorTag from '../../components/AuthorTag/AuthorTag';
import SecondaryLoader from '../../components/Loader/SecondaryLoader';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { putReq } from '../../api/axios';
import { ThumbsUp } from 'lucide-react';
import MarkButton from '../../components/MarkButton/MarkButton';
import Footer from '../../components/Footer/Footer';

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
  // ================= active user redux ====================
  const activeUserRedux = useSelector(state => state.userReducer?.activeUser)




  // =================== handle like button ===================
  // const [liked, setLiked] = useState(false);
  // const showLiked = () => {
  //   currentBlog?.liked_by.forEach((el) => {
  //     el.user_id == activeUserRedux._id && setLiked(true)
  //   })
  // }
  // useEffect(() => {
  //   showLiked()
  // }, [])

  // =================== updating likes on data base =======================
  // const handleLike = async (e) => {
  //   e.stopPropagation();
  //   setLiked(!liked)
  //   try {
  //     liked ?
  //       await putReq(`/blogs/update-blog/${currentBlog._id}`, { $pull: { liked_by: { user_id: activeUserRedux._id } } })
  //       :
  //       await putReq(`/blogs/update-blog/${currentBlog._id}`, { $addToSet: { liked_by: { user_id: activeUserRedux._id } } })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }








  useEffect(() => {
    !id && navigate('/')
  }, [id])


  return (
    <div className='dark:text-gray-400 dark:bg-primaryDarkBg'>
      <Header />
      <Breadcrumb />

      {/* ===================================== blog content ============================= */}
      <div className='relative'>
        {
          currentBlog ?
            <div className='BlogDetail px-4 sm:px-10 my-10'>
              <div className='flex justify-end'>
               <MarkButton blog={currentBlog} size='large'/>
              </div>
              <h1 className='H1'>{currentBlog.title} </h1>
              <div className="author flex items-center gap-1">
                <AuthorTag authorName={currentBlog.user_name} authorImage={currentBlog.user_image} date={new Date(currentBlog.createdAt).toLocaleDateString()} />
              </div>
              <p className='bg-gray-400 w-fit px-2 rounded-sm text-black'>Category: {currentBlog.category}</p>
              <p className='mt-10'>{htmlParser(currentBlog?.blog_content)}</p>
            </div>
            :
            <div className='absolute top-0 left-0'>
              <SecondaryLoader />
            </div>
        }
      </div>

        <Footer/>

    </div>
  )
}

export default BlogDetail