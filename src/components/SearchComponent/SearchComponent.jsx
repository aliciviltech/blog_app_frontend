import { Search } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SearchComponent = () => {

  // ======================== redux values =======================
  const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs)
  const dispatch = useDispatch()



  return (
    <div className="search w-full sm:absolute sm:top-[60px] lg:static left-0 md:w-screen lg:w-fit flex bg-[#F5F5F5] p-4 py-3.5 rounded-[12px]">
      <input type="text" className='w-full bg-transparent outline-none px-1' placeholder='Search Anything' />
      <Search size={20} />
    </div>
  )
}

export default SearchComponent