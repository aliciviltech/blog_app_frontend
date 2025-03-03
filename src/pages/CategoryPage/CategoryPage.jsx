import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import Header from '../../components/Header/Header';
import PrimaryCard from '../../components/Cards/PrimaryCard';
import SecondaryCard from '../../components/Cards/SecondaryCard';

const CategoryPage = () => {

  const {cat} = useParams();
  

  // ============ redux methods =================
  const dispatch = useDispatch();
  const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs)
  console.log(allBlogsRedux)
  const categoryBlogs = allBlogsRedux?.filter((blog)=>blog.category == cat)
  console.log(categoryBlogs)
  return (
    <>
    <Header/>
    <div>CategoryPage {cat}</div>
    <div className="blogsContainer mt-10 flex flex-col items-center gap-6">
      {
        categoryBlogs?.map((blog)=>{
          return(
            <SecondaryCard blog={blog} />
          )
        })
      }
    </div>
    </>
  )
}

export default CategoryPage