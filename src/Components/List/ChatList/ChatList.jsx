import React, { useEffect, useState } from 'react'
import '../ChatList/chatlist.css'
import AddUser from './Adduser/AddUser'
import { useUserStore } from '../../../Lib/userStore'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../Lib/firebase'

function ChatList() {

    let [addMode, setAddMode] = useState(false)
    let [chats, setChats] = useState([])
    const { currentUser } = useUserStore()

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async(res) => {
            const items = res.data().chats;

            const promises=items.map(async(item)=>{
                const userDocRef = doc(db,"users",item.receiverId);
                const userDocSnap = await getDoc(userDocRef)
                const user  = userDocSnap.data()

                return {...item,user}
            })
            const chatData = await Promise.all(promises)

            setChats(chatData.sort((a,b)=>b.updateAt - a.updateAt));
        });
        return () => {
            unSub()
        }
    }, [currentUser.id])

    console.log(chats)

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

            {
                chats.map((chat) => {
                    <div className="items" key={chat.chatId}>
                        <img src="./avatar.png" alt="" />
                        <div className="texts">
                            <span>John deo</span>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </div>
                })
            }
            {addMode && <AddUser />}
        </div>
    )
}

export default ChatList