import React from 'react'
import { auth, provider, signInWithPopup } from '../../Firebase/firebaseConfig.jsx'
import { useDispatch } from 'react-redux'
import { storeUser } from '../../redux/reducers/userReducer.js'
import { useNavigate } from 'react-router'

const GoogleSignin = ({text}) => {


    const dispatch = useDispatch()
    const navigate = useNavigate()


        // =============================== google signin ===========================
    const signinGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const {email, displayName, uid, photoURL}= result.user
                const user = {
                    email: email,
                    name: displayName,
                    user_image: photoURL,
                    _id: uid
                }
                // setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch(storeUser(user))
                navigate('/')
                


            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            })
    }




    return (
        <div className="socialBtnContainer w-full flex flex-col gap-2">
            <button className='socialBtn w-full flex items-center justify-center gap-3 p-2 rounded-md bg-black text-white active:scale-[0.95] transition-all' onClick={signinGoogle}>
                <img src="/images/icons/google_icon.png" alt='icon' width={20} /> {text}
            </button>
        </div>
    )
}

export default GoogleSignin