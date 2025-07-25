import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { postReq } from '../../api/axios'
import { Link } from 'react-router'
import { useDispatch } from 'react-redux'
import GoogleSignin from '../../components/Buttons/GoogleSignin'


const Register = () => {

    const dispatch = useDispatch()
    const [mainBtn, setMainBtn] = useState('Register')


    // ============ Api ==============
    const handleRegister = async (data) => {
        try {
            setMainBtn('Loading...')
            await postReq('/auth/register', data)
            toast.success('User registered successfully')
            console.log(data)
            setMainBtn('Register')
        } catch (error) {
            console.log('error in frontend posting register request: ', error.message)
            toast.error(error.message)
            setMainBtn('Register')
        }
    }

    // ============ hook form ==============
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => handleRegister(data);





    return (
        <div className='Register'>

            <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true })} placeholder='Name' className='p-2 border border-gray-300 rounded-md' />
                <input {...register("email", { required: true })} placeholder='Email' className='p-2 border border-gray-300 rounded-md' />
                <input {...register("password", { required: true })} placeholder='Password' type='password' className='p-2 border border-gray-300 rounded-md' />
                {/* {errors.exampleRequired && <span>This field is required</span>} */}
                <input type="submit" value={mainBtn} className='cursor-pointer bg-[var(--primaryColor)] p-2 rounded-md text-white border-none active:scale-[0.95] transition-all' />
            </form>

            <div className='my-2'>
                <GoogleSignin text={'Signup with Google'}/>
            </div>

            <div className='text-center'>Already registered? <Link to='/register-login?tab=login' className='underline'>Login</Link> </div>

        </div>
    )
}

export default Register