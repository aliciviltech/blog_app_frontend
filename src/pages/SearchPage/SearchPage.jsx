import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Header from '../../components/Header/Header'
import { getReq } from '../../api/axios'
import toast from 'react-hot-toast'
import SecondaryCard from '../../components/Cards/SecondaryCard'
import SecondaryLoader from '../../components/Loader/SecondaryLoader'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}


const SearchPage = () => {

  const [loader, setLoader] = useState(true)
  const query = useQuery().get('query')
  const [blogs, setBlogs] = useState([])
  const searchBlogs = async () => {
    try {
      setLoader(true)
      const response = await getReq(`/blogs/search-blogs?search=${query}`)
      setLoader(false)
      setBlogs(response.data)
    } catch (error) {
      console.log(error.message)
      setLoader(false)
    }
  }
  useEffect(() => {
    searchBlogs()
  }, [query])





  return (
    <>
      <Header />
      <div className="searchPage pagePadding">
        <h1 className='my-10'>Search results for: <span className='font-bold'>{query}</span> </h1>
        {
          loader ?
            <SecondaryLoader />
            :
            <div className="blogs flex flex-wrap gap-4 justify-center">
              {
                blogs.length == 0 ?
                  <p>No blogs found</p>
                  :
                  blogs.map((blog, index) =>
                    <div key={index}>
                      <SecondaryCard blog={blog} />
                    </div>
                  )
              }
            </div>
        }
      </div>
    </>
  )
}

export default SearchPage