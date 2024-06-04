import React, { useEffect, useState } from 'react'
import '../ChatList/chatlist.css'
import AddUser from './Adduser/AddUser'
import { useUserStore } from '../../../Lib/userStore'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../Lib/firebase'
import { useChatStore } from '../../../Lib/chatStore'

function ChatList() {

    let [addMode, setAddMode] = useState(false)
    let [chats, setChats] = useState([])
    const { currentUser } = useUserStore()
    const { chatId, changeChat } = useChatStore()
    // const [input, setInput] = useState("")

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats;

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef)
                const user = userDocSnap.data()

                return { ...item, user }
            })
            const chatData = await Promise.all(promises)

            setChats(chatData.sort((a, b) => b.updateAt - a.updateAt));
        });
        return () => {
            unSub()
        }
    }, [currentUser.id])

    let handleSelect = async (chat) => {

        const userChats = chats.map((item) => {
            const { user, ...rest } = item
            return rest
        })

        const chatIndex = userChats.findIndex(
            (item) => item.chatId === chat.chatId
        )

        userChats[chatIndex].isSeen = true

        const userChatsRef = doc(db, 'userchats', currentUser.id)

        try {
            await updateDoc(userChatsRef, {
                chats: userChats,
            })
            changeChat(chat.chatId, chat.user)

        } catch (error) {
            console.log(error)
        }
    }

    // const filterdChat = chats.filter((c) => {
    //     c.user.username.toLowerCase().includes(input.toLowerCase())
    // })

    console.log(chats)

    return (
        <div className='chatlist'>
            <div className="search">
                <div className="searchbar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder='Search' onChange={(e) => setInput(e.target.value)} />
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png  "} alt="" className='add'
                    onClick={() => setAddMode((perv) => !perv)}
                />
            </div>

            {
                chats.map((chat) => {

                    return (
                        <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)} style={{ backgroundColor: chat.isSeen ? 'transparent' : "#5183fe" }}>
                            <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.png" : chat.user.avatar || "./avatar.png"} alt="" />
                            <div className="texts">
                                <span>{chat.user.blocked.includes(currentUser.id)
                                    ? "User"
                                    : chat.user.username
                                }</span>
                                <p>{chat.lastMessage}</p>
                            </div>
                        </div>
                    )
                })
            }
            {addMode && <AddUser />}
        </div>
    )
}

export default ChatList