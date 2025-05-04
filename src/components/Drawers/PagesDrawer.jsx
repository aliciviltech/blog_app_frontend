import React from 'react'
import { Link } from 'react-router'

const PagesDrawer = () => {
  return (
    <div className='PagesDrawer '>
        <ul className='whitespace-nowrap p-4 bg-white shadow-lg lg:absolute top-full left-0 flex flex-col gap-2'>
            <li className='hover:text-[var(--primaryColor)]'><Link to={'/'}>Home</Link></li>
            <li className='hover:text-[var(--primaryColor)]'><Link to={'/user-dashboard/my-posts'}>User Dashboard</Link></li>
            <li className='hover:text-[var(--primaryColor)]'><Link to={'/register-login'}>Account Login</Link></li>
        </ul>
    </div>
  )
}

export default PagesDrawer