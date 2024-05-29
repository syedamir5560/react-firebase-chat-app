import React, { useState } from 'react'
import './login.css'

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

    return (
        <div className='login'>
            <div className="item">
                <h2>Wellcome Back,</h2>
                <form action="">
                    <input type="text" placeholder='Email...' name='email' />
                    <input type="password" placeholder='Password...' name='password' />
                    <button>Sign In</button>
                </form>
            </div>
            <div className="saperator">

            </div>
            <div className="item">
                <h2>Create An Account...</h2>
                <form action="">
                    <label htmlFor="file">
                        <img src={avatar.url || './avatar.png'} alt="image"  width='100px' height='100px' />
                        Upload An Image..</label>
                    <input type="file" id='file' style={{ display: 'none' }} onChange={handleAvatar} />
                    <input type="text" placeholder='User Name...' name='username' />
                    <input type="text" placeholder='Email...' name='email' />
                    <input type="password" placeholder='Password...' name='password' />
                    <button>Sign Up</button>
                </form>

            </div>
        </div>
    )
}

export default Login