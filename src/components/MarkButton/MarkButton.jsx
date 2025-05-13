import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getReq, putReq } from '../../api/axios'
import { storeBlogs } from '../../redux/reducers/blogReducer'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import toast from 'react-hot-toast'

const MarkButton = ({ blog, size = 'small' }) => {

    const dispatch = useDispatch()

    // ================= active user redux ====================
    const activeUserRedux = useSelector(state => state.userReducer.activeUser)
    console.log(activeUserRedux._id)

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
        blog?.marked_by.forEach((el) => {
            el.user_id == activeUserRedux._id && setMarked(true)
        })
    }
    useEffect(() => {
        showMarked()
    }, [])

    // =================== updating marked on data base =======================
    const handleMark = async (e) => {
        if (activeUserRedux._id) {
            e.stopPropagation();
            setMarked(!marked)
            try {
                marked ?
                    await putReq(`/blogs/update-blog/${blog._id}`, { $pull: { marked_by: { user_id: activeUserRedux._id } } })
                    :
                    await putReq(`/blogs/update-blog/${blog._id}`, { $addToSet: { marked_by: { user_id: activeUserRedux._id } } })
                await dataBaseBlogs()
            } catch (error) {
                console.log(error)
            }
        }else{
            e.stopPropagation();
            toast.error('Please login to save blogs')
        }
    }

    useEffect(()=>{
        !activeUserRedux._id && setMarked(false)
    },[activeUserRedux])


    return (
        <div className='w-fit text-[16px] cursor-pointer' onClick={handleMark}>
            {
                size == 'small' &&
                <>
                    {
                        marked ? <div title='Un Mark Blog'><BookmarkCheck color='#42f581' size='30px' onClick={handleMark} /></div>
                            : <div title='Mark Blog'><Bookmark onClick={handleMark} /></div>
                    }
                </>

            }
            {
                size == 'large' &&
                <>
                    {
                        marked ?
                            <div className='bg-black text-white px-4 py-2 rounded-md flex gap-2 cursor-pointer items-center' title='Un Mark Blog'>
                                Unsave <BookmarkCheck color='#42f581' size='25px' onClick={handleMark} />
                            </div>
                            :
                            <div className='bg-black text-white px-4 py-2 rounded-md flex gap-2 cursor-pointer items-center' title='Un Mark Blog'>
                                Save  <Bookmark size='30px' onClick={handleMark} />
                            </div>
                    }
                </>

            }
        </div>
    )
}

export default MarkButton