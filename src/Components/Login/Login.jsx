import React, { useState } from 'react'
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../Lib/upload';

function Login() {

    let [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const handleAvatar = (e) => {

        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    let [loading, setLoading] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target)
        const { username, email, password } = Object.fromEntries(formData)

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const imgUrl = await upload(avatar.file)

            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            })

            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            })
            toast.success("Account Created!! You can Login Now!!")

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("Login success !", {
            });

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='login'>
            <div className="item">
                <h2>Wellcome Back,</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder='Email...' name='email' />
                    <input type="password" placeholder='Password...' name='password' />
                    <button type='submit' disabled={loading}>{loading ? "loading" : "Sign In"}</button>
                </form>
            </div>
            <div className="saperator">

            </div>
            <div className="item">
                <h2>Create An Account...</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || './avatar.png'} alt="image" width='100px' height='100px' />
                        Upload An Image..</label>
                    <input type="file" id='file' style={{ display: 'none' }} onChange={handleAvatar} />
                    <input type="text" placeholder='User Name...' name='username' />
                    <input type="text" placeholder='Email...' name='email' />
                    <input type="password" placeholder='Password...' name='password' />
                    <button disabled={loading}>{loading ? "loading" : "Sign Up"}</button>
                </form>
            </div>
        </div>
    )
}

export default Login