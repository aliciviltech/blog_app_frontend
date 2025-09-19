import React from 'react'
import { ArrowRight, Instagram, Mail, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router'
import FitButton from '../Buttons/FitButton'
import PrimaryBullets from '../bullets/PrimaryBullets'
import CommentCards from '../Cards/CommentCards'
import { CommentCardsData } from './FooterData'
import { useEffect } from 'react'
import { getReq } from '../../api/axios'
import { useState } from 'react'
import IconContainer from '../icon-container/IconContainer'

const Footer = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await getReq('/auth/get-users');
                setUsers(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    }, [])


    return (
        <div className='footer bg-white dark:bg-black dark:text-white '>
        <div className='flex flex-col-reverse xl:flex-row max-w-[1300px] mx-auto px-2 py-12 sm:px-0'>


            {/* ================================ left portion ================================ */}
            <div className='xl:w-1/2 p-4 mt-10 md:mt-0 md:p-10 bg-[var(--bgPrimary)] dark:bg-black flex flex-wrap justify-between gap-10 rounded-r-[50px]'>

                {/* main text area */}
                <div className=" main flex flex-wrap flex-col md:flex-row justify-between  gap-6">
                    <div className="md:w-[50%] leftCol flex flex-col justify-between gap-6">
                        <div className='social-network flex flex-col gap-3'>
                            <h1 className='H4 flex items-center gap-2'> <PrimaryBullets /> Mega News</h1>
                            <p className='text-justify P2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin</p>
                        </div>
                        <div className='social-network flex flex-col gap-3'>
                            <h1 className='H4 flex items-center gap-2'> <PrimaryBullets />News Letter</h1>
                            <div className="input w-full bg-white dark:bg-black dark:border border-gray-600 p-2 rounded-lg flex justify-between">
                                <input type="text" placeholder='write your email' className='outline-none dark:bg-black' />
                                <Mail fill='gray' className='dark:text-black' />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[30%] rightCol flex flex-col justify-between gap-4">
                        <div className='categories flex flex-col gap-3'>
                            <h1 className='H4 flex items-center gap-2 '> <PrimaryBullets />Categories</h1>
                            <div className='flex flex-col gap-3 ml-3'>
                                <Link to={''} className='P2'>Culture</Link>
                                <Link to={''} className='P2'>Fashion</Link>
                                <Link to={''} className='P2'>Featured</Link>
                                <Link to={''} className='P2'>Food</Link>
                                <Link to={''} className='P2'>Healty living</Link>
                                <Link to={''} className='P2'>Techonology</Link>
                            </div>
                        </div>
                        <div className='social-network flex flex-col gap-3'>
                            <h1 className='H4 flex items-center gap-2'> <PrimaryBullets />Socail Network</h1>
                            <div className="input w-fit bg-white dark:bg-secondaryDarkBg p-2 rounded-lg flex gap-2">
                                <div className='p-2 rounded-md border border-gray-300 hover:bg-red-500 cursor-pointer hover:scale-[1.05] transition-all hover:text-white'>
                                    <Instagram size={16} />
                                </div>
                                <div className='p-2 rounded-md border border-gray-300 hover:bg-blue-500 cursor-pointer hover:scale-[1.05] transition-all hover:text-white'>
                                    <Twitter size={16} />
                                </div>
                                <div className='p-2 rounded-md border border-gray-300 hover:bg-red-600 cursor-pointer hover:scale-[1.05] transition-all hover:text-white'>
                                    <Youtube size={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* bottom line */}
                <div className='P2 w-full h-fit py-2 px-4 flex flex-wrap gap-2 justify-center md:justify-between bg-[var(--bgSecondary)] dark:bg-secondaryDarkBg xl:rounded-r-2xl'>
                    <p>Privacy Policy | Terms & Conditions</p>
                    <p>All copyright {"(C)"} 2022 Reserved</p>
                </div>

            </div>

            {/* ================================ right portion ================================ */}
            <div className='xl:w-1/2 flex flex-wrap gap-4 p-4 md:p-10'>
                {/* col-1 */}
                <div className="col1 xl:w-[45%] flex flex-wrap flex-col gap-4">
                    <h1 className='H4 flex items-center gap-2'> <PrimaryBullets /> New Comments</h1>
                    <div className="cards flex flex-wrap xl:flex-col gap-2">
                        {
                            CommentCardsData.map((comment, index) =>
                                <CommentCards className={'w-full md:w-[250px]'} key={index} comment={comment} />
                            )
                        }
                    </div>
                </div>

                {/* col-2 */}
                <div className='col2 xl:w-1/2 flex flex-col gap-4 mt-10 sm:mt-0'>
                    <h1 className='H4 flex items-center gap-2'> <PrimaryBullets /> Follow on instagram</h1>
                    <div className='flex flex-wrap gap-4'>
                        {
                            users?.map((user, index) => {
                                if (user.user_image) {
                                    return <img src={user.user_image} alt="" width={60} className='rounded-lg cursor-pointer' />
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer