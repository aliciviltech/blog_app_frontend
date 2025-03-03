import React from 'react'
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
import Data from './components/Data/Data'
import AllPosts from './pages/UserDashboard/AllPosts/AllPosts'
import BlogDetail from './pages/BlogDetail/BlogDetail'
import EditPost from './pages/UserDashboard/EditPost/EditPost'
import CategoryPage from './pages/CategoryPage/CategoryPage'

const App = () => {
  console.log('this is logged in app compoenent')
  return (
    <div>
      <Data/>
      <Toaster />
      <Routes>
        {/* {
          routes.map((route)=>{
            return(
              <Route key={route.id} path={route.path} element={route.element} />
            )
          })
        } */}

        <Route path='/' element={<Home/>} />

        <Route path='/user-dashboard' element={<UserDashboard/>}>
          <Route path='/user-dashboard/my-posts' element={<MyPosts/>} />
          <Route path='/user-dashboard/add-post' element={<AddPost/>} />
          <Route path='/user-dashboard/marked-posts' element={<MarkedPosts/>} />
          <Route path='/user-dashboard/all-posts' element={<AllPosts/>} />
          <Route path='/user-dashboard/edit-post' element={<EditPost/>} />
          </Route>

        <Route path='/register-login' element={<Register_Login/>} />
        <Route path='/:id' element={<BlogDetail/>} />
        <Route path='categories/:cat' element={<CategoryPage/>} />

        <Route path='*' element={<PageNotFound/>} />



      </Routes>
    </div>
  )
}

export default App