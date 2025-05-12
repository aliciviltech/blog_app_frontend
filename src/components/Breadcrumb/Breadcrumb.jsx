import { ChevronRight, Tally1 } from 'lucide-react';
import React from 'react'
import { Link, useLocation, useSearchParams } from 'react-router';

const Breadcrumb = () => {

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');


    return (
        <div className='p-2'>
            <ul className='w-fit flex items-center text-[clamp(12px,2vw,16px)]'>
                <li className='flex underline'>
                    <ChevronRight className='w-[16px] sm:w-[30px]' /><Link to="/">Home</Link>
                </li>

                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    return (
                        <div key={index} className='flex items-center'>
                            <li key={to}  className='sm:px-2 py-1 flex underline '>
                                <ChevronRight className='w-[16px] sm:w-[30px]' /> 
                                {
                                    value != 'read-blog' ? <Link to={to}>{decodeURIComponent(value)}</Link>
                                    : <p>{decodeURIComponent(value)}</p>
                                }
                            </li>
                        </div>
                    );
                })}
            </ul>
        </div>
    )
}

export default Breadcrumb