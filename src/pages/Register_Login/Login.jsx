import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getReq, postReq } from '../../api/axios';
import { clearUser, setUserLoading, storeUser } from '../../redux/reducers/userReducer';
import { storeBlogs } from '../../redux/reducers/blogReducer';
import GoogleSignin from '../../components/Buttons/GoogleSignin';
import FullButton from '../../components/Buttons/FullButton';


const Login = () => {

    const [mainBtn, setMainBtn] = useState('Login')

    // =========== navigate =========
    const navigate = useNavigate();

    // ============ redux functions ==========
    const dispatch = useDispatch()
    const activeUserRedux = useSelector(state => state.userReducer?.activeUser)
    console.log(activeUserRedux)


    // ============ Api ==============
    const handleLogin = async (data) => {
        setMainBtn('Loading...')
        try {
            const response = await postReq('/auth/login', data)
            // toast.success('Login successful')
            toast.success('Login Success')
            console.log('login success')
            setMainBtn('Login')

            dispatch(storeUser(response.data.user))
            dispatch(setUserLoading(false))
            // navigate('/user-dashboard/my-posts')
            navigate(-1)

        } catch (error) {
            console.log('Error in login:', error.message)
            // toast.error(error.message)
            toast.error(error.message)
            setMainBtn('Login')
        }
    }

    // ========== handle logout ===========
    const handleLogout = () => {
        dispatch(clearUser())
        dispatch(setUserLoading(true))
        toast.success('Logout successful')
        // dataBaseBlogs()
    }

    // ============ hook form ==============
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => handleLogin(data)


    return (
        <div className='Login dark:text-white'>

            {
                activeUserRedux?.name ?
                    <p>{activeUserRedux.name} is already logged in. <span className='underline text-blue-600 cursor-pointer' onClick={handleLogout}>Logout</span></p>
                    :
                    <form className='flex flex-col gap-2 ' onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("email", { required: true })} placeholder='Email' className='p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-primaryDarkBg' />
                        <input {...register("password", { required: true })} placeholder='Password' type='password' className='p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-primaryDarkBg' />
                        {/* {errors.exampleRequired && <span>This field is required</span>} */}
                        {/* <input type="submit" value={mainBtn} className='cursor-pointer bg-[var(--primaryColor)] p-2 rounded-md text-white border-none active:scale-[0.95] transition-all' /> */}
                        <FullButton type='submit' text={mainBtn}/>
                        <div>
                            <GoogleSignin text={'Signin with Google'} />
                        </div>
                    </form>
            }

        </div>
    )
}

export default Login