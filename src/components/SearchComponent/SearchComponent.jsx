import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReq } from '../../api/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const SearchComponent = () => {

  const navigate = useNavigate()
  
  // ======================== redux values =======================
  const allBlogsRedux = useSelector(state => state.blogReducer.allBlogs)
  const dispatch = useDispatch()

  // ========== handle input ==============
  const [input, setInput]=useState('');
  const handleInput = (e)=>{
    setInput(e.target.value)
  }
 
  const handleSearch = (e)=>{
    if(e.key=='Enter' && input.trim()){
      navigate(`/search-page?query=${input}`)
    }
    if(!e.key && input.trim()){
      navigate(`/search-page?query=${input}`)
    }
  }



  return (
    <div className="search w-full absolute top-[60px] lg:static left-0 md:w-screen lg:w-fit flex bg-[#F5F5F5] p-4 py-3.5 rounded-[12px]">
      <input type="text" className='w-full bg-transparent outline-none px-1' placeholder='Search blog or author' value={input} onChange={handleInput} onKeyDown={handleSearch} />
      <Search size={20} onClick={handleSearch} />
    </div>
  )
}

export default SearchComponent