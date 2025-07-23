import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getReq, postReq } from '../../api/axios';
import { clearUser, storeUser } from '../../redux/reducers/userReducer';
import { storeBlogs } from '../../redux/reducers/blogReducer';
import GoogleSignin from '../../components/Buttons/GoogleSignin';


const Login = () => {

    const [mainBtn, setMainBtn] = useState('Login')

    // =========== navigate =========
    const navigate = useNavigate();
   
    // ============ redux functions ==========
    const dispatch = useDispatch()
    const activeUserRedux = useSelector(state=>state.userReducer.activeUser)
    console.log(activeUserRedux)

    
    // ============ Api ==============
    const handleLogin = async(data)=>{
        setMainBtn('Loading...')
        try{
            const response = await postReq('/auth/login', data)
            toast.success('Login successful')
            console.log('login success')
            setMainBtn('Login')
    
            dispatch(storeUser(response.data.user))
            // navigate('/user-dashboard/my-posts')
            navigate(-1)

        }catch(error){
            console.log('Error in login:', error.message)
            toast.error(error.message)
            setMainBtn('Login')
        }
    }

    // ========== handle logout ===========
    const handleLogout = ()=>{
        dispatch(clearUser())
        toast('Logout successful')
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
        <div className='Login'>

                {
                    activeUserRedux.name ?
                    <p>{activeUserRedux.name} is already logged in. <span className='underline text-blue-600 cursor-pointer' onClick={handleLogout}>Logout</span></p>
                    :
                    <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("email",{required:true})}  placeholder='Email' className='p-2 border border-gray-300 rounded-md' />
                    <input {...register("password",{required:true})}  placeholder='Password' type='password' className='p-2 border border-gray-300 rounded-md' />
                    {/* {errors.exampleRequired && <span>This field is required</span>} */}
                    <input type="submit" value={mainBtn} className='cursor-pointer bg-[var(--primaryColor)] p-2 rounded-md text-white border-none active:scale-[0.95] transition-all' />
                    <div>
                        <GoogleSignin text={'Signin with Google'}/>
                    </div>
                    </form>
                }

        </div>
    )
}

export default Login