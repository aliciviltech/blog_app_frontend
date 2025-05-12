import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import Header from '../../components/Header/Header';
import PrimaryCard from '../../components/Cards/PrimaryCard';
import SecondaryCard from '../../components/Cards/SecondaryCard';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import SecondaryLoader from '../../components/Loader/SecondaryLoader';

const CategoryPage = () => {

  const { cat } = useParams();


  // ============ redux methods =================
  const dispatch = useDispatch();
  const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs)
  console.log(allBlogsRedux)
  const categoryBlogs = allBlogsRedux?.filter((blog) => blog.category == cat)
  console.log(categoryBlogs)
  return (
    <>
      <Header />
      <Breadcrumb />
      {
        cat ?
          <div className="blogsContainer mt-10 flex flex-col items-center gap-6">
            {
              categoryBlogs.length > 0 ?
                categoryBlogs?.map((blog,index) => {
                  return (
                    <SecondaryCard key={index} blog={blog} />
                  )
                })
                :
                <SecondaryLoader />
            }
          </div>
          :
          <div>All categories</div>
      }
    </>
  )
}

export default CategoryPage