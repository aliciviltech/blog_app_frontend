import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import { Tabs } from 'antd'
import MyPosts from './MyPosts/MyPosts'
import AddPost from './AddPost/AddPost'
import { useLocation, useNavigate } from 'react-router'
import MarkedPosts from './MarkedPosts/MarkedPosts'
import { putReq } from '../../api/axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { storeUser } from '../../redux/reducers/userReducer'
import AllPosts from './AllPosts/AllPosts'
import { storeBlogs } from '../../redux/reducers/blogReducer'

const UserDashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    // ============ get all blogs from redux ==============
    const allBlogsRedux = useSelector(state=>state.blogReducer.allBlogs);

    // ============ get user data from redux ==============
    const activeUserRedux = useSelector(state=>state.userReducer.activeUser);

    // ============ update user profile ============
    const updateUserData = async (data) => {
        try {
            await putReq(`/auth/user_update/${activeUserRedux._id}`, data)
            await putReq(`/blogs/update-many/`, { 
                user_id: activeUserRedux._id, 
                data: { user_image: data.user_image,} 
            })
            dispatch(storeUser(data))
            dispatch(storeBlogs(allBlogsRedux))
            toast.success('User data updated successfully')
        } catch (error) {
            toast.error(error.message)
        }
    }
    // ============ update user image ============
    const [userImage, setUserImage] = useState('');
    const updateUserImage = (e) => {
        const img = e.target.files[0]
        const fileReader = new FileReader();
        fileReader.readAsDataURL(img);
        fileReader.onload = () => {
            setUserImage(fileReader.result)
            console.log(fileReader.result)
            updateUserData({...activeUserRedux, user_image:fileReader.result});
        }
    }

    // ============ setting active tab from location ===============
    const location = useLocation();
    const nestedRoute = location.pathname.replace('/user-dashboard/', '')
    const defaultActiveTab = nestedRoute == 'my-posts' ? '1' : nestedRoute == '' ? '1' : nestedRoute == 'add-post' ? '2' : nestedRoute == 'marked-posts' ? '3' : nestedRoute == 'all-posts' ? '4': '';
    console.log(defaultActiveTab)

    // ============ setting location as per active tab ===============
    const handleTabChange = (key) => {
        const path = key == '1' ? 'my-posts' : key == '2' ? 'add-post' : key == '3' ? 'marked-posts' : 'all-posts'
        navigate(`/user-dashboard/${path}`);
    }


    // ========================== tab items =================================
    const items = [
        {
            label: 'My Posts',
            key: '1',
            children: <MyPosts />,
        },
        {
            label: 'Add Post',
            key: '2',
            children: <AddPost />
        },
        {
            label: 'Marked Posts',
            key: '3',
            children: <MarkedPosts />,
        }
    ]

    if(activeUserRedux.name === 'admin'){
        items.push({
            label: 'All Posts',
            key: '4',
            children: <AllPosts/>,
        })
    }

    return (
        <>
            <Header />

            {
                activeUserRedux._id ?

            <div className='UserDashboard w-[100%] mx-auto'>

                <div className="profileImage relative w-full h-40 flex items-center justify-center">
                    <img className='coverImage w-full h-full object-cover' src="/images/profile/empty_cover.png" alt="" />
                    <div className="group flex items-center justify-center  w-28 h-28 rounded-full overflow-hidden border border-black absolute sm:left-10">
                        {
                            activeUserRedux.user_image ?
                                <img className='w-28 h-28  object-cover' src={activeUserRedux.user_image} alt="" />
                                :
                                <img className='w-28 h-28  object-cover' src="/images/profile/empty_user.png" alt="" />
                        }
                        <div className="opacity-0 group-hover:opacity-70 transition-opacity cursor-pointer z-10 w-full h-full flex justify-center items-center absolute bg-black text-white " onClick={()=>document.getElementById('fileInput').click()}>Upload</div>
                    </div>
                    <input type="file" className='hidden' accept='image/*' id='fileInput' onChange={updateUserImage} />
                </div>

                <Tabs
                    onChange={handleTabChange}
                    activeKey={defaultActiveTab}
                    items={items}

                    className=' flex justify-center items-center'
                />

            </div>

            :
            <h1 className='text-center mt-20 black50'> Please login to proceed</h1>
}
        </>
    )
}

export default UserDashboard