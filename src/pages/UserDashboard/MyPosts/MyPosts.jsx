import React, { useEffect, useState } from 'react'
import SecondaryCard from '../../../components/Cards/SecondaryCard';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteReq } from '../../../api/axios';
import { deleteBlog } from '../../../redux/reducers/blogReducer';
import toast from 'react-hot-toast';
import DeletingLoader from '../../../components/Loader/DeletingLoader';
import FormComponent from '../../../components/Form/Form';
import FitButton from '../../../components/Buttons/FitButton';

const MyPosts = () => {

  const dispatch = useDispatch()


  //   ========================== getting active user from redux ========================
  const activeUserRedux = useSelector(state => state.userReducer.activeUser);

  //   ========================== getting all blogs from redux ========================
  const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs);
  const myBlogs = allBlogsRedux?.filter((blog) => blog.user_id === activeUserRedux._id);
  console.log(myBlogs)


  // ================ edit blog ================
  const [showForm, setShowForm] = useState(false)
  const [blogData, setBlogData] = useState()

  const handleEdit = (blog) => {
    setShowForm(true);
    setBlogData(blog)
  }


  // =============== delete blog ===================
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async (id) => {
    setDeleting(true)
    try {
      await deleteReq(`/blogs/delete-blog/${id}`)
      dispatch(deleteBlog(id))
      toast.success(`Blog deleted`)
      setDeleting(false)
    } catch (error) {
      toast.error(`Error deleting blog: ${error}`)
      setDeleting(false)
      console.log(error)
    }
  }



  return (
    <div className='MyPosts my-10 flex flex-wrap gap-8 justify-center content-start'>
      {
        myBlogs?.length > 0 ?
          myBlogs.map((blog) => {
            return (
              <div key={blog._id} className="blog relative">
                <SecondaryCard blog={blog} />
                <div className="controls absolute bottom-6 right-16 flex gap-4 bg-red-500/30 px-2 py-1 rounded-md">
                  <div className="delete" onClick={() => handleDelete(blog._id)}><Trash2 className='cursor-pointer hover:text-[var(--primaryColor)]' /> </div>
                  <div className="edit" onClick={() => handleEdit(blog)}><Pencil className='cursor-pointer hover:text-[var(--primaryColor)]' /></div>
                </div>
              </div>
            )
          })
          :
          <h1>No posts yet</h1>
      }
      {
        deleting && <DeletingLoader />
      }




      {/* =================================== edit form ======================================== */}
      {
        showForm &&
        <div className="formContainer w-screen h-screen overflow-x-auto z-10 fixed top-0 left-0 ">
          <div className="form bg-white w-[90%] p-8 mx-auto my-[100px] border-2 border-black">
            <div className="button w-fit" onClick={() => setShowForm(false)}>

              <FitButton text={`Close`} />
            </div>
            <FormComponent type={'edit'} blogData={blogData} setShowForm={setShowForm} />
          </div>
        </div>
      }


    </div>
  )
}

export default MyPosts