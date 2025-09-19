import React from 'react'
import Header from '../../components/Header/Header'
import { Tabs } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import MyPostsAdmin from './MyPostsAdmin/MyPostsAdmin'
import AddPostAdmin from './AddPostAdmin/AddPostAdmin'
import MarkedPostsAdmin from './MarkedPostsAdmin/MarkedPostsAdmin'
import AllPosts from './AllPosts/AllPosts'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {

    const navigate = useNavigate();

    const {allBlogs, loading} = useSelector(state=> state.blogReducer)

    // ============ setting active tab from location ===============
    const location = useLocation();
    const nestedRoute = location.pathname.replace('/user-dashboard/','')
    const defaultActiveTab = nestedRoute == 'my-posts'? '1' : nestedRoute == 'add-post'? '2': nestedRoute == 'marked-posts'? '3' : '000';
    console.log(defaultActiveTab)

    // ============ setting location as per active tab ===============
    const handleTabChange = (key)=>{
        const endPoint = key == '1'? 'my-posts' : key == '2'? 'add-post' : key=='3'? 'marked-posts' : key=='4'? 'all-posts' : '000000000000'
        navigate(`/admin-dashboard/${endPoint}`);
    }

    if(loading) return 'Loading...'

    return (
        <>
            <Header />
            <div className='AdminDashboard w-[90%] mx-auto'>

                <div className="profileImage relative w-full h-40 flex items-center justify-center">
                    <img className='coverImage w-full h-full object-cover' src="/images/profile/empty_cover.png" alt="" />
                    <img className='userImage w-28 h-28 rounded-full border border-black absolute sm:left-10  object-cover' src="/images/profile/empty_user.png" alt="" />
                </div>

                <Tabs
                    onChange={handleTabChange}
                    defaultActiveKey={defaultActiveTab}
                    items={[
                        {
                            label: 'My Posts',
                            key: '1',
                            children: <MyPostsAdmin/>,
                        },
                        {
                            label: 'Add Post',
                            key: '2',
                            children: <AddPostAdmin/>
                        },
                        {
                            label: 'Marked Posts',
                            key: '3',
                            children: <MarkedPostsAdmin/>,
                        },
                        {
                            label: 'All Posts',
                            key: '4',
                            children: <AllPosts/>,
                        },
                    ]}

                    className=' flex justify-center items-center'
                />

            </div>
        </>
    )
}

export default AdminDashboard