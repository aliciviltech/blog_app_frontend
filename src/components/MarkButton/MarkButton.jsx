import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getReq, putReq } from '../../api/axios'
import { storeBlogs } from '../../redux/reducers/blogReducer'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import SpinnerLoader from '../Loader/SpinnerLoader'

const MarkButton = ({ blog, size = 'small' }) => {

    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)

    // ================= active user redux ====================
    const activeUserRedux = useSelector(state => state.userReducer.activeUser)

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
            try {
                setLoader(true)
                if (marked) {
                    await putReq(`/blogs/update-blog/${blog._id}`, { $pull: { marked_by: { user_id: activeUserRedux._id } } })
                    await dataBaseBlogs()
                    setMarked(false)
                    setLoader(false)
                    console.log('Removed')
                } else {
                    await putReq(`/blogs/update-blog/${blog._id}`, { $addToSet: { marked_by: { user_id: activeUserRedux._id } } })
                    await dataBaseBlogs()
                    setMarked(true)
                    setLoader(false)
                    console.log('Marked')
                }
            } catch (error) {
                setLoader(false)
                console.log(error)
            }
        } else {
            e.stopPropagation();
            toast.error('Please login to save blogs')
        }
    }

    useEffect(() => {
        !activeUserRedux._id && setMarked(false)
    }, [activeUserRedux])


    return (
        <div className='w-fit text-[16px] cursor-pointer' onClick={handleMark}>
            {
                size == 'small' &&
                <>
                    {
                        loader ? <SpinnerLoader />
                            :
                            <>
                                {
                                    marked ?

                                        <div title='Un Mark Blog'><BookmarkCheck color='#42f581' size='30px' onClick={handleMark} /></div>
                                        :
                                        <div title='Mark Blog'><Bookmark onClick={handleMark} /></div>
                                }
                            </>
                    }
                </>

            }
            {
                size == 'large' &&
                <>
                    {
                        marked ?
                            <div className='bg-black text-white px-4 py-2 rounded-md flex gap-2 cursor-pointer items-center' title='Un Mark Blog'>
                                {
                                    loader ? 'discarding...'
                                    : <> Unsave <BookmarkCheck color='#42f581' size='25px' onClick={handleMark} /> </>
                                }
                            </div>
                            :
                            <div className='bg-black text-white px-4 py-2 rounded-md flex gap-2 cursor-pointer items-center' title='Un Mark Blog'>
                                {
                                    loader ? 'saving...'
                                    : <> Save  <Bookmark size='30px' onClick={handleMark} /> </>
                                }
                            </div>
                    }
                </>

            }
        </div>
    )
}

export default MarkButton