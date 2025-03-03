import React, { useState } from 'react'
import { CircleX, Delete, DeleteIcon, PenBox, Pencil, Trash, Trash2, TrashIcon } from 'lucide-react'
import { useSelector } from 'react-redux';
import SecondaryCard from '../../../components/Cards/SecondaryCard';
import FitButton from '../../../components/Buttons/FitButton';
import { Form, useNavigate } from 'react-router';
import FormComponent from '../../../components/Form/Form';

const AllPosts = () => {

  const navigate = useNavigate()

  // ================== edit blog ====================
  const [showForm, setShowForm] = useState(false)
  const [blogData, setBlogData] = useState()
  
  const handleEdit = (blog)=>{
    setShowForm(true);
    setBlogData(blog)
  }

  // get blog data from redux
  const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs);
  console.log(allBlogsRedux)
  return (
    <>
      <div className='AllPosts my-10 flex flex-wrap gap-8 justify-center'>
        {
          allBlogsRedux?.map((blog) => {
            return (
              <div className="blog relative">
                <SecondaryCard blog={blog} />
                <div className="controls absolute bottom-4 right-2 flex gap-2 bg-red-500/30 px-2 py-1 rounded-md">
                  <div className="delete"><Trash2 className='cursor-pointer hover:text-[var(--primaryColor)]' /> </div>
                  <div className="edit" onClick={() => handleEdit(blog)}><Pencil className='cursor-pointer hover:text-[var(--primaryColor)]' /></div>
                </div>
              </div>
            )
          })
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
            <FormComponent type={'edit'} blogData={blogData} />
          </div>
        </div>
      }
    </>
  )
}

export default AllPosts