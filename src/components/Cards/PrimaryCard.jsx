import React, { useEffect, useState } from 'react'
import './PrimaryCard.css'
import AuthorTag from '../AuthorTag/AuthorTag'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getReq, putReq } from '../../api/axios'
import { storeBlogs } from '../../redux/reducers/blogReducer'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import MarkButton from '../MarkButton/MarkButton'

const PrimaryCard = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ================= active user redux ====================
  const { activeUser, loading } = useSelector(state => state.userReducer || { activeUser: null, loading: true })

  // ================== getting blogs from data base =====================
  const dataBaseBlogs = async () => {
    try {
      const response = await getReq('/blogs');
      dispatch(storeBlogs(response.data.data))
      console.log(response)
    } catch (error) {
      console.log("error getting blogs: ", error)
    }
  }

  // =================== handle mark button ===================
  const [marked, setMarked] = useState(false);
  const showMarked = () => {
    blog?.marked_by?.forEach((el) => {
      el.user_id == activeUser?._id && setMarked(true)
    })
  }
  useEffect(() => {
    showMarked()
  }, [])

  // =================== updating marked on data base =======================
  const handleMark = async (e) => {
    e.stopPropagation();
    setMarked(!marked)
    try {
      marked ?
        await putReq(`/blogs/update-blog/${blog._id}`, { $pull: { marked_by: { user_id: activeUser._id } } })
        :
        await putReq(`/blogs/update-blog/${blog._id}`, { $addToSet: { marked_by: { user_id: activeUser._id } } })
      await dataBaseBlogs()
    } catch (error) {
      console.log(error)
    }
  }


  // if(loading || !activeUser) return 'loading...'

  return (
    <div className='PrimaryCard bg-white dark:bg-cardDarkBg dark:text-white self-stretch cursor-pointer' onClick={() => navigate(`/read-blog?id=${blog._id}`)}>
      <div className="imageContainer w-full text-center">
        <img className='image w-full h-full object-cover rounded-lg' src={blog.thumbnail} alt='cardImage' />
      </div>
      <h1 className='H5 mt-2'>{blog.title}</h1>
      <p className='P2 dark:text-gray-400 my-2'>{blog.summary}</p>
      <div className='flex justify-between items-center'>
        <AuthorTag authorImage={blog.user_image} authorName={blog.user_name} date={new Date(blog.createdAt).toLocaleDateString()} />
        <MarkButton blog={blog} />
      </div>
    </div>
  )
}

export default PrimaryCard