import React from 'react'
import './adduser.css'  

function AddUser() {
    return (
        <div className='adduser'>
            <form action="">
                <input type="text" name='username' placeholder='UserName' />
                <button>Search</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Jane Deo</span>
                </div>
                <button>Add User</button>
            </div>
        </div>
    )
}

export default AddUser