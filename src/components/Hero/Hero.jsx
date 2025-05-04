import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Hero.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const Hero = () => {
    // ================ get all blogs from redux ================
    const skeletonArray = [1, 2, 3];
    const [allBlogs, setAllBlogs] = useState(skeletonArray)
    const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs)
  console.log('all hero blogs from redux', allBlogsRedux)

    useEffect(() => {
        allBlogsRedux?.length>0 && setAllBlogs(allBlogsRedux)
    }, [allBlogsRedux])

    // =================== navigate to id =================
    const navigate = useNavigate()
    const navigateToId = (id) => {
        navigate(`/${id}`)
    }


    return (
        <>
            <div className='Hero'>

                {
                    allBlogs.slice(0, 3).map((blog) => {
                        console.log("Blog Title:", blog.title);

                        return (
                            <div className="imageContainer cursor-pointer" onClick={ () => {blog.title && navigateToId(blog._id)}}>
                                {
                                    blog.title ?
                                    <>
                                        <img className='image' src={blog.thumbnail} alt='image1' />
                                        <div className="text">
                                            <h3 className='H4'>{blog.title}</h3>
                                            <p>{blog.summary}...</p>
                                        </div>
                                    </>
                                    :
                                    <Skeleton highlightColor='#cccccc'  containerClassName='skeletonContainer' className='skeleton' />
                                }
                            </div>
                        )
                    })
                }
            </div>

        </>
    )
}

export default Hero