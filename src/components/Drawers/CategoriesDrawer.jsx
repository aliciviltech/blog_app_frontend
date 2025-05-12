import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

const CategoriesDrawer = ({closeAllDrawers}) => {
    // const catList = ['travel', 'health', 'technology', 'food', 'entertainment']

    const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs)
    const allCategories = allBlogsRedux?.map((blog) => blog.category)
    const categoriesList = [...new Set(allCategories)].sort()


    return (
        <div className='CategoriesDrawer'>
            <ul className='lg:absolute top-full left-0 bg-black text-white m-2 border-l border-white lg:border-none p-4 flex flex-col gap-2'>
                {
                    categoriesList?.map((cat,index)=>{
                        return(
                            <li key={index} className='hover:text-[var(--primaryColor)]'>
                                <Link to={`/categories/${cat}`} className='flex' onClick={closeAllDrawers} >{cat.slice(0,1).toUpperCase()+cat.slice(1)}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CategoriesDrawer