import React, { useState } from 'react'
import '../ChatList/chatlist.css'
import AddUser from './Adduser/AddUser'

function ChatList() {

    let [addMode, setAddMode] = useState(false)

    return (
        <div className='chatlist'>
            <div className="search">
                <div className="searchbar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder='Search' />
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png  "} alt="" className='add'
                    onClick={() => setAddMode((perv) => !perv)}
                />
            </div>
            <div className="items">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>John deo</span>
                    <p>Hello</p>
                </div>
            </div>

            <div className="items">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>John deo</span>
                    <p>Hello</p>
                </div>
            </div>

            <div className="items">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>John deo</span>
                    <p>Hello</p>
                </div>
            </div>
           {addMode && <AddUser />}
        </div>
    )
}

export default ChatList