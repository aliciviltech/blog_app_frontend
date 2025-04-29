import React from 'react'
import { Link } from 'react-router'

const CategoriesDrawer = ({closeAllDrawers}) => {
    const catList = ['travel', 'health', 'technology', 'food', 'entertainment']
    return (
        <div className='CategoriesDrawer'>
            <ul className='lg:absolute top-full left-0 bg-white shadow-lg p-4 flex flex-col gap-2'>
                {
                    catList.map((cat)=>{
                        return(
                            <li className='hover:text-[var(--primaryColor)]'>
                                <Link to={`/categories/${cat}`} className='flex' onClick={closeAllDrawers} >{cat.slice(0,1).toUpperCase()+cat.slice(1)}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CategoriesDrawer