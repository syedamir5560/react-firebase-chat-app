import React, { useState } from 'react'
import './adduser.css'
import { db } from '../../../../Lib/firebase';
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { create } from 'zustand';
import { update } from 'firebase/database';
import { useUserStore } from '../../../../Lib/userStore';

function AddUser() {

    let [user, setUser] = useState(null)

    const { currentUser } = useUserStore()

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

    let handleAdd = async () => {
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");

        try {
            const newChatRef = doc(chatRef)

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            })

            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                })
            })

            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),  
                })
            })

            console.log(newChatRef.id)

        } catch (error) {
            console.log(error)
        }
    }

    // console.log(user)

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