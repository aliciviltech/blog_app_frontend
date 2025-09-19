import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router'
import { routes } from './routes/routes'
import UserDashboard from './pages/UserDashboard/UserDashboard'
import MyPosts from './pages/UserDashboard/MyPosts/MyPosts'
import AddPost from './pages/UserDashboard/AddPost/AddPost'
import MarkedPosts from './pages/UserDashboard/MarkedPosts/MarkedPosts'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import MyPostsAdmin from './pages/AdminDashboard/MyPostsAdmin/MyPostsAdmin'
import AddPostAdmin from './pages/AdminDashboard/AddPostAdmin/AddPostAdmin'
import MarkedPostsAdmin from './pages/AdminDashboard/MarkedPostsAdmin/MarkedPostsAdmin'
import Register_Login from './pages/Register_Login/Register_Login'
import { Toaster } from 'react-hot-toast'
import { Slide, ToastContainer } from 'react-toastify'
import Data from './components/Data/Data'
import AllPosts from './pages/UserDashboard/AllPosts/AllPosts'
import BlogDetail from './pages/BlogDetail/BlogDetail'
import EditPost from './pages/UserDashboard/EditPost/EditPost'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import CategoriesList from './pages/CategoryPage/CategoriesList'
import PopularPosts from './pages/PopularPosts/PopularPosts'
import { useDispatch, useSelector } from 'react-redux'
import AllPostsPage from './pages/AllPostsPage/AllPostsPage'
import SearchPage from './pages/SearchPage/SearchPage'
import { setBlogLoading } from './redux/reducers/blogReducer'
import Footer from './components/Footer/Footer'

const App = () => {

  const dispatch = useDispatch()

  // ======================= redux functions ===========================
  const AllBlogsRedux = useSelector(state => state.blogReducer?.allBlogs);
  const activeUserRedux = useSelector(state => state.userReducer?.activeUser)

  useEffect(()=>{
    if(AllBlogsRedux?.length>0){
      dispatch(setBlogLoading(false))
    }
  },[])

  return (
    <div>
      {
        (AllBlogsRedux?.length === 0 || Object.keys(activeUserRedux || {}).length === 0) &&
        <Data />
      }
      {/* <Toaster /> */}
      <ToastContainer position='top-center' transition={Slide} autoClose={2000} />
      <Routes>
        {/* {
          routes.map((route)=>{
            return(
              <Route key={route.id} path={route.path} element={route.element} />
            )
          })
        } */}

        <Route path='/' element={<Home />} />

        <Route path='/user-dashboard' element={<UserDashboard />}>
          <Route path='/user-dashboard/my-posts' element={<MyPosts />} />
          <Route path='/user-dashboard/add-post' element={<AddPost />} />
          <Route path='/user-dashboard/marked-posts' element={<MarkedPosts />} />
          <Route path='/user-dashboard/all-posts' element={<AllPosts />} />
          <Route path='/user-dashboard/edit-post' element={<EditPost />} />
        </Route>

        <Route path='/register-login' element={<Register_Login />} />
        <Route path='/read-blog' element={<BlogDetail />} />
        <Route path='/categories/:cat' element={<CategoryPage />} />
        <Route path='/categories' element={<CategoriesList />} />
        <Route path='/popular-posts' element={<PopularPosts />} />
        <Route path='/all-posts' element={<AllPostsPage />} />
        <Route path='/search-page' element={<SearchPage />} />

        <Route path='*' element={<PageNotFound />} />



      </Routes>
      <Footer/>
    </div>
  )
}

export default App