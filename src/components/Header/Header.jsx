import { ChevronDown, MenuIcon, Search } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../../redux/reducers/userReducer';
import FitButton from '../Buttons/FitButton';
import PagesDrawer from '../Drawers/PagesDrawer';
import CategoriesDrawer from '../Drawers/CategoriesDrawer';

const Header = () => {

  const navigate = useNavigate()
  const drawerRef = useRef(null)
  const menuBarsRef = useRef(null)
  const userDrawerRef = useRef(null)


  // =================== active user from redux ===================
  const activeUserRedux = useSelector(state => state.userReducer.activeUser)
  const dispatch = useDispatch()

  // ========== handle logout ===========
  const handleLogout = () => {
    dispatch(clearUser())
    localStorage.clear('user')
    toast('Logout successful')
    navigate('/')
  }



  // ================== navigaton bar drawers ===================

  const closeAllDrawers = () => {
    setShowDrawer({
      categories: false,
      pages: false,
    })
  }




  // ===================================== all drawers ====================================

  // menu bar
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }
  // navigation anchor drawerrs
  const [showDrawer, setShowDrawer] = useState({
    categories: false,
    pages: false,
  })
  const showDrawersF = (drawer) => {
    setShowDrawer(prevState => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = key === drawer ? !prevState[drawer] : false;
        return acc;
      }, {});
      return newState;
    });
  }
  // user drawer
  const [userDrawer, setUserDrawer] = useState(false);
  const handleUserDrawer = () => {
    setUserDrawer(!userDrawer)
  }


  // closing drawers on click and scroll
  const closeDrawers = (event) => {
    console.log(showMenu, showDrawer, userDrawer)
    if (userDrawer && !userDrawerRef.current.contains(event.target)) {
      setUserDrawer(false)
    }
    else if (!menuBarsRef.current.contains(event.target) && !drawerRef.current.contains(event.target)) {
      setShowMenu(false);
      setShowDrawer({
        categories: false,
        pages: false,
      })
    } else if (menuBarsRef.current.contains(event.target) || drawerRef.current.contains(event.target) || !userDrawerRef.current.contains(event.target)) {
      setUserDrawer(false)
    }
  }
  useEffect(() => {
    if (showDrawer.categories == true || showDrawer.pages == true || showMenu || userDrawer) {
      document.addEventListener('click', closeDrawers);
      document.addEventListener('scroll', closeDrawers);
      return () => {
        document.removeEventListener('click', closeDrawers);
        document.removeEventListener('scroll', closeDrawers);
      }
    }
  }, [showDrawer, showMenu, userDrawer])



  return (
    <div className='Header select-none relative sm:mb-[70px] mb-[30px] lg:mb-[30px] px-2 flex lg:gap-10 justify-between items-center mt-8 max-w-[1300px] mx-auto'>

      {/* ======================== left side =============================== */}
      <div className="leftSide grow-[1] lg:w-[50%] flex gap-6 items-center">

        {/* menubars */}
        <div ref={menuBarsRef} className="menuBars lg:hidden" onClick={handleShowMenu}>
          <MenuIcon />
        </div>

        {/* logo */}
        <div className="logo hidden text-[22px] font-bold sm:block cursor-pointer" onClick={() => navigate('/')}>
          <span className='text-[var(--secondaryColor)]'>Baitul</span>Blog
        </div>

        {/* navigation bar */}
        <div ref={drawerRef} className={`navbar H5 ${showMenu ? 'left-0' : 'left-[-300px]'} rounded-lg flex flex-col transition-all duration-700 delay-0 absolute top-[60px] bg-white shadow-lg lg:static z-20 p-10 lg:p-0 lg:bg-transparent lg:shadow-none  lg:flex-row gap-4 ml-auto`}>
          <div className='categories relative flex flex-col  lg:items-center'>
            <div className='flex items-center cursor-pointer' onClick={() => showDrawersF('categories')}>Categories <ChevronDown className='black50' size={20} /></div>
            {showDrawer.categories && <CategoriesDrawer closeAllDrawers={closeAllDrawers} />}
          </div>
          <div className='pages relative flex flex-col  lg:items-center'>
            <div className='flex items-center cursor-pointer' onClick={() => showDrawersF('pages')}>Pages<ChevronDown className='black50' size={20} /></div>
            {showDrawer.pages && <PagesDrawer />}
          </div>
          <Link to={''}>Contact Us</Link>
          <Link to={''}>About Us</Link>
        </div>
      </div>

      {/* ======================== right side =============================== */}
      <div className="rightSide grow-[9] sm:grow-[0] lg:w-[40%] flex gap-6 items-center justify-between">

        {/* search bar */}
        <div className="search w-full sm:absolute sm:top-[60px] lg:static left-0 md:w-screen lg:w-fit flex bg-[#F5F5F5] p-4 py-3.5 rounded-[12px]">
          <input type="text" className='w-full bg-transparent outline-none px-1' placeholder='Search Anything' />
          <Search size={20} />
        </div>

        {/* user info */}
        {
          activeUserRedux.name ?
            <div ref={userDrawerRef} className="user relative sm:flex gap-2 items-center cursor-pointer" onClick={handleUserDrawer} >
              {
                activeUserRedux.user_image ?
                  <img className='rounded-lg w-12 h-12 object-cover' src={activeUserRedux.user_image} alt='userImage' />
                  :
                  <div className='w-8 h-8 rounded-md bg-orange-500 text-white flex justify-center items-center '>{activeUserRedux.name.slice(0, 1).toUpperCase()}</div>
              }
              <p className='H5 hidden sm:block'>{activeUserRedux.name}</p>
              <ChevronDown className=' hidden sm:block' />
              <div className={`drawer ${!userDrawer ? 'hidden' : 'flex'} z-10 w-32 p-4 bg-white shadow-2xl absolute top-14 right-0 sm:left-0 flex-col gap-2 items-center`}>
                <Link to='/user-dashboard/my-posts' className='hover:text-primary'>Dashboard</Link>
                <button className='hover:text-primary' onClick={handleLogout}>Logout</button>
              </div>
            </div>
            :
            <div className="loginBtn w-fit" onClick={() => navigate('/register-login?tab=login')}><FitButton text={'Login'} /></div>

        }
      </div>
    </div>
  )
}

export default Header