import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import FullButton from '../Buttons/FullButton';
import { storeBlogs } from '../../redux/reducers/blogReducer';
import { getReq, postReq, putReq } from '../../api/axios';


const FormComponent = ({ type, blogData, setShowForm }) => {
  const { user_name, category, summary, thumbnail, blog_content, blog_comments, title, updatedAt, user_id, user_image, _id } = blogData;
  const [mainButtonText, setMainButtonText] = useState(type=='edit'? "Update" : "Post")

  const dispatch = useDispatch()

  // =================== node refs =========================
  const editorRef = useRef(null);




  // thumbnail image 
  const [thumbnailUrl, setThumbnailUrl] = useState('')

  // extracting user , if available
  const activeUserRedux = useSelector(state => state.userReducer.activeUser);
  // extracting all blogs from redux
  const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs);
  // getting blogs from data base
  const dataBaseBlogs = async()=>{
    try{
      const response = await getReq('/blogs');
      dispatch(storeBlogs(response.data.data))
      console.log(response)
    }catch(error){
      console.log("error getting blogs: ", error)
    }
  }


  // summary letter count
  const [summaryCount, setSummaryCount] = useState(0);
  const handleSummaryCount = (e) => {
    setSummaryCount(e.target.value.length)
  }

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  useEffect(() => {
    if (type == 'edit') {
      const { _id, ...otherFields } = blogData;
      console.log(blogData)
      reset(otherFields)
    }
  }, [])


  // ===================== tinyMCE / react-hook-form =================================

  // validate form fields field
  const validateEditor = (data) => {
    return new Promise((resolve, reject) => {
      if (editorRef.current) {
        const text = editorRef.current.getContent({ format: 'text' })
        let totalWords = text.trim().split(/\s+/).length;
        if (data.summary.trim().length < 120) {
          // toast.error('Blog summary shall be atleast 120 characters long')
          reject('Blog summary shall be atleast 120 characters long')
        } else if (totalWords < 100) {
          // toast.error('Blog shall not be less than 100 words')
          reject("Blog shall not be less than 100 words");
        } else {
          resolve(data);
        }
      }
    })
  }

  // ========================== post blog on data base ============================
  const postBlog = async (data) => {
    setMainButtonText('Loading...')
    const finalBlogData = {
      ...data,
      blog_content: editorRef.current.getContent(),
      user_name: activeUserRedux?.name,
      user_id: activeUserRedux?._id,
      thumbnail: thumbnailUrl,
      user_image: activeUserRedux.user_image,
    }
    // post api
    try {
      const response = await postReq('/blogs/post-blog', finalBlogData);
      dispatch(storeBlogs([...allBlogsRedux, finalBlogData]))
      console.log(response)
      toast.success('Blog posted successfully')
      setShowForm(false) 
    } catch (error) {
      toast.error(error.message)
      console.log('Error in posting blog at AddPost: ', error)
    }
  }
  const submitPost = () => {
    handleSubmit(async (data) => {
      validateEditor(data).then(() => postBlog(data)).catch((err) => { toast.error(err) })
    })();
  };

  // =============================== update blog on data base ===========================
  const updateBlog = async (data) => {
    setMainButtonText('Loading...')
    const finalBlogData = {
      ...data,
      blog_content: editorRef.current.getContent(),
      thumbnail:  thumbnailUrl || thumbnail,
    }
    // update api
    try {
      const response = await putReq(`/blogs/update-blog/${_id}`, finalBlogData);
      dataBaseBlogs()
      console.log(response)
      toast.success('Blog updated successfully')
      setShowForm(false) 
    } catch (error) {
      toast.error(error.message)
      console.log('Error in updating blog: ', error)
    }
    console.log(finalBlogData)
  }
  const updatePost = () => {
    handleSubmit(async (data) => {
      validateEditor(data).then(() => updateBlog(data)).catch((err) => { toast.error(err) })
    })();
  };



  // =================== create / process thumbnail image url ==========================
  const processThumbnailURL = (e) => {
    const img = e.target.files[0]
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img);
    fileReader.onload = () => {
      setThumbnailUrl(fileReader.result)
      console.log(fileReader.result)
    }
  }











  return (
    <div className='FormComponent py-12'>
      Add Post componenet


      {/* =================================== React hook form =================================== */}

      <form className='flex my-4 flex-col gap-2' >
        {
          type == 'edit' &&
          <>
          <label className='opacity-[0.7]'>Section:</label>
          <select {...register("section", { required: true })} className='p-2 border border-gray-300 rounded-md'>
            <option value="" disabled selected>Select section</option>
            <option value="hero">Hero</option>
            <option value="new">New Posts</option>
            <option value="popular">Popular</option>
          </select>
          </>
        }
        <label className='opacity-[0.7]'>Author Name:</label>
        <input {...register("user_name", { required: true })} placeholder='Enter your name' className='p-2 border border-gray-300 rounded-md' />
        <label className='opacity-[0.7]'>Blog Category:</label>
        <select {...register("category", { required: true })} className='p-2 border border-gray-300 rounded-md'>
          <option value="" disabled selected>Select blog category</option>
          <option value="travel">Travel</option>
          <option value="health">Health</option>
          <option value="food">Food</option>
          <option value="technology">Technology</option>
          <option value="fitness">Fitness</option>
          <option value="education">Education</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <label className='opacity-[0.7]'>Blog Title:</label>
        <input {...register("title", { required: true })} placeholder='Enter blog title' className='p-2 border border-gray-300 rounded-md' />
        <p>Write a blog introduction, which will appear in thumbnail/preview of blog. {`(minimum 200 characters long.)`} </p>
        <textarea {...register("summary", { required: true })} minLength={120} placeholder='wirte a blog summary/introduction/context' className='resize-none p-2 border border-gray-300 rounded-md' onChange={handleSummaryCount} ></textarea>
        <p className='text-right text-[12px] m-0 p-0 ' >Summary letter count: {summaryCount}</p>

        {
          type == 'edit' ?
            <>
              <img src={thumbnailUrl ? thumbnailUrl : thumbnail} alt="thumbnail" className='w-28 h-28 object-contain' />
              <label for='imageInput' className='bg-gray-400 rounded-sm px-2 py-1 w-fit cursor-pointer'>Change thumbnail image</label>
              <input type="file" {...register("thumbnailImage")} id='imageInput' className='hidden' onChange={processThumbnailURL} />
            </>
            :
            <>
              <p>Upload thumbnail image</p>
              <input type="file" {...register("thumbnailImage", { required: true })} onChange={processThumbnailURL} />
              {errors.thumbnailImage && <span className='text-red-700'>*Thumbnail image is required</span>}

              {
                thumbnailUrl && <img src={type == 'edit' ? thumbnail : thumbnailUrl} alt="thumbnail" className='w-28 h-28 object-contain' />
              }
            </>

        }

        {/* {errors.exampleRequired && <span>This field is required</span>} */}
      </form>


      {/* =================================== tinyMCE form =================================== */}
      <Editor
        apiKey='pw415ny3smjyx0vg2xmgrt55dtzgzjyaqbfzf752nuwwfma5'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={blog_content || "<p>This is the initial content of the editor.</p>"}
        init={{
          height: 500,
          menubar: false,
          placeholder: "Write your blog content here...",
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      {
        type == 'edit' ?
          <div className="submitButton mt-4" onClick={updatePost}>
            <FullButton text={mainButtonText}/>
          </div>
          :
          <div className="submitButton mt-4" onClick={submitPost}>
            <FullButton text={mainButtonText} />
          </div>
      }


    </div>
  )
}

export default FormComponent