import React, { useState } from 'react'
import './adduser.css'
import { db } from '../../../../Lib/firebase';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { create } from 'zustand';

function AddUser() {

    let [user, setUser] = useState(null)

    const handleSearch = async (e) => { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, 'users')
            const q = query(userRef, where("username", "==", username))
            const querySnapShot = await getDocs(q)

            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data())
            }

        } catch (error) {
                console.log(error)
        }
    }

    let handleAdd=async()=>{
            const chatRef = collection(db,"chats");
            const userChatRef = collection(db,"userchats");

            try {
                const newChatRef = doc(chatRef)
                
                await setDoc(newChatRef,{
                    createdAt:serverTimestamp(),
                    messages:[],
                })

                console.log(newChatRef.id)
            } catch (error) {
                console.log(error)
            }

    }

    return (
        <div className='adduser'>
            <form onSubmit={handleSearch}>
                <input type="text" name='username' placeholder='UserName' />
                <button type='submit'>Search</button>
            </form>
            {user && <div className="user">
                <div className="detail">
                    <img src={user.avatar || "./avatar.png"} alt="" />
                    <span>{user.username}</span>
                </div>
                <button onClick={handleAdd}>Add User</button>
            </div>}
        </div>
    )
}

export default AddUser