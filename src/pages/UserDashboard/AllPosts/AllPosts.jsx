import React, { useState } from 'react'
import { CircleX, Delete, DeleteIcon, PenBox, Pencil, Trash, Trash2, TrashIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import SecondaryCard from '../../../components/Cards/SecondaryCard';
import FitButton from '../../../components/Buttons/FitButton';
import { Form, useNavigate } from 'react-router';
import FormComponent from '../../../components/Form/Form';
import { deleteReq } from '../../../api/axios';
import toast from 'react-hot-toast';
import DeletingLoader from '../../../components/Loader/DeletingLoader';
import { deleteBlog } from '../../../redux/reducers/blogReducer';

const AllPosts = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ================== edit blog ====================
  const [showForm, setShowForm] = useState(false)
  const [blogData, setBlogData] = useState()
  const [deleting, setDeleting] = useState(false)

  const handleEdit = (blog) => {
    setShowForm(true);
    setBlogData(blog)
  }

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

  // get blog data from redux
  const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs);
  return (
    <>
      <div className='AllPosts my-10 flex flex-wrap gap-8 justify-center'>
        {
          allBlogsRedux?.map((blog) => {
            return (
              <div className="blog relative">
                <SecondaryCard blog={blog} />
                <div className="controls absolute bottom-6 right-16 flex gap-4 bg-red-500/30 px-2 py-1 rounded-md">
                  <div className="delete" onClick={()=>handleDelete(blog._id)}><Trash2 className='cursor-pointer hover:text-[var(--primaryColor)]' /> </div>
                  <div className="edit" onClick={() => handleEdit(blog)}><Pencil className='cursor-pointer hover:text-[var(--primaryColor)]' /></div>
                </div>
              </div>
            )
          })
        }
        {
          deleting && <DeletingLoader />
        }
      </div>



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
    </>
  )
}

export default AllPosts