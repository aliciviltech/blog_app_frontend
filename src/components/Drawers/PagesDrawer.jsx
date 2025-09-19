import React from 'react'
import { Link } from 'react-router'

const PagesDrawer = ({className='h-0'}) => {
  return (
    <div className={`PagesDrawer lg:absolute top-full left-0 overflow-hidden transition-all duration-500 ${className}`}>
        <ul className='whitespace-nowrap p-4 bg-black dark:bg-primaryDarkBg text-white m-2 border-l border-white lg:border-none  flex flex-col gap-2'>
            <li className='hover:text-[var(--primaryColor)]'><Link to={'/'}>Home</Link></li>
            <li className='hover:text-[var(--primaryColor)]'><Link to={'/all-posts'}>All Posts</Link></li>
            <li className='hover:text-[var(--primaryColor)]'><Link to={'/popular-posts'}>Popular Posts</Link></li>
            <li className='hover:text-[var(--primaryColor)]'><Link to={'/user-dashboard/my-posts'}>User Dashboard</Link></li>
            <li className='hover:text-[var(--primaryColor)]'><Link to={'/register-login'}>Account Login</Link></li>
        </ul>
    </div>
  )
}

export default PagesDrawer