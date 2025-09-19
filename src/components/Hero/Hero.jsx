import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Hero.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import PrimaryLoader from '../Loader/PrimaryLoader'
import { Carousel } from 'antd'

const Hero = () => {
    // ================ get all blogs from redux ================
    const skeletonArray = [1, 2, 3];
    const [allBlogs, setAllBlogs] = useState(skeletonArray)
    const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs)
    useEffect(() => {
        allBlogsRedux?.length > 0 && setAllBlogs(allBlogsRedux)
    }, [allBlogsRedux])

    // =================== navigate to id =================
    const navigate = useNavigate()
    const navigateToId = (id) => {
        navigate(`/read-blog?id=${id}`)
    }

    // ===================  =================

    return (
        <>
            <div className='Hero'>
                {
                    allBlogs[0].title == undefined && <PrimaryLoader />
                }


                <div className="heroSection1">
                    {
                        allBlogs.slice(0, 2).map((blog, index) => {
                            return (
                                <div key={index} className="imageContainer cursor-pointer" onClick={() => { blog.title && navigateToId(blog._id) }}>
                                    {
                                        blog.title ?
                                            <>
                                                <img className='image' src={blog.thumbnail} alt='image1' />
                                                <span className="text">
                                                    <h3 className='H4'>{blog.title}</h3>
                                                    <p>{blog.summary}...</p>
                                                </span>
                                            </>
                                            :
                                            <Skeleton highlightColor='#cccccc' containerClassName='skeletonContainer' className='skeleton' />
                                    }
                                </div>
                            )
                        })
                    }
                </div>

                <div className="heroSection2">
                    <Carousel className='main-carousel' arrows infinite={true} autoplay pauseOnHover={false} slidesToShow={1}>

                        {
                            allBlogs.slice(2).map((blog,index) => {

                                if (blog.section == 'hero') {
                                    return (
                                            <div key={index} className="imageContainer cursor-pointer" onClick={() => { blog.title && navigateToId(blog._id) }}>
                                                {
                                                    blog.title ?
                                                        <>
                                                            <img className='image ' src={blog.thumbnail} alt='image1' />
                                                            <span className="text">
                                                                <h3 className='H4'>{blog.title}</h3>
                                                                <p>{blog.summary}...</p>
                                                            </span>
                                                        </>
                                                        :
                                                        <Skeleton highlightColor='#cccccc' containerClassName='skeletonContainer' className='skeleton' />
                                                }
                                            </div>
                                    )
                                }
                            })
                        }

                    </Carousel>
                </div>

            </div>

        </>
    )
}

export default Hero