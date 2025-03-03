import React from 'react'
import { Link } from 'react-router'

const CategoriesDrawer = () => {
    return (
        <div className='CategoriesDrawer'>
            <ul className='lg:absolute top-full left-0 bg-white shadow-lg p-4 flex flex-col gap-2'>
                <li className='hover:text-[var(--primaryColor)]'><Link to={`/categories/travel`}>Travel</Link></li>
                <li className='hover:text-[var(--primaryColor)]'><Link to={'/categories/health'}>Health</Link></li>
                <li className='hover:text-[var(--primaryColor)]'><Link to={'/categories/technology'}>Technology</Link></li>
                <li className='hover:text-[var(--primaryColor)]'><Link to={'/categories/food'}>Food</Link></li>
                <li className='hover:text-[var(--primaryColor)]'><Link to={'/categories/entertainment'}>Entertainment</Link></li>
            </ul>
        </div>
    )
}

export default CategoriesDrawer