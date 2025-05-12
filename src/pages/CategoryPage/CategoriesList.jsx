import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PrimaryCard from '../../components/Cards/PrimaryCard'
import { useNavigate } from 'react-router'
import SecondaryLoader from '../../components/Loader/SecondaryLoader'

const CategoriesList = () => {

    const navigate = useNavigate()

    const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs)
    const allCategories = allBlogsRedux?.map((blog) => blog.category)
    const categoriesList = [...new Set(allCategories)].sort()
    console.log(categoriesList)

    const categoryImages = {
        entertainment: '/images/categories/entertainment.jpg',
        health: '/images/categories/health.jpg',
        technology: '/images/categories/technology.jpg',
        travel: '/images/categories/travel.jpg',
    }

    return (
        <>
            <Header />
            <Breadcrumb />
            <div className='flex flex-wrap justify-center'>
                {   
                    categoriesList.length>0 ?
                    categoriesList.map((cat,index) => {
                        return (
                            <div key={index} className='PrimaryCard max-w-[300px] cursor-pointer' onClick={() => navigate(`/categories/${cat}`)}>
                                <div className="imageContainer w-full text-center">
                                    <img className='image w-full h-full object-cover rounded-lg' src={categoryImages[cat]} alt='cardImage' />
                                </div>
                                <h1 className='H5'>{cat.toUpperCase()}</h1>
                                {/* <p className='P2'>{blog.summary}</p> */}
                                {/* <AuthorTag authorImage={blog.user_image} authorName={blog.user_name} date={blog.blogDate} /> */}
                            </div>
                        )
                    })
                    :
                    <SecondaryLoader/>
                }
            </div>
        </>
    )
}

export default CategoriesList