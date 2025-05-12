import React, { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import FullButton from '../../../components/Buttons/FullButton';
import { postReq } from '../../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { storeBlogs } from '../../../redux/reducers/blogReducer';


const AddPost = () => {
  const dispatch = useDispatch()

  const [mainBtn, setMainBtn]= useState('Post')

  // thumbnail image 
  const [thumbnailUrl, setThumbnailUrl] = useState('')

  // extracting user , if available
  const activeUserRedux = useSelector(state=>state.userReducer.activeUser);
  // extracting all blogs from redux
  const allBlogsRedux = useSelector(state=>state.blogReducer.allBlogs);


  // summary letter count
  const [summaryCount, setSummaryCount] = useState(0);
  const handleSummaryCount = (e) => {
    setSummaryCount(e.target.value.length)
  }

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // tinyMCE / react-hook-form
  const editorRef = useRef(null);
  const submitForm = () => {
    handleSubmit(async(data) => {
      if (editorRef.current) {
        const text = editorRef.current.getContent({ format: 'text' })
        let totalWords = text.trim().split(/\s+/).length;

        if(data.summary.trim().length<120){
          toast.error('Blog summary shall be atleast 120 characters long')
        } else if(totalWords<100){
          toast.error('Blog shall not be less than 100 words')
        } else{
          const saveBlog = {
            ...data, 
            blog_content:editorRef.current.getContent(), 
            // user_name:activeUserRedux?.name, 
            user_id:activeUserRedux?._id,
            thumbnail:thumbnailUrl,
            user_image:activeUserRedux.user_image,
          }
          // post blog on data base
          try{
            setMainBtn('Loading...')
            const response = await postReq('/blogs/post-blog',saveBlog);
            dispatch(storeBlogs([...allBlogsRedux,saveBlog]))
            console.log(response) 
            toast.success('Blog posted successfully')
            setMainBtn('Post')
          }catch(error){
            toast.error(error.message)
            console.log('Error in posting blog at AddPost: ',error)
          }
        }
      }

    })();
  };

  // create / process thumbnail image url
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
    <div className='AddPost py-12 px-4'>
      Add Post componenet

      <form className='flex my-4 flex-col gap-2' >
        <input {...register("user_name", { required: true })} placeholder='Enter your name' className='p-2 border border-gray-300 rounded-md' />
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
        <input {...register("title", { required: true })} placeholder='Enter blog title' className='p-2 border border-gray-300 rounded-md' />
        <p>Write a blog introduction, which will appear in thumbnail/preview of blog. {`(minimum 120 characters long.)`} </p>
        <textarea {...register("summary", { required: true })} minLength={120} placeholder='wirte a blog summary/introduction/context' className='resize-none p-2 border border-gray-300 rounded-md' onChange={handleSummaryCount} ></textarea>
        <p className='text-right text-[12px] m-0 p-0 ' >Summary letter count: {summaryCount}</p>
        <p>Upload thumbnail image</p>
        <input type="file" {...register("thumbnailImage", { required: true })} onChange={processThumbnailURL} />
        {errors.thumbnailImage && <span className='text-red-700'>*Thumbnail image is required</span>}

        {
          thumbnailUrl && <img src={thumbnailUrl} alt="thumbnail" className='w-28 h-28 object-contain' />
        }
        
        {/* {errors.exampleRequired && <span>This field is required</span>} */}
      </form>

      <Editor
        apiKey='pw415ny3smjyx0vg2xmgrt55dtzgzjyaqbfzf752nuwwfma5'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
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
      <div className="submitButton mt-4" onClick={submitForm}>
        <FullButton text={mainBtn} />
      </div>


    </div>
  )
}

export default AddPost